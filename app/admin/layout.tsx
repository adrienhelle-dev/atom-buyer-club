import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import AdminNav from './AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Skip auth protection for the login page itself (avoids redirect loop)
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value

  if (!token) redirect('/admin/login')

  const user = verifyToken(token)
  if (!user) redirect('/admin/login')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--cream)' }}>
      <AdminNav email={user.email} role={user.role} />
      <main>{children}</main>
    </div>
  )
}
