import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import type { Asset, AssetMonthlyPerformance } from '@/lib/types'
import PerformanceChart from './PerformanceChart'

// ─── Design tokens ────────────────────────────────────────────────────────────
const SEG_LABEL: Record<string, string>  = { atom: 'Atom', other: 'Other', monitoring: 'Monitoring' }
const SEG_COLOR: Record<string, string>  = { atom: '#4caf7d', other: '#B8975A', monitoring: '#7C6AF7' }
const SEG_BG: Record<string, string>     = { atom: 'rgba(76,175,125,.1)', other: 'rgba(184,151,90,.1)', monitoring: 'rgba(124,106,247,.1)' }
const SEG_BORDER: Record<string, string> = { atom: 'rgba(76,175,125,.25)', other: 'rgba(184,151,90,.25)', monitoring: 'rgba(124,106,247,.25)' }
const ST_LABEL: Record<string, string>   = { active: 'Actif', onboarding: 'Démarrage', paused: 'Pause', archived: 'Archivé' }
const ST_COLOR: Record<string, string>   = { active: '#4caf7d', onboarding: '#B8975A', paused: '#e89c4a', archived: '#7a7874' }

// ─── Formatters ───────────────────────────────────────────────────────────────
function fmt(n?: number | null, compact = false) {
  if (n == null || isNaN(n as number)) return '—'
  if (compact && Math.abs(n) >= 1000)
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n / 1000) + ' k€'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function fmtMonth(iso: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit', timeZone: 'UTC' })
}

// ─── Stats ────────────────────────────────────────────────────────────────────
type SegKey = 'atom' | 'other' | 'monitoring'
type SegStats = {
  total: number; active: number; onboarding: number
  ytdGross: number; ytdOpProfit: number; ytdNetAtom: number
  totalRent: number; latestMonth: string; latestGross: number
}
const emptyStats = (): SegStats => ({
  total: 0, active: 0, onboarding: 0,
  ytdGross: 0, ytdOpProfit: 0, ytdNetAtom: 0,
  totalRent: 0, latestMonth: '', latestGross: 0,
})

