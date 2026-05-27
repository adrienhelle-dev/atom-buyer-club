#!/bin/bash
# Ajoute les variables d'environnement manquantes dans le projet Vercel atom-buyer-club.
# Les valeurs se trouvent dans Vercel > atom-buyer-club-landing > Settings > Env vars
# ou dans le dashboard Supabase (Settings > API).
#
# Usage: bash scripts/setup-vercel-env.sh

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo ""
echo "=== Configuration des env vars Vercel pour atom-buyer-club ==="
echo ""
echo "Colle les valeurs depuis :"
echo "  • Supabase Dashboard > Settings > API"
echo "  • Vercel > atom-buyer-club-landing > Settings > Env vars"
echo ""

add_env() {
  local key=$1
  local hint=$2
  echo "──────────────────────────────────────────────"
  printf "%s\n  (%s)\n> " "$key" "$hint"
  read -r value
  if [ -z "$value" ]; then
    echo "  ⏭  Sauté (vide)"
    return
  fi
  printf '%s' "$value" | vercel env add "$key" production preview --force 2>&1 | grep -E "Added|Error|already" || true
  echo "  ✅  $key ajouté"
}

add_env "SUPABASE_URL"          "https://xxxx.supabase.co — Supabase > Settings > API"
add_env "SUPABASE_SERVICE_KEY"  "service_role key (secret) — Supabase > Settings > API"
add_env "JWT_SECRET"            "même valeur que dans atom-buyer-club-landing"
add_env "ADMIN_EMAILS"          "ex: thierry.vignal@atom-capital.fr,adrien.helle@atom-capital.fr"
add_env "ADMIN_PASSWORDS"       'JSON: {"email@domaine.fr":"motdepasse"}'
add_env "PROPERTY_MANAGERS_EMAILS" "optionnel — emails PMs séparés par virgule"

echo ""
echo "=== Variables configurées ==="
vercel env ls

echo ""
echo "✅  Done. Le prochain déploiement Vercel utilisera ces valeurs."
echo "    Vérifie sur https://vercel.com/adrienhelle-6311s-projects/atom-buyer-club"
echo ""
