# CLAUDE.md - The Backroom

## Project Overview

The Backroom is a community-driven platform for discovering, rating, and reviewing Football Manager tactics. Think "Goodreads for Football Manager." Users browse, rate, review, and submit tactics with real game data (win rates, match stats).

**Live site:** https://thebackroom.fm

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **Backend/DB:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (`@supabase/ssr`)
- **Hosting:** Vercel

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout (metadata, fonts, analytics)
│   ├── page.tsx           # Homepage (client component)
│   └── globals.css        # Global styles, CSS variables, utilities
├── components/
│   ├── Navigation.tsx     # Sticky navbar with search & auth
│   ├── Hero.tsx           # Hero section with gradient
│   ├── HeroCanvas.tsx     # Canvas animation (tactical sequences)
│   ├── FilterCard.tsx     # Multi-criteria tactic search/filter
│   ├── ResultsGrid.tsx    # Grid of tactic cards with sorting
│   ├── TacticCard.tsx     # 3-face flip card (formation/stats/quote)
│   ├── StaffPicks.tsx     # Curated editor selections
│   ├── Community.tsx      # Manager leaderboard & reviews
│   ├── Footer.tsx         # Footer with navigation
│   └── index.ts           # Barrel exports
└── lib/
    └── supabase/
        ├── client.ts      # Browser Supabase client
        ├── server.ts      # Server-side Supabase client
        └── index.ts       # Barrel exports
```

## Design System

**Colors (Warm Charcoal + Copper):**
- Background: `#100E0C` (charcoal), Surface: `#1E1A16`
- Accent: `#C4875A` (copper)
- Text: `#F0E6D6` (cream), `#B8A898` (secondary), `#7A6E62` (muted)
- Pitch: `#1A2418` (dark), `#2A3A28` (lines)

**Typography:**
- Headings: Fraunces (serif)
- Body: Outfit (sans-serif)
- Mono: JetBrains Mono

**Animation easing:** `cubic-bezier(0.16, 1, 0.3, 1)`

## Conventions

- Client components use `'use client'` directive
- Components export via barrel file (`components/index.ts`)
- Tailwind for styling; CSS variables for theme tokens (`--copper`, `--cream-muted`, etc.)
- Custom utility classes in `globals.css` (`.chip`, `.tag`, `.wr-badge`, `.star-filled`)
- `useCallback` for animation callbacks to prevent re-render loops
- Canvas API used for complex interactive animations (HeroCanvas)

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_SITE_URL=https://thebackroom.fm
NEXT_PUBLIC_ADS_ENABLED
```

## Key Patterns

- Next.js App Router with mix of server and client components
- Supabase clients split: `client.ts` for browser, `server.ts` for SSR
- Responsive grid layouts with explicit row/column assignments
- Tactic cards use multi-face hover animation (CSS transforms)
- Image optimization configured in `next.config.js` for external domains
