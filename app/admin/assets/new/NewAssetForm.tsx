'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', color: '#7a7874', marginBottom: '5px', letterSpacing: '.04em' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#1e1d1a', border: '1px solid #2c2b27', borderRadius: '7px',
  padding: '9px 12px', fontSize: '13px', color: '#F5F2ED', outline: 'none', boxSizing: 'border-box',
}

export default function NewAssetForm() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    address: '', postal_code: '', arrondissement: '', nickname: '',
    segment: 'atom', sci_name: '', client_name: '',
    monthly_rent: '', date_lease_start: '', date_lease_end: '',
    status: 'active', launch_date: '', notes: '',
  })

  function set(k: string, v: string) { setForm(prev => ({ ...prev, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        monthly_rent: form.monthly_rent ? parseFloat(form.monthly_rent) : null,
        date_lease_start: form.date_lease_start || null,
        date_lease_end: form.date_lease_end || null,
        launch_date: form.launch_date || null,
      }
      const res = await fetch('/api/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur'); return }
      router.push(`/admin/assets/${data.id}`)
    } catch {
      setError('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: '28px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#7a7874', fontSize: '12px', cursor: 'pointer', padding: 0 }}>← Retour</button>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '26px', fontWeight: 300, color: '#F5F2ED', margin: '10px 0 0' }}>Nouvel asset</h1>
      </div>

      {error && (
        <div style={{ background: 'rgba(217,94,94,.1)', border: '1px solid rgba(217,94,94,.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#d95e5e', marginBottom: '16px' }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#161512', border: '1px solid #2c2b27', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Adresse *">
            <input required value={form.address} onChange={e => set('address', e.target.value)} placeholder="96 rue Saint Antoine" style={inputStyle} />
          </Field>
          <Field label="Surnom (nickname)">
            <input value={form.nickname} onChange={e => set('nickname', e.target.value)} placeholder="Saint Antoine" style={inputStyle} />
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <Field label="Code postal">
            <input value={form.postal_code} onChange={e => set('postal_code', e.target.value)} placeholder="75004" style={inputStyle} />
          </Field>
          <Field label="Arrondissement">
            <input value={form.arrondissement} onChange={e => set('arrondissement', e.target.value)} placeholder="4e" style={inputStyle} />
          </Field>
          <Field label="Statut">
            <select value={form.status} onChange={e => set('status', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="active">Actif</option>
              <option value="onboarding">Démarrage</option>
              <option value="paused">Pause</option>
              <option value="archived">Archivé</option>
            </select>
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Segment *">
            <select required value={form.segment} onChange={e => set('segment', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="atom">Atom (sous-location directe)</option>
              <option value="other">Other (structure séparée)</option>
              <option value="monitoring">Monitoring (gestion compte tiers)</option>
            </select>
          </Field>
          <Field label="SCI / Client">
            <input value={form.segment === 'monitoring' ? form.client_name : form.sci_name}
              onChange={e => set(form.segment === 'monitoring' ? 'client_name' : 'sci_name', e.target.value)}
              placeholder={form.segment === 'monitoring' ? 'Reda\'s, Elodie Garamond…' : 'SCI Stamina, SCI Skak…'}
              style={inputStyle} />
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <Field label="Loyer mensuel (€)">
            <input type="number" value={form.monthly_rent} onChange={e => set('monthly_rent', e.target.value)} placeholder="1 450" style={inputStyle} />
          </Field>
          <Field label="Début de bail">
            <input type="date" value={form.date_lease_start} onChange={e => set('date_lease_start', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Fin de bail">
            <input type="date" value={form.date_lease_end} onChange={e => set('date_lease_end', e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <Field label="Date de lancement (1er mois avec revenus)">
          <input type="date" value={form.launch_date} onChange={e => set('launch_date', e.target.value)} style={{ ...inputStyle, maxWidth: '200px' }} />
        </Field>

        <Field label="Notes">
          <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
        </Field>

        <button type="submit" disabled={saving} style={{
          marginTop: '8px', alignSelf: 'flex-start',
          background: saving ? 'rgba(184,151,90,.4)' : '#B8975A',
          color: '#0f0e0c', border: 'none', borderRadius: '8px',
          padding: '11px 24px', fontSize: '13px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
        }}>
          {saving ? 'Création…' : 'Créer l\'asset'}
        </button>
      </form>
    </div>
  )
}
