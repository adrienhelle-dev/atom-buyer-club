import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  ADMIN_EMAILS, PROPERTY_MANAGERS_EMAILS,
  getPasswordForEmail, getRoleForEmail, signToken,
} from '@/lib/auth'

export async function POST(req: NextRequest) {
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
  if (password !== expected) {
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
