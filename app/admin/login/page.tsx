'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AtomLogo = () => (
  <svg width="69" height="20" viewBox="0 0 69 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4651 19.6844C10.7251 19.6844 9.82511 18.4544 9.58511 16.5644L9.49511 15.9044C9.13511 17.7944 7.33511 19.7444 4.57513 19.7444 2.02513 19.7444 0.255127 18.0944 0.255127 15.8744 0.255127 13.8644 1.69513 12.4244 4.36513 12.1844L8.92511 11.8244 8.71511 10.2944C8.35511 7.56445 7.12511 5.76444 4.84513 5.76444 3.07513 5.76444 1.75513 6.87444 1.09513 8.46445L0.705128 8.37444C1.27513 6.24444 3.43513 3.93444 6.49511 3.93444 9.52511 3.93444 11.4451 5.91444 11.8951 9.48445L12.7651 16.1144C12.9451 17.4044 13.4551 17.7944 13.9651 17.7944 14.3851 17.7944 14.6851 17.4344 14.7751 16.9244L15.1351 16.9544C15.0751 18.2444 14.1451 19.6844 12.4651 19.6844ZM3.28513 15.2144C3.28513 16.6544 4.33513 17.9744 6.16511 17.9744 8.08511 17.9744 9.25511 16.5944 9.40511 15.2144L8.98511 12.2744 6.04511 12.5144C4.21513 12.6944 3.28513 13.7744 3.28513 15.2144ZM20.4549 19.7444C17.5149 19.7444 16.1349 17.5544 16.1349 14.7344L16.1349 5.43444 14.2449 5.43444 14.2449 5.01444C16.6449 4.77444 18.5049 3.24444 18.9849 0.514443L19.4049 0.514443 19.4049 4.23444 23.8749 4.23444 23.3649 5.43444 19.4049 5.43444 19.4049 14.4044C19.4049 16.4144 20.3049 17.8544 21.8049 17.8544 23.0949 17.8544 23.8449 16.8044 24.0849 15.6944L24.4449 15.7544C24.1749 17.9144 22.6149 19.7444 20.4549 19.7444ZM31.8887 19.7444C27.6287 19.7444 24.2687 16.2644 24.2687 11.7644 24.2687 7.02444 27.7487 3.93444 31.8287 3.93444 35.9687 3.93444 39.3887 7.23445 39.3887 11.8244 39.3887 16.5044 36.0587 19.7444 31.8887 19.7444ZM27.7787 12.4244C28.3187 16.5944 30.3287 19.4744 32.8187 19.1444 35.3387 18.8144 36.4187 15.3344 35.8487 11.1044 35.3087 6.93444 33.2987 4.17444 30.8687 4.53444 28.3487 4.89444 27.2687 8.34445 27.7787 12.4244ZM58.6606 19.4444L58.6606 19.0544C60.1306 19.0544 61.1806 18.4844 60.9106 16.4444L59.9506 9.57444C59.5906 7.05444 58.5406 5.73444 56.8306 5.73444 55.0604 5.73444 54.0704 7.14444 53.8604 8.73444 53.8904 9.03444 53.9204 9.36445 53.9204 9.69445L53.9204 16.4144C53.9204 18.4844 54.8204 19.0544 56.0206 19.0544L56.0206 19.4444 48.7004 19.4444 48.7004 19.0544C49.8704 19.0544 50.7104 18.4844 50.7104 16.4144L50.7104 10.2044C50.7104 7.29445 49.5404 5.70444 47.5604 5.70444 45.9104 5.70444 44.6504 7.08444 44.4704 8.52444L44.4704 16.4144C44.4704 18.4844 45.3104 19.0544 46.4804 19.0544L46.4804 19.4444 39.1304 19.4444 39.1304 19.0544C40.3304 19.0544 41.2304 18.4844 41.2304 16.4144L41.2304 7.50445C41.2304 6.03444 40.6304 5.55444 39.2504 5.52445L39.2504 5.13444C40.8404 5.01444 42.6404 4.68444 44.2004 3.96444L44.4704 4.11444 44.4704 7.32444C45.0704 5.58444 46.7804 3.93444 49.0004 3.93444 51.2204 3.93444 53.0804 5.28444 53.7104 7.77445 54.1904 5.76444 55.8706 3.93444 58.3006 3.93444 60.8806 3.93444 62.6506 5.55444 63.2206 9.48445L64.2406 16.4444C64.5406 18.4844 65.4106 19.0544 66.6406 19.0544L66.6406 19.4444Z" fill="#F5F2ED"/>
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur de connexion')
      } else {
        router.push('/admin/assets')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0e0c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#161512',
        border: '1px solid #2c2b27',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '360px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <AtomLogo />
          <p style={{ fontSize: '12px', color: '#7a7874', marginTop: '12px', letterSpacing: '.05em' }}>
            Assets Performance
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(217,94,94,.1)',
            border: '1px solid rgba(217,94,94,.3)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#d95e5e',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#7a7874', marginBottom: '6px', letterSpacing: '.05em' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="prenom@atom-capital.fr"
              style={{
                width: '100%',
                background: '#1e1d1a',
                border: '1px solid #2c2b27',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#F5F2ED',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#7a7874', marginBottom: '6px', letterSpacing: '.05em' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: '100%',
                background: '#1e1d1a',
                border: '1px solid #2c2b27',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#F5F2ED',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              background: loading ? 'rgba(184,151,90,.4)' : '#B8975A',
              color: '#0f0e0c',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity .15s',
            }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
