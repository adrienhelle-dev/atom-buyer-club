import jwt from 'jsonwebtoken'

export type AdminRole = 'admin' | 'viewer' | 'projects' | 'property_manager'

const INTERNAL_ACCOUNTS = [
  { email: 'contact@atom-capital.fr', password: 'NPMN5l6t1TpfhziV', role: 'projects' as AdminRole },
]

export const ADMIN_EMAILS = [
  ...(process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean),
  ...INTERNAL_ACCOUNTS.map(a => a.email),
]

export const PROPERTY_MANAGERS_EMAILS = (process.env.PROPERTY_MANAGERS_EMAILS || '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

export const VIEWER_EMAILS = (process.env.VIEWER_EMAILS || '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

export const PROJECTS_ONLY_EMAILS = [
  ...(process.env.PROJECTS_ONLY_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean),
  ...INTERNAL_ACCOUNTS.filter(a => a.role === 'projects').map(a => a.email),
]

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'

export function getPasswordForEmail(email: string): string {
  const internal = INTERNAL_ACCOUNTS.find(a => a.email === email.toLowerCase())
  if (internal) return internal.password
  try {
    const map = JSON.parse(process.env.ADMIN_PASSWORDS || '{}') as Record<string, string>
    return map[email.toLowerCase()] || (process.env.ADMIN_PASSWORD || '')
  } catch {
    return process.env.ADMIN_PASSWORD || ''
  }
}

export function getRoleForEmail(email: string): AdminRole {
  if (PROPERTY_MANAGERS_EMAILS.includes(email)) return 'property_manager'
  if (VIEWER_EMAILS.includes(email)) return 'viewer'
  if (PROJECTS_ONLY_EMAILS.includes(email)) return 'projects'
  return 'admin'
}

export function signToken(email: string, role: AdminRole): string {
  return jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { email: string; role: AdminRole } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: AdminRole }
  } catch {
    return null
  }
}
