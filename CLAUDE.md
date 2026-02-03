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
- **Hosting:** Vercel (auto-deploys from main branch)

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build (always run before pushing)
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout (metadata, fonts, favicon)
│   ├── page.tsx           # Homepage (client component, all sections)
│   └── globals.css        # Global styles, CSS variables, utilities
├── components/
│   ├── Navigation.tsx     # Sticky navbar with search, hamburger menu on mobile
│   ├── Hero.tsx           # Hero section with gradient + canvas animation
│   ├── HeroCanvas.tsx     # Canvas animation (tactical match sim, hidden on mobile)
│   ├── FilterCard.tsx     # Multi-criteria tactic search/filter (4-col → stacked)
│   ├── ResultsGrid.tsx    # Grid of tactic cards with sorting (4→2→1 col)
│   ├── TacticCard.tsx     # 3-face flip card (formation/stats/quote)
│   ├── StaffPicks.tsx     # Curated editor selections with featured pick
│   ├── Community.tsx      # Manager leaderboard + tactic reviews (2-col → stacked)
│   ├── Newsletter.tsx     # Email signup with weekly digest copy
│   ├── Footer.tsx         # Footer with nav columns + social links
│   └── index.ts           # Barrel exports
└── lib/
    └── supabase/
        ├── client.ts      # Browser Supabase client
        ├── server.ts      # Server-side Supabase client
        └── index.ts       # Barrel exports
```

## Design System

**Colors (Warm Charcoal + Copper) — defined in globals.css :root:**
- Background: `#1A1714` (--bg), Warm: `#211D19` (--bg-warm)
- Surface: `#2A2520` / `#332D26` (hover) / `#3A332B` (elevated)
- Accent: `#C4875A` (--copper), Bright: `#D4976A`
- Text: `#F2E8DA` (cream), `#CFC0B0` (secondary), `#9A8E82` (muted), `#6A6058` (faint)
- Pitch: `#1A2418` (dark), `#2A3A28` (lines), `#6A9A60` (green accent)
- Border: `#3E362C`

**Typography:**
- Headings: Fraunces (serif) — `var(--serif)`
- Body: Outfit (sans-serif) — `var(--sans)`
- Mono: JetBrains Mono — `var(--mono)`
- Hero title uses `clamp(36px, 4.2vw, 56px)` for fluid sizing

**Animation easing:** `cubic-bezier(0.16, 1, 0.3, 1)`

**Responsive breakpoints (Tailwind defaults):**
- Mobile first (base styles)
- `md:` 768px — tablet
- `lg:` 1024px — desktop
- Max content width: 1440px

## Current Homepage Sections (top to bottom)

1. **Navigation** — Fixed sticky navbar. Logo + search + links (Tactics, Ranking, Managers, About) + Submit/Login/Signup. Hamburger menu on mobile with dropdown.
2. **Hero** — "Find the right tactic for your save." Canvas match simulation on right (hidden on mobile). Action feed shows live sim events.
3. **FilterCard** (Explore Tactics) — 4-column filter: Formation picker, Playing Style chips, Team Level chips, FM Version + Rating + Win Rate. Quick search pills at bottom.
4. **ResultsGrid** — Collapsed CTA by default, expands to 4-col tactic card grid (2 on tablet, 1 on mobile). Sort by rating/win rate/downloads/newest.
5. **StaffPicks** — Featured #1 pick with editor note + mini pitch + stats block. #2 and #3 as runners-up side by side (stacked on mobile).
6. **Community** (From the Touchline) — Left: manager leaderboard with period toggle (week/month/all-time). Right: recent tactic reviews. Stacked on mobile.
7. **Newsletter** — Weekly digest signup. Copy left, email form right (stacked on mobile).
8. **Footer** — Brand + social links, Browse/Community/About nav columns.

## Conventions

- Client components use `'use client'` directive
- Components export via barrel file (`components/index.ts`)
- Tailwind for styling; CSS variables for theme tokens (`--copper`, `--cream-muted`, etc.)
- Custom utility classes in `globals.css` (`.chip`, `.tag`, `.wr-badge`, `.star-filled`, `.sec-eyebrow`)
- `useCallback` for animation callbacks to prevent re-render loops
- Canvas API used for complex interactive animations (HeroCanvas)
- Responsive: mobile-first approach with `md:` and `lg:` Tailwind prefixes
- All sections use responsive padding: `px-4 md:px-8 lg:px-12`
- Some inline styles use hardcoded `rgba(26,23,20,...)` for overlays (can't be themed via CSS vars)

## Copy Decisions (already implemented)

- Hero title: "Find the *right* tactic for *your save*" (right/your save in copper italic)
- Hero subtitle: "Football Manager tactics backed by real saves, real data, and real results."
- Search placeholder: "Search anything..." (not just tactics — future-proofed)
- Community section: eyebrow "The Community", title "From the Touchline"
- Reviews header: "Recent Tactic Reviews"
- Browser tab: "The Backroom - Football Manager tactics, rated and reviewed by the community."
- Favicon: SVG pitch icon at `/public/icon.svg`

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
- Responsive grid layouts using Tailwind responsive prefixes
- Tactic cards use multi-face hover animation (CSS transforms, 3 faces)
- Image optimization configured in `next.config.js` for external domains
- Navigation uses hamburger menu pattern with state toggle on mobile
- Community section uses `flex flex-col lg:grid lg:grid-cols-2` for responsive 2-col layout
- StaffPicks featured pick uses `flex flex-col lg:flex-row` for responsive layout

## What's Built (as of Feb 2026)

- Full homepage with all sections, polished design, responsive/mobile-ready
- Dark theme only (warm charcoal + copper)
- All data is hardcoded/mock (no Supabase integration yet)
- No routing beyond homepage (links exist but pages don't)
- No auth flow implemented
- No tactic submission flow
- Canvas animation for hero match sim is working

## What's Next (not started)

- Supabase integration (real tactics data, reviews, managers)
- Auth flow (login/signup with Supabase Auth)
- Individual tactic detail pages
- Tactic submission form
- Manager profile pages
- Search functionality
- Real filtering/sorting with database queries
