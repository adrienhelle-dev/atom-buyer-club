import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { timingSafeEqual } from 'crypto'
import {
  ADMIN_EMAILS, PROPERTY_MANAGERS_EMAILS,
  getPasswordForEmail, getRoleForEmail, signToken,
} from '@/lib/auth'

// Rate-limit en mémoire : 5 tentatives / 15 min par IP. Per-instance sur
// Vercel (réinitialisé au cold start) mais suffisant pour casser un brute-force.
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Trop de tentatives, réessayez dans 15 minutes' }, { status: 429 })
  }

  const { email: rawEmail, password } = await req.json() as { email: string; password: string }
  const email = (rawEmail || '').trim().toLowerCase()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
  }

  const allAllowed = [...ADMIN_EMAILS, ...PROPERTY_MANAGERS_EMAILS]
  if (!allAllowed.includes(email)) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 })
  }

  const expected = getPasswordForEmail(email)
  if (!expected || !safeCompare(password, expected)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const role = getRoleForEmail(email)
  const token = signToken(email, role)

  const cookieStore = await cookies()
  cookieStore.set('atom_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return NextResponse.json({ email, role })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('atom_admin_token')
  return NextResponse.json({ ok: true })
}
