# Recipe Browser — Installation & Quick Start

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10 (this project uses `package-lock.json`)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm run dev
```

The app boots at **http://localhost:5173** (binds `0.0.0.0`).

### 3. Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the built app locally
```

## Demo Accounts

| Email            | Username | Password | Role  |
| ---------------- | -------- | -------- | ----- |
| cenius@cenius.ai | cenius   | cenius   | admin |

Demo accounts are for preview and evaluation only. Remove them before any production deploy.

## Architecture

- **Vue 3** SPA (Composition API, `<script setup>`)
- **Vite 5** dev server & bundler
- **Vue Router 4** with lazy-loaded route views
- **Pinia 2** state management (recipes, favorites, auth)
- **Tailwind CSS 3** utility-first styling
- No backend — all data is seeded from a static JSON file; favorites and auth token are persisted to `localStorage`.

## Project Structure

```
src/
├── assets/styles/main.css    ← Tailwind directives + design tokens
├── components/
│   ├── layout/               ← AppHeader, AppFooter (bottom tabs)
│   ├── RecipeCard.vue
│   ├── SearchBar.vue
│   ├── CategoryFilter.vue
│   └── FavoritesToggle.vue
├── composables/              ← useSearch, useCategoryFilter
├── data/recipes.json         ← 24 seed recipes
├── router/index.js           ← routes + auth guard
├── stores/                   ← Pinia: auth, recipes, favorites
├── views/                    ← Route-level pages
├── App.vue
└── main.js
```

## Design Notes

- **Soft dark** mode (warm slate, not pure black)
- **Bottom-tab navigation** (mobile-first shell)
- **Geist** type family (Google Fonts)
- **Accent**: `#4675d8` (used throughout as the single accent color)
- Hairline borders, `rounded-lg`, no shadows — calm editorial aesthetic
