import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value
  return token ? verifyToken(token) : null
}

// Liste des réalisations (showroom_items du CRM, base Supabase partagée) pour
// alimenter le sélecteur "Réalisation liée" sur la fiche asset.
export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data, error } = await supabase
    .from('showroom_items')
    .select('id, name, slug, arrondissement, statut_location')
    .order('name', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}
