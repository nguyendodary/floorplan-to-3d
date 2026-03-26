# Roomifi

AI SaaS platform that transforms 2D floor plans into 3D visualizations.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Puter.js (Auth, KV Storage, File Hosting) |

## Project Structure

```
roomifi/
├── index.html                  # Entry HTML + Puter.js SDK + theme script
├── package.json
├── vite.config.ts              # Vite + React + Tailwind plugins
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # App TypeScript config
├── Dockerfile                  # Multi-stage build (Node + Nginx)
├── docker-compose.yml
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx                # Entry: ThemeProvider > PuterProvider > App
    ├── App.tsx                 # Root component
    ├── index.css               # Tailwind import + dark variant config
    ├── assets/
    │   └── hero.png
    ├── components/
    │   ├── index.ts            # Barrel exports
    │   ├── Navbar.tsx          # Auth state, theme toggle, logo
    │   ├── Hero.tsx            # Landing hero section
    │   ├── UploadZone.tsx      # File upload, AI transform, result display
    │   ├── CommunityFeed.tsx   # Recent transformations from KV
    │   └── Footer.tsx
    ├── context/
    │   ├── index.ts            # Barrel exports
    │   ├── PuterContext.ts     # usePuter hook definition
    │   ├── PuterProvider.tsx   # Auth, AI, FS, KV operations
    │   └── ThemeContext.tsx    # Dark/light mode toggle
    └── types/
        └── index.ts            # Puter SDK types, app interfaces
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

### Docker

```bash
docker-compose up -d --build
```

Opens at `http://localhost:8080`.

## Features

- **Puter.js Auth** - Sign in/out via Puter SDK
- **Image Upload** - Drag-and-drop or click to upload floor plan images (PNG, JPG, WEBP up to 10MB)
- **AI Transformation** - Uses `puter.ai.txt2img` to generate 3D renders from floor plans
- **Community Feed** - Browse recent transformations stored in Puter KV
- **Delete Own Posts** - Users can remove their own transformations
- **Dark/Light Mode** - Persisted to localStorage, defaults to system preference
- **Responsive** - Mobile-first layout using Tailwind breakpoints

## Architecture

### Data Flow

```
User uploads image
  → FileReader reads as data URL
  → puter.ai.txt2img generates 3D render
  → Result displayed side-by-side (2D vs 3D)
  → Saved to Puter KV for community feed
```

### Puter.js Usage

| Service | Usage |
|---------|-------|
| `puter.auth` | User sign in/out, get current user |
| `puter.ai.txt2img` | Image-to-image generation (2D → 3D) |
| `puter.kv` | Store/retrieve transformation metadata |
| `puter.fs` | Upload files to Puter hosting |

### Theming

Dark mode is the default. The theme toggle in the navbar switches between `dark` and `light` classes on `<html>`. Tailwind's `@custom-variant dark (&:where(.dark, .dark *))` enables class-based dark mode selectors.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
