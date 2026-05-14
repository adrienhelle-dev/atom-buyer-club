# Atom Buyers Club

Site web de Atom Buyers Club — club privé d'investisseurs dans le micro-logement parisien.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Google Fonts** — Cormorant Garamond + DM Sans (via `next/font/google`)

## Démarrage local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## Build de production

```bash
npm run build
npm run start
```

## Déploiement sur Vercel (recommandé)

1. Pousser sur GitHub :
   ```bash
   git remote add origin https://github.com/VOTRE_ORG/atom-buyer-club.git
   git push -u origin main
   ```

2. Sur [vercel.com](https://vercel.com) : **New Project** → importer le repo → Deploy.

Aucune variable d'environnement requise pour le site statique.

## Structure du projet

```
app/
  layout.tsx                        # Root layout, fonts, metadata
  page.tsx                          # Page d'accueil (assemble les sections)
  globals.css                       # Tailwind + CSS custom properties
  mentions-legales/page.tsx
  politique-de-confidentialite/page.tsx
  cgu/page.tsx

components/
  Navbar.tsx                        # Navigation fixe, transparente au scroll
  Hero.tsx                          # Section plein écran + compteur animé
  Services.tsx                      # 3 colonnes : Sourcing, Travaux, Gestion
  Process.tsx                       # Timeline 6 étapes
  FinancialExample.tsx              # Tableau de coûts + métriques clés
  Portfolio.tsx                     # Cartes projets (Assomption, Saint-Antoine)
  Testimonials.tsx                  # 4 témoignages clients
  FAQ.tsx                           # Accordion 9 questions
  JoinClub.tsx                      # CTA WhatsApp + contacts équipe
  Footer.tsx                        # Mentions légales complètes
  Logo.tsx                          # SVG logo inline (dark/light)

public/assets/
  logo-atom-buyer-club.svg          # Logo dark
  logo-atom-buyer-club-light.svg    # Logo light (fond sombre)
```

## A personnaliser avant mise en ligne

- **Lien WhatsApp** : remplacer `https://chat.whatsapp.com/PLACEHOLDER` par le vrai lien
- **Logo Microsurfaces** : ajouter `/public/assets/logo-microsurfaces.jpeg`
- **Photos des projets** : remplacer les placeholders dans `Portfolio.tsx` par de vraies images
- **Domaine** : configurer dans Vercel Settings

## Entite legale

Atom Buyers Club est une marque commerciale de **Microsurfaces SAS**
RCS Paris 937 663 052 — N CPI 7501 2025 000 000 458
