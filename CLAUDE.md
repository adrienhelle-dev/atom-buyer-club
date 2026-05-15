@AGENTS.md

# Atom Buyers Club — Contexte projet

## Vue d'ensemble
Site vitrine pour **Atom Buyers Club** (marque de Microsurfaces SAS).
Investissement clé-en-main dans le micro-logement parisien.
URL production : **atombuyersclub.fr**
Repo GitHub : `adrienhelle-dev/atom-buyer-club`
Deploy : Vercel (auto-deploy sur push `main`)

---

## Stack technique
- **Next.js 16.2.6** App Router + Turbopack
- **TypeScript** strict
- **Framer Motion** pour toutes les animations (whileInView, viewport once)
- **`styled-jsx`** pour les media queries composant par composant
- **`next/og`** (Satori) pour l'image Open Graph
- Tailwind CSS chargé via globals.css mais peu utilisé — inline styles majoritaires

---

## Design system

| Token | Valeur |
|---|---|
| Background dark | `#1A1A1A` / `#0f0e0c` |
| Background light | `#F5F2ED` (cream) |
| Or | `#B8975A` |
| Bleu | `#5C6BC0` |
| Texte principal | `#F5F2ED` (sur dark) / `#1A1A1A` (sur light) |
| Border radius | `2px` partout |
| Font serif | `Cormorant Garamond` (weight 300/400) |
| Font sans | `DM Sans` (weight 300/400/500) |
| Padding section desktop | `120px` vertical |
| Padding section tablette | `88px` (via `.section-main`) |
| Padding section mobile | `64px` (via `.section-main`) |

**Responsive sections** : toutes les sections principales ont `className="section-main"`.
La classe est définie dans `app/globals.css` avec `!important` pour écraser les inline styles.

---

## Architecture des fichiers clés

```
app/
  page.tsx              — ordre des sections
  opengraph-image.tsx   — image OG (Satori, font TTF locale)
  fonts/
    CormorantGaramond-Light.ttf   — BUNDLÉ en repo, lu via fs.readFileSync
                                    (Satori n'accepte pas WOFF2, TTF obligatoire)
  globals.css           — tokens CSS + .section-main responsive

components/
  Navbar.tsx            — nav fixe, scroll effect, hamburger mobile, FR/EN toggle
  Hero.tsx              — hero principal
  Services.tsx          — 3 cards (grid 3col desktop → 1col ≤1024px)
  Process.tsx           — timeline verticale 8 étapes (STEP_DETAILS inline bilingue)
  FinancialExample.tsx  — exemple chiffré (fond cream)
  Portfolio.tsx         — carousel horizontal de projets + card "+"
  Studio3D.tsx          — iframe vers /public/studio-3d.html
  PhotoCarousel.tsx     — carrousel photos (height: clamp(300px, 56.25vw, 900px))
  Testimonials.tsx      — 6 témoignages (grid 3col / 2col / 1col)
  FAQ.tsx               — accordéon
  JoinClub.tsx          — CTA WhatsApp + contacts équipe
  Footer.tsx

lib/
  i18n.ts               — TOUTES les traductions FR + EN (source unique de vérité)
  config.ts             — MEMBER_COUNT (fallback "800", env NEXT_PUBLIC_MEMBER_COUNT)

public/
  studio-3d.html        — viewer 3D avant/après autonome (vanilla JS, Three.js CDN)
  realisations/         — realisation-01.jpg … realisation-10.jpg
  process-motion.html   — page standalone motion design du processus (non intégré)
```

---

## i18n
Bilingue FR / EN via `context/LanguageContext`.
Toutes les strings sont dans `lib/i18n.ts`.
Utilisation : `const { tr, lang } = useLanguage()` dans chaque composant.
Le composant `Process.tsx` gère ses bullets détaillés **en dehors** de i18n (const `STEP_DETAILS` et `PHASE_LABELS` inline).

---

## Sections — état actuel

