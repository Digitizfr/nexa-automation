# CLAUDE.md — NEXA Automation Website

> Fichier de référence pour Claude Code. À conserver à la racine du projet.  
> Mis à jour manuellement lors de tout changement structurel.

---

## 1. Présentation du projet

**Nom du site :** NEXA Automation  
**Type :** Site vitrine pour agence d'automatisation  
**Audience cible :** PME, dirigeants, responsables ops souhaitant automatiser leurs processus métiers  
**Langue principale :** Français  
**Statut :** En cours de développement

---

## 2. Stack technique

| Couche | Choix |
|---|---|
| Framework | Astro 5 (mode statique `output: "static"`) |
| Styles | Tailwind CSS v4 |
| Langage | TypeScript strict (`"strict": true`) |
| Composants interactifs | Astro Islands avec React (uniquement si interactivité réelle nécessaire) |
| Contenu | Fichiers Markdown/MDX dans `src/content/` via Content Collections |
| Icônes | `astro-icon` + Iconify (pack `lucide`) |
| Polices | Variable fonts via `@fontsource` ou Google Fonts auto-hébergées |
| Formulaires | Formulaire de contact statique → endpoint externe (à préciser) |

### Règles TypeScript strictes
- Toujours typer les props des composants Astro avec des interfaces
- Pas de `any` — utiliser `unknown` si le type est indéterminé
- Pas d'assertions `as X` sauf justification commentée
- Les imports de types doivent utiliser `import type { ... }`

---

## 3. Structure du projet

```
nexa-automation/
├── public/
│   ├── logo.svg              # Logo fourni par le client — NE PAS MODIFIER
│   ├── favicon.ico
│   └── fonts/                # Polices auto-hébergées
├── src/
│   ├── assets/               # Images traitées par Astro (webp, optimisation)
│   ├── components/
│   │   ├── ui/               # Composants atomiques (Button, Badge, Card…)
│   │   ├── sections/         # Sections de pages (Hero, Services, CTA…)
│   │   └── layout/           # Header, Footer, Nav
│   ├── content/
│   │   ├── config.ts         # Schémas Content Collections
│   │   ├── blog/             # Articles (*.md ou *.mdx)
│   │   └── case-studies/     # Cas clients (*.md ou *.mdx)
│   ├── layouts/
│   │   ├── BaseLayout.astro  # Layout principal (head, meta, body)
│   │   └── PostLayout.astro  # Layout article blog
│   ├── pages/
│   │   ├── index.astro       # Home / Landing
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   ├── a-propos.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── styles/
│   │   └── global.css        # Variables CSS + imports Tailwind
│   └── utils/
│       └── helpers.ts        # Fonctions utilitaires pures
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── CLAUDE.md
```

---

## 4. Charte graphique

> ⚠️ Le logo et la charte graphique sont fournis par le client.  
> Claude Code NE DOIT PAS inventer de couleurs, polices ou style visuel.  
> Attendre que les fichiers soient ajoutés dans `public/` et `src/assets/` avant de coder les styles.

### À faire dès réception de la charte :
1. Extraire les couleurs → les déclarer comme variables CSS dans `src/styles/global.css`
2. Extraire les polices → les auto-héberger dans `public/fonts/`
3. Mettre à jour cette section avec les valeurs exactes

### Variables CSS (à compléter)
```css
/* src/styles/global.css */
@layer base {
  :root {
    --color-brand-primary: /* à compléter */;
    --color-brand-secondary: /* à compléter */;
    --color-brand-accent: /* à compléter */;
    --color-bg: /* à compléter */;
    --color-surface: /* à compléter */;
    --color-text: /* à compléter */;
    --color-text-muted: /* à compléter */;
    --font-heading: /* à compléter */;
    --font-body: /* à compléter */;
    --radius-base: /* à compléter */;
  }
}
```

---

## 5. Pages et sections

### `/` — Home
- **Hero** : accroche principale, CTA primaire "Découvrir nos services", CTA secondaire "Prendre RDV"
- **Problème / Solution** : 3 douleurs clients + réponse NEXA
- **Services** : aperçu des 3–4 offres principales (cards)
- **Chiffres clés** : stats impactantes (temps économisé, workflows automatisés…)
- **Témoignages** : 2–3 citations clients
- **CTA final** : bandeau de conversion vers Contact

### `/services`
- Liste détaillée des offres (Make, n8n, API, IA…)
- Chaque service = section dédiée avec bénéfices + stack utilisée

