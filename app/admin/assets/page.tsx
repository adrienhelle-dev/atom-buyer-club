import { cookies } from 'next/headers'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Asset } from '@/lib/types'

const SEGMENT_LABELS: Record<string, string> = { atom: 'Atom', other: 'Other', monitoring: 'Monitoring' }
const SEGMENT_COLORS: Record<string, string> = {
  atom: 'rgba(76,175,125,.12)',
  other: 'rgba(184,151,90,.12)',
  monitoring: 'rgba(91,91,214,.12)',
}
const SEGMENT_TEXT: Record<string, string> = { atom: '#4caf7d', other: '#B8975A', monitoring: '#5B5BD6' }
const STATUS_LABELS: Record<string, string> = { active: 'Actif', onboarding: 'Démarrage', paused: 'Pause', archived: 'Archivé' }
const STATUS_COLORS: Record<string, string> = {
  active: '#4caf7d',
  onboarding: '#B8975A',
  paused: '#e89c4a',
  archived: '#7a7874',
}

function fmt(n?: number | null) {
  if (n == null) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string; status?: string }>
}) {
  const { segment, status } = await searchParams

  let query = supabase.from('assets').select('*').order('segment').order('nickname')
  if (segment && segment !== 'all') query = query.eq('segment', segment)
  if (status && status !== 'all') query = query.eq('status', status)
  else query = query.neq('status', 'archived')

  const { data: assets } = await query
  const rows = (assets ?? []) as Asset[]

  return (
    <div style={{ padding: '32px 28px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#F5F2ED', margin: 0 }}>
            Assets Performance
          </h1>
          <p style={{ fontSize: '12px', color: '#7a7874', marginTop: '4px' }}>
            {rows.length} asset{rows.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/assets/new"
          style={{
            background: '#B8975A',
            color: '#0f0e0c',
            border: 'none',
            borderRadius: '8px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          + Nouvel asset
        </Link>
      </div>

      {/* Segment filter tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { value: 'all', label: 'Tous' },
          { value: 'atom', label: 'Atom' },
          { value: 'other', label: 'Other' },
          { value: 'monitoring', label: 'Monitoring' },
        ].map(tab => (
          <Link
            key={tab.value}
            href={`/admin/assets?segment=${tab.value}${status ? `&status=${status}` : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              background: (segment ?? 'all') === tab.value ? '#B8975A' : '#1e1d1a',
              color: (segment ?? 'all') === tab.value ? '#0f0e0c' : '#7a7874',
              border: '1px solid',
              borderColor: (segment ?? 'all') === tab.value ? '#B8975A' : '#2c2b27',
              transition: 'all .15s',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 120px 130px 110px 100px',
          padding: '10px 16px',
          borderBottom: '1px solid #2c2b27',
          background: '#1a1916',
        }}>
          {['Nom', 'Arr.', 'Segment', 'Loyer/mois', 'Statut', ''].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874' }}>
              {h}
            </span>
          ))}
        </div>

        {rows.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#7a7874', fontSize: '14px' }}>
            Aucun asset trouvé
          </div>
        )}

        {rows.map((a, i) => (
          <Link
            key={a.id}
            href={`/admin/assets/${a.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 120px 130px 110px 100px',
              padding: '14px 16px',
              borderBottom: i < rows.length - 1 ? '1px solid #2c2b27' : 'none',
              textDecoration: 'none',
              alignItems: 'center',
              transition: 'background .12s',
            }}
            className="asset-row"
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F2ED' }}>
                {a.nickname || a.address}
              </div>
              {a.nickname && (
                <div style={{ fontSize: '11px', color: '#7a7874', marginTop: '2px' }}>{a.address}</div>
              )}
            </div>
            <span style={{ fontSize: '13px', color: '#7a7874' }}>{a.arrondissement || '—'}</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '11px',
              fontWeight: 500,
              padding: '3px 9px',
              borderRadius: '20px',
              background: SEGMENT_COLORS[a.segment],
              color: SEGMENT_TEXT[a.segment],
              border: `1px solid ${SEGMENT_TEXT[a.segment]}44`,
              width: 'fit-content',
            }}>
              {SEGMENT_LABELS[a.segment]}
            </span>
            <span style={{ fontSize: '13px', color: '#F5F2ED', fontVariantNumeric: 'tabular-nums' }}>
              {fmt(a.monthly_rent)}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: STATUS_COLORS[a.status],
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_COLORS[a.status], flexShrink: 0 }} />
              {STATUS_LABELS[a.status]}
            </span>
            <span style={{ fontSize: '12px', color: '#7a7874' }}>→</span>
          </Link>
        ))}
      </div>

      <style>{`
        .asset-row:hover { background: rgba(255,255,255,.025) !important; }
      `}</style>
    </div>
  )
}