### Navbar
Logo "atom / BUYERS CLUB". Scroll effect : fond transparent → cream opaque.
Liens : Notre offre · Processus · Deal flow · FAQ + bouton Rejoindre (WhatsApp).

### Services
3 cards : Sourcing / Travaux & Design / Gestion & Exploitation.
Card centrale (index 1) : fond sombre `#1A1A1A`, or.
Grid : `repeat(3, 1fr)` desktop → `1fr` ≤1024px.

### Process
Timeline verticale, 8 étapes. Ligne or verticale CSS (`linear-gradient`).
Chaque étape : numéro outline Cormorant (80px) + phase badge + titre / description i18n + bullets STEP_DETAILS.
Responsive : 2 colonnes desktop → 1 colonne ≤900px (`.process-step-grid`).
**Pas de note box en bas** (supprimée).

Étapes et détails à jour :
- 01 Capacité d'emprunt · 02 Sélection · 03 Offre d'achat · 04 Promesse (10j nom propre)
- 05 Conception · 06 Acte de vente · 07 Travaux (8–12 sem) · 08 Mise en location (bail 1 an renouvelable)

### Portfolio (Deal Flow)
Carousel horizontal. Projets : Assomption (Paris 16e, dispo) + Rome (Paris 9e, vendu).
Card "+" = lien WhatsApp groupe.
Section id="realisations".

### Studio3D
iframe vers `/studio-3d.html`. Viewer avant/après avec slider.
Hauteur : `clamp(600px, 90vh, 1100px)`.

### PhotoCarousel
10 photos (realisation-01 à 10). Ratio 16:9 : `clamp(300px, 56.25vw, 900px)`.

### Testimonials
6 témoignages réels :
- Marc D. (Paris 11e) · Sophie L. (Paris 16e) · Thomas B. (Paris 9e)
- Caroline B. (Paris 18e, Montmartre 10m²) · Laurine B. (Paris 9e) · Lassaad B. (Paris 17e)
Grid : 3col desktop / 2col tablette / 1col mobile.

### OG Image (`/opengraph-image`)
Font **Cormorant Garamond TTF** lue depuis `app/fonts/CormorantGaramond-Light.ttf` via `fs.readFileSync`.
⚠️ Ne jamais passer en fetch réseau — Satori plante au build si la réponse n'est pas un TTF valide.
Contenu : "atom / BUYERS CLUB" + headline FR + 3 stats (MEMBER_COUNT · 0% · Paris).

---

## Contacts équipe
- Thierry Vignal — thierry.vignal@atom-capital.fr
- Alexandre Kiman — alexandre.kiman@atom-capital.fr
- Adrien Helle — adrien.helle@atom-capital.fr

WhatsApp groupe : `https://chat.whatsapp.com/FgUjjDMT6ofKptPEHBxocp?mode=gi_t`

---

## Points d'attention / pièges connus

1. **Font OG** : Satori n'accepte QUE le TTF/OTF. Le WOFF2 crash le build (`wOF2` signature refusée). La font est bundlée en repo, ne pas la supprimer.

2. **Inline styles vs CSS** : Les paddings de section sont en inline style `120px`. Le responsive utilise `.section-main` dans globals.css avec `!important` pour les écraser sur mobile/tablette.

3. **`styled-jsx`** : Les media queries spécifiques aux composants sont dans des blocs `<style jsx>`. Scoped automatiquement au composant.

4. **MEMBER_COUNT** : Défini dans `lib/config.ts` (fallback "800"). Peut être surchargé via variable d'env Vercel `NEXT_PUBLIC_MEMBER_COUNT`.

5. **DNS** : atombuyersclub.fr → A record `76.76.21.21` + CNAME `www` chez IONOS. Redirects 301 configurés sur Vercel.

6. **`process-motion.html`** : Fichier standalone dans `/public/`, non intégré dans le site principal. Accessible sur `/process-motion.html`.