### `/portfolio`
- Grille de cas clients (chargés via Content Collections)
- Filtre par secteur ou outil (optionnel)
- Page détail par cas client : `/portfolio/[slug]`

### `/a-propos`
- Histoire et positionnement de NEXA
- Équipe / fondateur
- Valeurs et approche

### `/contact`
- Formulaire (nom, email, entreprise, message, budget estimé)
- Lien Calendly ou RDV intégré (à préciser)
- Informations de contact directes

### `/blog` *(optionnel, activable)*
- Liste des articles
- Pages articles via `[...slug].astro`

---

## 6. SEO & performance

- **Meta title/description** : chaque page définit ses propres valeurs via props dans `BaseLayout.astro`
- **Open Graph** : image OG générée statiquement ou par page
- **Sitemap** : `@astrojs/sitemap` activé
- **Robots.txt** : à la racine dans `public/`
- **Images** : toujours utiliser le composant `<Image>` d'Astro (`astro:assets`), jamais de balise `<img>` nue
- **Core Web Vitals** : pas de JavaScript côté client sans `client:*` justifié — privilégier `client:visible` ou `client:idle`
- **Polices** : `font-display: swap` + préchargement des variantes utilisées

---

## 7. Déploiement — VPS

### Environnement cible
- **Serveur** : VPS Linux (Ubuntu 22.04+ recommandé)
- **Reverse proxy** : Nginx
- **Build** : statique (`astro build` → dossier `dist/`)
- **Containerisation** : Docker + Docker Compose (recommandé)

### Fichiers à créer lors de la phase déploiement
- `Dockerfile` (image Nginx servant le dossier `dist/`)
- `docker-compose.yml`
- `nginx.conf` (gzip, cache headers, redirections 404 → index)
- Script CI/CD (GitHub Actions ou équivalent) : build → push image → redémarrage sur VPS

### Commandes projet
```bash
# Développement
npm run dev          # Serveur local http://localhost:4321

# Production
npm run build        # Génère dist/
npm run preview      # Prévisualisation du build

# Docker
docker compose up -d --build   # Lance le site en production
```

---

## 8. Conventions de code

### Nommage
- **Composants Astro** : `PascalCase.astro` (ex: `HeroSection.astro`)
- **Fichiers utilitaires** : `camelCase.ts`
- **Pages** : `kebab-case.astro` (ex: `a-propos.astro`)
- **Variables CSS** : `--color-*`, `--font-*`, `--radius-*`, `--spacing-*`

### Composants Astro
- Toujours déclarer une interface `Props` explicite
- Pas de logique métier dans les composants — la déplacer dans `src/utils/`
- Les composants `sections/` ne reçoivent que des données simples, pas de fetch

### Commits Git
```
feat: ajout section témoignages sur la home
fix: correction lien nav mobile
style: ajustement espacement Hero
refactor: extraction composant Card réutilisable
content: ajout cas client Exemple SAS
```

---

## 9. Ce que Claude Code NE DOIT PAS faire

- ❌ Modifier les fichiers dans `public/logo.*` — le logo est fourni par le client
- ❌ Inventer une charte graphique avant réception des fichiers clients
- ❌ Ajouter des dépendances npm sans les signaler (ex: Framer Motion, GSAP)
- ❌ Utiliser `<img>` à la place du composant `<Image>` d'Astro
- ❌ Créer du JavaScript client inutile (Astro est statique par défaut)
- ❌ Hardcoder des textes de contenu dans les composants — les passer via props
- ❌ Modifier `CLAUDE.md` sans validation explicite

---

## 10. Tâches initiales (ordre recommandé)

- [ ] `npm create astro@latest` avec template minimal + TypeScript strict
- [ ] Installer Tailwind CSS v4 (`@astrojs/tailwind`)
- [ ] Installer `@astrojs/sitemap`, `astro-icon`
- [ ] Créer la structure de dossiers décrite en §3
- [ ] Créer `BaseLayout.astro` avec slots pour head/body
- [ ] **Attendre la charte graphique** → configurer variables CSS + polices
- [ ] Développer les composants UI de base (Button, Card, Badge)
- [ ] Développer Header + Footer
- [ ] Développer les sections page par page
- [ ] Configurer Content Collections pour blog et portfolio
- [ ] Écrire Dockerfile + docker-compose.yml + nginx.conf
- [ ] Configurer GitHub Actions pour CI/CD VPS

---

*Dernière mise à jour : 2026-03-15*  
*Projet : NEXA Automation — Site vitrine Astro*
