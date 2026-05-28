'use client'

import { useState, useMemo } from 'react'
import {
  ResponsiveContainer, ComposedChart, Bar, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChartPerf {
  asset_id: string
  month: string
  gross_revenue: number | null
  operating_profit: number | null
  net_revenue_atom: number | null
  sci_net_revenue: number | null
  occupancy_rate: number | null
  adr: number | null
  revpar: number | null
}

interface ChartAsset {
  id: string
  nickname: string | null | undefined
  address: string
  segment: string
}

interface Props {
  chartPerfs: ChartPerf[]
  assets: ChartAsset[]
}

// ── Config ────────────────────────────────────────────────────────────────────

type MetricKey = 'gross_revenue' | 'operating_profit' | 'net_revenue' | 'occupancy_rate' | 'adr' | 'revpar'
type ChartType = 'bar' | 'line'
type Mode = 'global' | 'asset'

const METRICS: {
  key: MetricKey
  label: string
  short: string
  color: string
  axis: 'left' | 'right'
  format: 'eur' | 'pct'
}[] = [
  { key: 'gross_revenue',    label: 'Revenus bruts',     short: 'CA brut',    color: '#B8975A', axis: 'left',  format: 'eur' },
  { key: 'operating_profit', label: 'Résultat opérat.',  short: 'Op. Profit', color: '#4caf7d', axis: 'left',  format: 'eur' },
  { key: 'net_revenue',      label: 'Revenu net',        short: 'Net Rev.',   color: '#7C6AF7', axis: 'left',  format: 'eur' },
  { key: 'occupancy_rate',   label: "Taux d'occupation", short: 'Occu.',      color: '#5C6BC0', axis: 'right', format: 'pct' },
  { key: 'adr',              label: 'ADR',               short: 'ADR',        color: '#e89c4a', axis: 'left',  format: 'eur' },
  { key: 'revpar',           label: 'RevPAR',            short: 'RevPAR',     color: '#d95e5e', axis: 'left',  format: 'eur' },
]

const SEG_COLOR: Record<string, string> = { atom: '#4caf7d', other: '#B8975A', monitoring: '#7C6AF7' }
const SEG_LABEL: Record<string, string> = { atom: 'Atom', other: 'Other', monitoring: 'Monitoring' }

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtK(v: number | null | undefined): string {
  if (v == null) return '—'
  if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}k€`
  return `${Math.round(v)}€`
}

function fmtFull(v: number, format: 'eur' | 'pct') {
  if (format === 'pct') return `${v.toFixed(1)} %`
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v)
}

function monthShort(iso: string) {
  const d = new Date(iso + 'T12:00:00Z')
  return d.toLocaleDateString('fr-FR', { month: 'short', timeZone: 'UTC' })
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '10px',
      padding: '12px 16px', fontSize: '12px', minWidth: '160px',
    }}>
      <div style={{ color: '#7a7874', fontSize: '11px', marginBottom: '8px', fontWeight: 600, letterSpacing: '.04em' }}>
        {label}
      </div>
      {payload.map(p => {
        const m = METRICS.find(m => m.label === p.name || m.short === p.name)
        const formatted = m ? fmtFull(p.value, m.format) : p.value
        return (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', marginBottom: '4px' }}>
            <span style={{ color: '#7a7874' }}>{p.name}</span>
            <span style={{ color: p.color, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatted}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PerformanceChart({ chartPerfs, assets }: Props) {
  const [mode, setMode]               = useState<Mode>('global')
  const [assetId, setAssetId]         = useState<string>(assets[0]?.id ?? '')
  const [chartType, setChartType]     = useState<ChartType>('bar')
  const [period, setPeriod]           = useState<6 | 12>(12)
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(
    new Set(['gross_revenue', 'operating_profit'])
  )

  // ── Filter to selected period ──────────────────────────────────────────────
  const periodPerfs = useMemo(() => {
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - period)
    const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-01`
    return chartPerfs.filter(p => p.month >= cutoffStr)
  }, [chartPerfs, period])

  // ── Build chart data ──────────────────────────────────────────────────────
  const chartData = useMemo(() => {
    if (mode === 'global') {
      // Aggregate all assets per month
      const byMonth = new Map<string, {
        gross_revenue: number; operating_profit: number
        net_revenue: number; occupancy_rate_sum: number; occ_count: number
        adr_sum: number; adr_count: number; revpar_sum: number; revpar_count: number
      }>()

      for (const p of periodPerfs) {
        const cur = byMonth.get(p.month) ?? {
          gross_revenue: 0, operating_profit: 0, net_revenue: 0,
          occupancy_rate_sum: 0, occ_count: 0,
          adr_sum: 0, adr_count: 0, revpar_sum: 0, revpar_count: 0,
        }
        cur.gross_revenue    += p.gross_revenue    ?? 0
        cur.operating_profit += p.operating_profit ?? 0
        cur.net_revenue      += (p.net_revenue_atom ?? p.sci_net_revenue ?? 0)
        if (p.occupancy_rate != null) { cur.occupancy_rate_sum += p.occupancy_rate; cur.occ_count++ }
        if (p.adr != null)            { cur.adr_sum   += p.adr;   cur.adr_count++ }
        if (p.revpar != null)         { cur.revpar_sum += p.revpar; cur.revpar_count++ }
        byMonth.set(p.month, cur)
      }

      return Array.from(byMonth.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, v]) => ({
          month: monthShort(month),
          gross_revenue:    Math.round(v.gross_revenue),
          operating_profit: Math.round(v.operating_profit),
          net_revenue:      Math.round(v.net_revenue),
          occupancy_rate:   v.occ_count > 0 ? parseFloat((v.occupancy_rate_sum / v.occ_count).toFixed(1)) : null,
          adr:              v.adr_count    > 0 ? Math.round(v.adr_sum   / v.adr_count)    : null,
          revpar:           v.revpar_count > 0 ? Math.round(v.revpar_sum / v.revpar_count) : null,
        }))
    } else {
      // Single asset
      return periodPerfs
        .filter(p => p.asset_id === assetId)
        .sort((a, b) => a.month.localeCompare(b.month))
        .map(p => ({
          month:            monthShort(p.month),
          gross_revenue:    p.gross_revenue    ?? 0,
          operating_profit: p.operating_profit ?? 0,
          net_revenue:      p.net_revenue_atom ?? p.sci_net_revenue ?? 0,
          occupancy_rate:   p.occupancy_rate,
          adr:              p.adr,
          revpar:           p.revpar,
        }))
    }
  }, [mode, assetId, periodPerfs])

  // ── Helpers ────────────────────────────────────────────────────────────────
  function toggleMetric(key: MetricKey) {
    setActiveMetrics(prev => {
      const next = new Set(prev)
      if (next.has(key)) { if (next.size > 1) next.delete(key) }
      else next.add(key)
      return next
    })
  }

  const selectedAsset = assets.find(a => a.id === assetId)
  const hasRightAxis  = activeMetrics.has('occupancy_rate')
  const activeLeft    = METRICS.filter(m => activeMetrics.has(m.key) && m.axis === 'left')
  const activeRight   = METRICS.filter(m => activeMetrics.has(m.key) && m.axis === 'right')

  // ── Styles ─────────────────────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: '#161512', border: '1px solid #2c2b27',
    borderRadius: '12px', overflow: 'hidden', marginBottom: '28px',
  }
  const pillBase: React.CSSProperties = {
    padding: '5px 12px', borderRadius: '20px', fontSize: '11px',
    fontWeight: 500, cursor: 'pointer', border: '1px solid', transition: 'all .15s',
  }
  const selectStyle: React.CSSProperties = {
    background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '8px',
    padding: '6px 28px 6px 10px', fontSize: '12px', color: '#F5F2ED',
    outline: 'none', cursor: 'pointer', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a7874' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
  }

  return (
    <div style={card}>
      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid #2c2b27',
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
      }}>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '2px', background: '#0f0e0c', borderRadius: '8px', padding: '2px', border: '1px solid #2c2b27' }}>
          {(['global', 'asset'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              ...pillBase,
              border: 'none', borderRadius: '6px',
              background: mode === m ? '#2c2b27' : 'transparent',
              color: mode === m ? '#F5F2ED' : '#7a7874',
              padding: '5px 14px',
            }}>
              {m === 'global' ? 'Global' : 'Par asset'}
            </button>
          ))}
        </div>

        {/* Asset dropdown */}
        {mode === 'asset' && (
          <div style={{ position: 'relative' }}>
            <select value={assetId} onChange={e => setAssetId(e.target.value)} style={selectStyle}>
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  {a.nickname || a.address} — {SEG_LABEL[a.segment] ?? a.segment}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Segment indicator for asset mode */}
        {mode === 'asset' && selectedAsset && (
          <span style={{
            fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px',
            color: SEG_COLOR[selectedAsset.segment] ?? '#7a7874',
            background: `${SEG_COLOR[selectedAsset.segment] ?? '#7a7874'}18`,
            border: `1px solid ${SEG_COLOR[selectedAsset.segment] ?? '#7a7874'}40`,
          }}>
            {SEG_LABEL[selectedAsset.segment] ?? selectedAsset.segment}
          </span>
        )}

        <div style={{ flex: 1 }} />

        {/* Chart type */}
        <div style={{ display: 'flex', gap: '2px', background: '#0f0e0c', borderRadius: '8px', padding: '2px', border: '1px solid #2c2b27' }}>
          {([['bar', '▬ Barres'], ['line', '↗ Courbe']] as [ChartType, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setChartType(t)} style={{
              ...pillBase,
              border: 'none', borderRadius: '6px',
              background: chartType === t ? '#2c2b27' : 'transparent',
              color: chartType === t ? '#F5F2ED' : '#7a7874',
              padding: '5px 12px',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Period */}
        <div style={{ display: 'flex', gap: '2px', background: '#0f0e0c', borderRadius: '8px', padding: '2px', border: '1px solid #2c2b27' }}>
          {([6, 12] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              ...pillBase,
              border: 'none', borderRadius: '6px',
              background: period === p ? '#2c2b27' : 'transparent',
              color: period === p ? '#F5F2ED' : '#7a7874',
              padding: '5px 12px',
            }}>
              {p}M
            </button>
          ))}
        </div>
      </div>

      {/* ── Metric pills ─────────────────────────────────────────────────── */}
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid #2c2b27',
        display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontSize: '10px', color: '#7a7874', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginRight: '4px' }}>
          Métriques
        </span>
        {METRICS.map(m => {
          const on = activeMetrics.has(m.key)
          return (
            <button key={m.key} onClick={() => toggleMetric(m.key)} style={{
              ...pillBase,
              background: on ? `${m.color}18` : 'transparent',
              color: on ? m.color : '#7a7874',
              borderColor: on ? `${m.color}60` : '#2c2b27',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: on ? m.color : '#3a3937', marginRight: '5px', verticalAlign: 'middle' }} />
              {m.label}
            </button>
          )
        })}
      </div>

      {/* ── Chart ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: '20px 8px 8px' }}>
        {chartData.length === 0 ? (
          <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7a7874', fontSize: '13px' }}>
            Aucune donnée disponible pour cette période
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData} margin={{ top: 4, right: hasRightAxis ? 56 : 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,43,39,.6)" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fill: '#7a7874', fontSize: 11 }}
                axisLine={{ stroke: '#2c2b27' }}
                tickLine={false}
              />

              {/* Left Y axis — € */}
              <YAxis
                yAxisId="left"
                tickFormatter={v => fmtK(v)}
                tick={{ fill: '#7a7874', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />

              {/* Right Y axis — % (only if occupancy selected) */}
              {hasRightAxis && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={v => `${v}%`}
                  tick={{ fill: '#5C6BC0', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  width={44}
                />
              )}

              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,.03)' }} />

              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: '12px', fontSize: '11px', color: '#7a7874' }}
              />

              {/* Left-axis series */}
              {activeLeft.map(m => (
                chartType === 'bar'
                  ? <Bar key={m.key} yAxisId="left" dataKey={m.key} name={m.label} fill={m.color} radius={[3, 3, 0, 0]} maxBarSize={36} fillOpacity={0.85} />
                  : <Line key={m.key} yAxisId="left" dataKey={m.key} name={m.label} stroke={m.color} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: m.color }} />
              ))}

              {/* Right-axis series (occupancy %) */}
              {activeRight.map(m => (
                <Line key={m.key} yAxisId="right" dataKey={m.key} name={m.label} stroke={m.color} strokeWidth={2} strokeDasharray="4 3" dot={false} activeDot={{ r: 4, fill: m.color }} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
