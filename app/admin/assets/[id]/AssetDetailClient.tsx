'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Asset, AssetMonthlyPerformance, RealisationOption } from '@/lib/types'
import { computePnL } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtEur(n: number | null | undefined) {
  if (n == null) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function fmtPct(n: number | null | undefined) {
  if (n == null) return '—'
  return `${n.toFixed(1)} %`
}

function monthLabel(iso: string) {
  const d = new Date(iso + 'T12:00:00Z')
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

function firstDayOfMonth(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`
}

function daysInMonth(iso: string) {
  const d = new Date(iso + 'T12:00:00Z')
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

const EMPTY_PERF = (assetId: string, month: string): AssetMonthlyPerformance => ({
  asset_id: assetId,
  month,
  gross_revenue: 0,
  cleaning_cost: 0,
  diamoni_fees: 0,
  other_platform_fees: 0,
  management_fees: 0,
  edf: 0,
  syndic: 0,
  internet: 0,
  property_tax: 0,
  insurance: 0,
  other_charges: 0,
  nights_booked: 0,
  nights_available: daysInMonth(month),
  total_stays: 0,
  status: 'draft',
  notes: '',
})

// ── Number Input ──────────────────────────────────────────────────────────────

function NumInput({
  label, value, onChange, dirty,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  dirty?: boolean
}) {
  const [raw, setRaw] = useState(value === 0 ? '' : String(value))
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setRaw(value === 0 ? '' : String(value))
  }, [value, focused])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
      <label style={{ fontSize: '13px', color: '#F5F2ED' }}>{label}</label>
      <input
        type="number"
        step="any"
        value={focused ? raw : (value === 0 ? '' : raw)}
        placeholder="0"
        onFocus={() => { setFocused(true); setRaw(value === 0 ? '' : String(value)) }}
        onChange={e => { setRaw(e.target.value); onChange(parseFloat(e.target.value) || 0) }}
        onBlur={() => setFocused(false)}
        style={{
          width: '110px',
          background: '#1e1d1a',
          border: `1px solid ${dirty ? '#e89c4a' : '#2c2b27'}`,
          borderRadius: '6px',
          padding: '6px 10px',
          fontSize: '13px',
          color: '#F5F2ED',
          textAlign: 'right',
          outline: 'none',
          fontVariantNumeric: 'tabular-nums',
        }}
      />
    </div>
  )
}

// ── KPI Card ─────────────────────────────────────────────────────────────────

function KpiLine({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
      <span style={{ fontSize: '12px', color: '#7a7874' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: highlight ? 600 : 400, color: highlight ? '#F5F2ED' : '#B8975A', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: string }) {
  return (
    <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874', padding: '16px 0 8px' }}>
      {children}
    </div>
  )
}

// ── Segment + Statut de l'asset ─────────────────────────────────────────────────

const SEGMENT_OPTS: { value: Asset['segment']; label: string }[] = [
  { value: 'atom', label: 'Atom (géré)' },
  { value: 'other', label: 'Autre' },
  { value: 'monitoring', label: 'Monitoring' },
]
const STATUS_OPTS: { value: Asset['status']; label: string }[] = [
  { value: 'active', label: 'Actif' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'paused', label: 'En pause' },
  { value: 'archived', label: 'Archivé' },
]

function AssetSettings({ asset }: { asset: Asset }) {
  const router = useRouter()
  const [segment, setSegment] = useState<Asset['segment']>(asset.segment)
  const [status, setStatus] = useState<Asset['status']>(asset.status)
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function patch(fields: Partial<Pick<Asset, 'segment' | 'status'>>) {
    setState('saving')
    try {
      const res = await fetch(`/api/admin/assets/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setState('saved')
        router.refresh() // re-fetch l'asset → le P&L se recalcule selon le segment
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const selStyle = {
    background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '6px',
    padding: '6px 10px', fontSize: '13px', color: '#F5F2ED', outline: 'none',
  } as const

  return (
    <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', color: '#7a7874' }}>Segment</span>
      <select
        value={segment}
        onChange={e => { const v = e.target.value as Asset['segment']; setSegment(v); patch({ segment: v }) }}
        style={selStyle}
      >
        {SEGMENT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <span style={{ fontSize: '12px', color: '#7a7874', marginLeft: '6px' }}>Statut</span>
      <select
        value={status}
        onChange={e => { const v = e.target.value as Asset['status']; setStatus(v); patch({ status: v }) }}
        style={selStyle}
      >
        {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {state === 'saving' && <span style={{ fontSize: '11px', color: '#7a7874' }}>…</span>}
      {state === 'saved' && <span style={{ fontSize: '11px', color: '#4caf7d' }}>✓ Enregistré</span>}
      {state === 'error' && <span style={{ fontSize: '11px', color: '#d95e5e' }}>Erreur</span>}
    </div>
  )
}

// ── Réalisation liée (pont CRM) ─────────────────────────────────────────────────

function LinkedRealisation({ asset }: { asset: Asset }) {
  const [options, setOptions] = useState<RealisationOption[]>([])
  const [value, setValue] = useState<string>(asset.showroom_item_id ?? '')
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    let alive = true
    fetch('/api/admin/realisations-list')
      .then(r => (r.ok ? r.json() : []))
      .then((d: RealisationOption[]) => { if (alive) setOptions(Array.isArray(d) ? d : []) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  async function onChange(next: string) {
    setValue(next)
    setState('saving')
    try {
      const res = await fetch(`/api/admin/assets/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showroom_item_id: next || null }),
      })
      setState(res.ok ? 'saved' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', color: '#7a7874' }}>Réalisation liée</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '6px',
          padding: '6px 10px', fontSize: '13px', color: '#F5F2ED', outline: 'none', minWidth: '220px',
        }}
      >
        <option value="">— Aucune —</option>
        {options.map(o => (
          <option key={o.id} value={o.id}>
            {o.name}{o.arrondissement ? ` · ${o.arrondissement}` : ''}
          </option>
        ))}
      </select>
      {state === 'saving' && <span style={{ fontSize: '11px', color: '#7a7874' }}>…</span>}
      {state === 'saved' && <span style={{ fontSize: '11px', color: '#4caf7d' }}>✓ Lié</span>}
      {state === 'error' && <span style={{ fontSize: '11px', color: '#d95e5e' }}>Erreur</span>}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

interface Props {
  asset: Asset | null
  monthly: AssetMonthlyPerformance[]
  canWrite?: boolean
}

export default function AssetDetailClient({ asset, monthly, canWrite = true }: Props) {
  const router = useRouter()
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(firstDayOfMonth(now))
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [dirtyFields, setDirtyFields] = useState<Set<string>>(new Set())

  const existingPerf = monthly.find(m => m.month === currentMonth) ?? null
  const [perf, setPerf] = useState<AssetMonthlyPerformance>(
    existingPerf ?? (asset ? EMPTY_PERF(asset.id, currentMonth) : EMPTY_PERF('', currentMonth))
  )

  // Reset form when month changes
  useEffect(() => {
    const found = monthly.find(m => m.month === currentMonth)
    setPerf(found ?? (asset ? EMPTY_PERF(asset.id, currentMonth) : EMPTY_PERF('', currentMonth)))
    setDirtyFields(new Set())
    setSaveStatus('idle')
  }, [currentMonth, monthly, asset])

  const computed = asset ? computePnL(perf, asset) : null

  function updateField<K extends keyof AssetMonthlyPerformance>(key: K, value: AssetMonthlyPerformance[K]) {
    setPerf(prev => ({ ...prev, [key]: value }))
    setDirtyFields(prev => new Set(prev).add(key as string))
    setSaveStatus('idle')
  }

  const saveRef = useRef(saveStatus)
  saveRef.current = saveStatus

  const save = useCallback(async () => {
    if (!asset) return
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/admin/assets/${asset.id}/monthly`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perf),
      })
      if (res.ok) {
        setSaveStatus('saved')
        setDirtyFields(new Set())
        router.refresh()
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    }
  }, [asset, perf, router])

  // Auto-save debounce 10s
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (dirtyFields.size === 0) return
    clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(save, 10000)
    return () => clearTimeout(autoSaveTimer.current)
  }, [perf, dirtyFields.size, save])

  // Cmd/Ctrl+S
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [save])

  function prevMonth() {
    const d = new Date(currentMonth + 'T12:00:00Z')
    d.setMonth(d.getMonth() - 1)
    setCurrentMonth(firstDayOfMonth(d))
  }
  function nextMonth() {
    const d = new Date(currentMonth + 'T12:00:00Z')
    d.setMonth(d.getMonth() + 1)
    setCurrentMonth(firstDayOfMonth(d))
  }

  const isAtomOther = asset?.segment !== 'monitoring'

  const last6 = monthly.slice(0, 6)

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Back + Asset header */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin/assets" style={{ fontSize: '12px', color: '#7a7874', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
          ← Tous les assets
        </Link>
        {asset && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '26px', fontWeight: 300, color: '#F5F2ED', margin: '0 0 4px' }}>
              {asset.nickname || asset.address}
            </h1>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', fontSize: '12px', color: '#7a7874' }}>
              <span>{asset.address}</span>
              {asset.sci_name && <span>· {asset.sci_name}</span>}
              {asset.monthly_rent && <span>· Loyer {fmtEur(asset.monthly_rent)}/mois</span>}
              {asset.date_lease_start && asset.date_lease_end && (
                <span>· Bail {new Date(asset.date_lease_start).toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' })} → {new Date(asset.date_lease_end).toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' })}</span>
              )}
            </div>
            {canWrite && <AssetSettings asset={asset} />}
            {canWrite && <LinkedRealisation asset={asset} />}
          </div>
        )}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: canWrite ? '1fr 320px' : '1fr', gap: '24px', alignItems: 'start' }}>

        {/* Left: Form (write) or KPI-only banner (read-only) */}
        <div style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', padding: '24px' }}>
        {!canWrite && (
          <div style={{ padding: '10px 14px', background: 'rgba(184,151,90,.08)', border: '1px solid rgba(184,151,90,.2)', borderRadius: '8px', fontSize: '12px', color: '#B8975A', marginBottom: '20px' }}>
            Accès consultation — la saisie des métriques est réservée aux gestionnaires
          </div>
        )}

          {/* All inputs — disabled in read-only mode */}
          <div style={{ pointerEvents: canWrite ? 'auto' : 'none', opacity: canWrite ? 1 : 0.6 }}>

          {/* Month selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #2c2b27' }}>
            <button onClick={prevMonth} style={{ background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '6px', width: '32px', height: '32px', color: '#F5F2ED', cursor: 'pointer', fontSize: '16px' }}>‹</button>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', fontWeight: 300, color: '#F5F2ED', textTransform: 'capitalize' }}>
              {monthLabel(currentMonth)}
            </span>
            <button onClick={nextMonth} style={{ background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '6px', width: '32px', height: '32px', color: '#F5F2ED', cursor: 'pointer', fontSize: '16px' }}>›</button>
          </div>

          {/* Revenus */}
          <SectionTitle>Revenus</SectionTitle>
          <NumInput label="Revenus bruts totaux" value={perf.gross_revenue} onChange={v => updateField('gross_revenue', v)} dirty={dirtyFields.has('gross_revenue')} />

          {/* Coûts opérationnels */}
          <SectionTitle>Coûts opérationnels</SectionTitle>
          <NumInput label="Ménage HT" value={perf.cleaning_cost} onChange={v => updateField('cleaning_cost', v)} dirty={dirtyFields.has('cleaning_cost')} />
          <NumInput label="Fees Diamoni HT" value={perf.diamoni_fees} onChange={v => updateField('diamoni_fees', v)} dirty={dirtyFields.has('diamoni_fees')} />
          <NumInput label="Autres fees plateforme" value={perf.other_platform_fees} onChange={v => updateField('other_platform_fees', v)} dirty={dirtyFields.has('other_platform_fees')} />
          {!isAtomOther && (
            <NumInput label="Fees de gestion (Moïra)" value={perf.management_fees} onChange={v => updateField('management_fees', v)} dirty={dirtyFields.has('management_fees')} />
          )}

          {/* Charges récurrentes (Atom/Other only) */}
          {isAtomOther && (
            <>
              <SectionTitle>Charges récurrentes</SectionTitle>
              <NumInput label="EDF" value={perf.edf} onChange={v => updateField('edf', v)} dirty={dirtyFields.has('edf')} />
              <NumInput label="Syndic" value={perf.syndic} onChange={v => updateField('syndic', v)} dirty={dirtyFields.has('syndic')} />
              <NumInput label="Internet" value={perf.internet} onChange={v => updateField('internet', v)} dirty={dirtyFields.has('internet')} />
              <NumInput label="Taxe foncière (mensual.)" value={perf.property_tax} onChange={v => updateField('property_tax', v)} dirty={dirtyFields.has('property_tax')} />
              <NumInput label="Assurance" value={perf.insurance} onChange={v => updateField('insurance', v)} dirty={dirtyFields.has('insurance')} />
              <NumInput label="Autres charges" value={perf.other_charges} onChange={v => updateField('other_charges', v)} dirty={dirtyFields.has('other_charges')} />
            </>
          )}

          {/* Occupation */}
          <SectionTitle>Occupation</SectionTitle>
          <NumInput label={`Nuits louées / ${perf.nights_available} dispo`} value={perf.nights_booked} onChange={v => updateField('nights_booked', v)} dirty={dirtyFields.has('nights_booked')} />
          <NumInput label="Nombre de séjours" value={perf.total_stays} onChange={v => updateField('total_stays', v)} dirty={dirtyFields.has('total_stays')} />

          {/* Statut + Notes */}
          <SectionTitle>Statut</SectionTitle>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {(['draft', 'submitted', 'validated'] as const).map(s => (
              <button
                key={s}
                onClick={() => updateField('status', s)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', border: '1px solid',
                  background: perf.status === s ? (s === 'validated' ? 'rgba(76,175,125,.15)' : s === 'submitted' ? 'rgba(184,151,90,.15)' : '#1e1d1a') : 'transparent',
                  color: perf.status === s ? (s === 'validated' ? '#4caf7d' : s === 'submitted' ? '#B8975A' : '#F5F2ED') : '#7a7874',
                  borderColor: perf.status === s ? (s === 'validated' ? '#4caf7d' : s === 'submitted' ? '#B8975A' : '#2c2b27') : '#2c2b27',
                }}
              >
                {s === 'draft' ? 'Brouillon' : s === 'submitted' ? 'Soumis' : 'Validé'}
              </button>
            ))}
          </div>

          <textarea
            value={perf.notes ?? ''}
            onChange={e => updateField('notes', e.target.value)}
            placeholder="Notes…"
            rows={3}
            style={{
              width: '100%', background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '8px',
              padding: '10px 12px', fontSize: '13px', color: '#F5F2ED', resize: 'vertical', outline: 'none',
              boxSizing: 'border-box', fontFamily: 'inherit',
            }}
          />

          {/* Save button */}
          {canWrite && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <button
                onClick={save}
                disabled={saveStatus === 'saving'}
                style={{
                  background: saveStatus === 'saved' ? 'rgba(76,175,125,.15)' : '#B8975A',
                  color: saveStatus === 'saved' ? '#4caf7d' : '#0f0e0c',
                  border: saveStatus === 'saved' ? '1px solid #4caf7d' : 'none',
                  borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600,
                  cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer',
                }}
              >
                {saveStatus === 'saving' ? 'Enregistrement…' : saveStatus === 'saved' ? '✓ Enregistré' : 'Enregistrer le mois'}
              </button>
              {dirtyFields.size > 0 && saveStatus === 'idle' && (
                <span style={{ fontSize: '11px', color: '#7a7874' }}>Modifications non sauvegardées · Cmd+S</span>
              )}
              {saveStatus === 'error' && (
                <span style={{ fontSize: '11px', color: '#d95e5e' }}>Erreur lors de la sauvegarde</span>
              )}
            </div>
          )}
          </div>{/* end read-only wrapper */}
        </div>

        {/* Right: Real-time P&L (only for writers) */}
        {canWrite && <div style={{ position: 'sticky', top: '76px' }}>
          <div style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874', marginBottom: '12px' }}>
              Calculs temps réel
            </div>

            {computed && (
              <>
                <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '4px', letterSpacing: '.05em' }}>P&L</div>
                <KpiLine label="Operating Profit" value={fmtEur(computed.operatingProfit)} highlight />
                {isAtomOther && (
                  <>
                    <KpiLine label={`Atom Net Revenue`} value={fmtEur(computed.atomNetRevenue)} highlight />
                    <KpiLine label="Charges totales" value={fmtEur(computed.chargesTotal)} />
                    <KpiLine label="SCI Net Revenue" value={fmtEur(computed.sciNetRevenue)} highlight />
                  </>
                )}

                <div style={{ height: '1px', background: '#2c2b27', margin: '12px 0' }} />

                <div style={{ fontSize: '10px', color: '#7a7874', marginBottom: '4px', letterSpacing: '.05em' }}>Occupation</div>
                <KpiLine label="Taux d'occupation" value={fmtPct(computed.occupancyRate)} />
                <KpiLine label="ADR" value={fmtEur(computed.adr)} />
                <KpiLine label="RevPAR" value={fmtEur(computed.revpar)} />
                <KpiLine label="Séjour moyen" value={computed.avgStayLength > 0 ? `${computed.avgStayLength.toFixed(1)} nuits` : '—'} />
              </>
            )}
          </div>
        </div>}
      </div>

      {/* Last 6 months table */}
      {last6.length > 0 && (
        <div style={{ marginTop: '32px', background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #2c2b27' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: '#7a7874' }}>
              Historique — 6 derniers mois
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#1a1916' }}>
                  {['Mois', 'Revenus', 'Op. Profit', 'Net Revenue', 'Occ.', 'Statut'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7874', borderBottom: '1px solid #2c2b27' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {last6.map(m => (
                  <tr
                    key={m.month}
                    onClick={() => setCurrentMonth(m.month)}
                    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(44,43,39,.6)' }}
                    className="hist-row"
                  >
                    <td style={{ padding: '11px 16px', fontSize: '13px', color: '#F5F2ED', textTransform: 'capitalize' }}>{monthLabel(m.month)}</td>
                    <td style={{ padding: '11px 16px', fontSize: '13px', color: '#F5F2ED', fontVariantNumeric: 'tabular-nums' }}>{fmtEur(m.gross_revenue)}</td>
                    <td style={{ padding: '11px 16px', fontSize: '13px', color: (m.operating_profit ?? 0) >= 0 ? '#4caf7d' : '#d95e5e', fontVariantNumeric: 'tabular-nums' }}>{fmtEur(m.operating_profit)}</td>
                    <td style={{ padding: '11px 16px', fontSize: '13px', color: (m.net_revenue_atom ?? m.sci_net_revenue ?? 0) >= 0 ? '#B8975A' : '#d95e5e', fontVariantNumeric: 'tabular-nums' }}>{fmtEur(m.net_revenue_atom ?? m.sci_net_revenue)}</td>
                    <td style={{ padding: '11px 16px', fontSize: '13px', color: '#F5F2ED' }}>{m.occupancy_rate != null ? `${m.occupancy_rate.toFixed(0)} %` : '—'}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: m.status === 'validated' ? 'rgba(76,175,125,.12)' : m.status === 'submitted' ? 'rgba(184,151,90,.12)' : '#1e1d1a', color: m.status === 'validated' ? '#4caf7d' : m.status === 'submitted' ? '#B8975A' : '#7a7874' }}>
                        {m.status === 'validated' ? 'Validé' : m.status === 'submitted' ? 'Soumis' : 'Brouillon'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        .hist-row:hover { background: rgba(255,255,255,.02) !important; }
      `}</style>
    </div>
  )
}