function computeStats(assets: Asset[], perfs: AssetMonthlyPerformance[]) {
  const stats: Record<SegKey, SegStats> = {
    atom: emptyStats(), other: emptyStats(), monitoring: emptyStats(),
  }
  const assetMap = new Map(assets.map(a => [a.id, a]))
  const year = String(new Date().getFullYear())

  for (const a of assets) {
    const s = stats[a.segment as SegKey]
    s.total++
    if (a.status === 'active')     s.active++
    if (a.status === 'onboarding') s.onboarding++
    s.totalRent += a.monthly_rent ?? 0
  }

  for (const p of perfs) {
    const asset = assetMap.get(p.asset_id)
    if (!asset) continue
    const s = stats[asset.segment as SegKey]
    if (p.month.startsWith(year)) {
      s.ytdGross    += p.gross_revenue    ?? 0
      s.ytdOpProfit += p.operating_profit ?? 0
      s.ytdNetAtom  += p.net_revenue_atom ?? 0
    }
    if (p.month > s.latestMonth) {
      s.latestMonth = p.month
      s.latestGross = p.gross_revenue ?? 0
    }
  }
  return stats
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string; status?: string }>
}) {
  const { segment, status } = await searchParams

  // Role check for conditional UI
  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value
  const currentUser = token ? verifyToken(token) : null
  const canWrite = currentUser?.role !== 'viewer'

  // 12-month cutoff for chart
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
  const chartCutoff = `${twelveMonthsAgo.getFullYear()}-${String(twelveMonthsAgo.getMonth() + 1).padStart(2, '0')}-01`

  const [assetsRes, perfRes, chartRes] = await Promise.all([
    supabase.from('assets').select('*').neq('status', 'archived').order('segment').order('nickname'),
    supabase
      .from('asset_monthly_performance')
      .select('asset_id, month, gross_revenue, operating_profit, net_revenue_atom')
      .gte('month', `${new Date().getFullYear()}-01-01`)
      .order('month', { ascending: false }),
    supabase
      .from('asset_monthly_performance')
      .select('asset_id, month, gross_revenue, operating_profit, net_revenue_atom, sci_net_revenue, occupancy_rate, adr, revpar')
      .gte('month', chartCutoff)
      .order('month', { ascending: true }),
  ])

  const allAssets  = (assetsRes.data ?? []) as Asset[]
  const ytdPerfs   = (perfRes.data ?? []) as unknown as AssetMonthlyPerformance[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartPerfs = (chartRes.data ?? []) as any[]

  // Filtered list for table
  let rows = allAssets
  if (segment && segment !== 'all') rows = rows.filter(a => a.segment === segment)
  if (status  && status  !== 'all') rows = rows.filter(a => a.status  === status)

  const stats      = computeStats(allAssets, ytdPerfs)
  const totalGross = stats.atom.ytdGross + stats.other.ytdGross + stats.monitoring.ytdGross
  const totalOp    = stats.atom.ytdOpProfit + stats.other.ytdOpProfit + stats.monitoring.ytdOpProfit
  const totalNet   = stats.atom.ytdNetAtom + stats.other.ytdNetAtom
  const totalActive = allAssets.filter(a => a.status === 'active').length
  const yr = new Date().getFullYear()

  return (
    <div className="ap-page">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#F5F2ED', margin: 0, letterSpacing: '-.01em' }}>
            Assets Performance
          </h1>
          <p style={{ fontSize: '12px', color: '#7a7874', marginTop: '4px' }}>
            {allAssets.length} assets · YTD {yr}
          </p>
        </div>
        {canWrite && (
          <Link href="/admin/assets/new" style={{
            background: '#B8975A', color: '#0f0e0c', borderRadius: '8px',
            padding: '9px 16px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            + Asset
          </Link>
        )}
      </div>

      {/* ── KPI strip ───────────────────────────────────────────── */}
      <div className="ap-kpi-grid">
        {[
          { label: 'Actifs gérés',          value: `${totalActive}`,          sub: `sur ${allAssets.length} total`,              accent: '#F5F2ED' },
          { label: `CA brut YTD ${yr}`,      value: fmt(totalGross, true),     sub: 'toutes catégories',                          accent: '#F5F2ED' },
          { label: 'Résultat opérationnel', value: fmt(totalOp, true),         sub: totalGross > 0 ? `${Math.round((totalOp/totalGross)*100)} % marge` : undefined, accent: totalOp >= 0 ? '#4caf7d' : '#d95e5e' },
          { label: 'Revenu net Atom',        value: fmt(totalNet, true),       sub: 'segments atom + other',                      accent: totalNet >= 0 ? '#B8975A' : '#d95e5e' },
        ].map(({ label, value, sub, accent }) => (
          <div key={label} style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '10px', padding: '16px 18px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874', marginBottom: '8px' }}>{label}</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: accent, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: '11px', color: '#7a7874', marginTop: '5px' }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* ── Segment cards ───────────────────────────────────────── */}
      <div className="ap-seg-grid">
        {(['atom', 'other', 'monitoring'] as SegKey[]).map(seg => {
          const s = stats[seg]
          const color  = SEG_COLOR[seg]
          const showNet = seg !== 'monitoring'
          return (
            <div key={seg} style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ height: '3px', background: color }} />
              <div style={{ padding: '16px 18px 18px' }}>

                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{
                    background: SEG_BG[seg], border: `1px solid ${SEG_BORDER[seg]}`, color,
                    fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                  }}>
                    {SEG_LABEL[seg]}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#F5F2ED' }}>{s.active}</span>
                    <span style={{ fontSize: '11px', color: '#7a7874' }}>/{s.total}</span>
                    {s.onboarding > 0 && (
                      <div style={{ fontSize: '10px', color: '#B8975A', marginTop: '1px' }}>+{s.onboarding} démarrage</div>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                <div className="ap-seg-metrics">
                  <div>
                    <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '.06em' }}>CA brut YTD</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#F5F2ED', fontVariantNumeric: 'tabular-nums' }}>{fmt(s.ytdGross, true)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Résult. opérat.</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: s.ytdOpProfit >= 0 ? '#4caf7d' : '#d95e5e', fontVariantNumeric: 'tabular-nums' }}>{fmt(s.ytdOpProfit, true)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '.06em' }}>{showNet ? 'Revenu net' : 'Marge opérat.'}</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                      color: showNet ? (s.ytdNetAtom >= 0 ? '#F5F2ED' : '#d95e5e') : '#7a7874' }}>
                      {showNet
                        ? fmt(s.ytdNetAtom, true)
                        : s.ytdGross > 0 ? `${Math.round((s.ytdOpProfit/s.ytdGross)*100)} %` : '—'}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #2c2b27' }}>
                  {s.totalRent > 0 ? (
                    <div>
                      <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '2px' }}>Loyer mensuel total</div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#F5F2ED' }}>{fmt(s.totalRent)}/mois</div>
                    </div>
                  ) : <div />}
                  {s.latestMonth && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '2px' }}>
                        Dernier mois ({fmtMonth(s.latestMonth)})
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color }}>{fmt(s.latestGross)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Performance Chart ───────────────────────────────────── */}
      <PerformanceChart
        chartPerfs={chartPerfs}
        assets={allAssets.map(a => ({
          id: a.id,
          nickname: a.nickname,
          address: a.address,
          segment: a.segment,
        }))}
      />

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
        {/* Segment tabs */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
          {[
            { value: 'all', label: 'Tous' },
            { value: 'atom', label: 'Atom' },
            { value: 'other', label: 'Other' },
            { value: 'monitoring', label: 'Monitoring' },
          ].map(tab => {
            const on = (segment ?? 'all') === tab.value
            return (
              <Link key={tab.value}
                href={`/admin/assets?segment=${tab.value}${status ? `&status=${status}` : ''}`}
                style={{
                  padding: '5px 13px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  textDecoration: 'none',
                  background: on ? '#B8975A' : '#1e1d1a',
                  color: on ? '#0f0e0c' : '#7a7874',
                  border: `1px solid ${on ? '#B8975A' : '#2c2b27'}`,
                }}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
        {/* Status filter */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { value: 'all', label: 'Tous' },
            { value: 'active', label: 'Actifs' },
            { value: 'onboarding', label: 'Démarrage' },
          ].map(tab => {
            const on = (status ?? 'all') === tab.value
            return (
              <Link key={tab.value}
                href={`/admin/assets?${segment && segment !== 'all' ? `segment=${segment}&` : ''}status=${tab.value}`}
                style={{
                  padding: '5px 11px', borderRadius: '20px', fontSize: '11px', fontWeight: 500,
                  textDecoration: 'none',
                  background: on ? 'rgba(255,255,255,.08)' : 'transparent',
                  color: on ? '#F5F2ED' : '#7a7874',
                  border: `1px solid ${on ? '#3a3937' : '#2c2b27'}`,
                }}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#7a7874', marginBottom: '10px' }}>
        {rows.length} asset{rows.length !== 1 ? 's' : ''}
      </div>

      {/* ── TABLE — desktop/tablet ───────────────────────────────── */}
      <div className="ap-table" style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 76px 110px 120px 100px 24px',
          gap: '0 8px', padding: '10px 16px', borderBottom: '1px solid #2c2b27', background: '#1a1916',
        }}>
          {['Nom', 'Arr.', 'Segment', 'Loyer/mois', 'Statut', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874' }}>
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
          <Link key={a.id} href={`/admin/assets/${a.id}`} className="ap-asset-row" style={{
            display: 'grid', gridTemplateColumns: '1fr 76px 110px 120px 100px 24px',
            gap: '0 8px', padding: '13px 16px',
            borderBottom: i < rows.length - 1 ? '1px solid #2c2b27' : 'none',
            textDecoration: 'none', alignItems: 'center', transition: 'background .12s',
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F2ED' }}>{a.nickname || a.address}</div>
              {a.nickname && <div style={{ fontSize: '11px', color: '#7a7874', marginTop: '2px' }}>{a.address}</div>}
            </div>
            <span style={{ fontSize: '13px', color: '#7a7874' }}>{a.arrondissement || '—'}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', fontSize: '11px', fontWeight: 500,
              padding: '3px 9px', borderRadius: '20px', width: 'fit-content',
              background: SEG_BG[a.segment], color: SEG_COLOR[a.segment],
              border: `1px solid ${SEG_BORDER[a.segment]}`,
            }}>
              {SEG_LABEL[a.segment]}
            </span>
            <span style={{ fontSize: '13px', color: '#F5F2ED', fontVariantNumeric: 'tabular-nums' }}>
              {fmt(a.monthly_rent)}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: ST_COLOR[a.status] }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: ST_COLOR[a.status], flexShrink: 0 }} />
              {ST_LABEL[a.status]}
            </span>
            <span style={{ fontSize: '13px', color: '#3a3937' }}>›</span>
          </Link>
        ))}
      </div>

      {/* ── CARDS — mobile ──────────────────────────────────────── */}
      <div className="ap-cards-list">
        {rows.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#7a7874', fontSize: '14px' }}>Aucun asset</div>
        )}
        {rows.map(a => (
          <Link key={a.id} href={`/admin/assets/${a.id}`} className="ap-card" style={{ color: 'inherit', transition: 'background .12s' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', flexWrap: 'wrap' }}>
                <span style={{
                  background: SEG_BG[a.segment], color: SEG_COLOR[a.segment],
                  border: `1px solid ${SEG_BORDER[a.segment]}`,
                  fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px',
                }}>
                  {SEG_LABEL[a.segment]}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: ST_COLOR[a.status] }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ST_COLOR[a.status] }} />
                  {ST_LABEL[a.status]}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F2ED' }}>{a.nickname || a.address}</div>
              {a.nickname && <div style={{ fontSize: '11px', color: '#7a7874', marginTop: '2px' }}>{a.address}</div>}
              <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
                {a.arrondissement && <span style={{ fontSize: '11px', color: '#7a7874' }}>📍 {a.arrondissement}</span>}
                {a.monthly_rent   && <span style={{ fontSize: '11px', color: '#7a7874' }}>{fmt(a.monthly_rent)}/mois</span>}
              </div>
            </div>
            <span style={{ fontSize: '18px', color: '#3a3937', alignSelf: 'center', paddingLeft: '12px', marginTop: '2px' }}>›</span>
          </Link>
        ))}
      </div>

    </div>
  )
}
