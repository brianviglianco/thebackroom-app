# CLAUDE.md - The Backroom

## Project Overview

The Backroom is a "Goodreads for Football Manager" — a community platform where FM players discover, rate, review, and curate tactics. V1.0 focuses exclusively on tactics, with architecture designed for future content types (saves, wonderkids, shortlists) without rebuild.

**Live site:** https://thebackroom.fm
**Domain:** thebackroom.fm (.fm = Football Manager easter egg)
**Tagline:** Tactics. Rated. Reviewed.

## Who is Brian (the user)

Brian Viglianco is the solo founder/operator. He is **NON-TECHNICAL** — he cannot write or debug code. He can follow step-by-step instructions, make design/product decisions, write content, and run terminal commands if given exact copy-paste instructions.

**Critical rules when working with Brian:**
- **Always provide complete files.** Never say "add this to your existing file" — provide the entire updated file.
- **Use numbered steps** for any action Brian needs to take.
- **Never leave placeholders** in code — everything must be copy-paste ready.
- **Flag when something needs a decision** rather than assuming.
- **After each feature, tell Brian exactly how to verify it works.**
- **English for code and docs. Spanish (Rioplatense) for casual conversation** if Brian switches.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **Backend/DB:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (`@supabase/ssr`) — Google + Discord OAuth
- **File Storage:** Supabase Storage (for .fmf tactic files)
- **Hosting:** Vercel (auto-deploys from main branch)
- **CDN/DNS:** Cloudflare
- **Analytics:** Google Analytics 4

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
│   ├── FilterCard.tsx     # Multi-criteria tactic search/filter (4-col -> stacked)
│   ├── ResultsGrid.tsx    # Grid of tactic cards with sorting (4->2->1 col)
│   ├── TacticCard.tsx     # 3-face flip card (formation/stats/quote)
│   ├── ReviewsCarousel.tsx # Auto-rotating review cards with slide animation (10s interval)
│   ├── TheDugout.tsx      # Top Creators leaderboard (podium + data table, sortable)
│   ├── SubmitCTA.tsx      # Submit tactic call-to-action card (currently unused in page)
│   ├── StaffPicks.tsx     # Curated editor selections with featured pick
│   ├── Community.tsx      # (Legacy) Manager leaderboard + tactic reviews
│   ├── Newsletter.tsx     # (Legacy) Email signup
│   ├── NewsletterCompact.tsx # (Legacy) Compact newsletter variant
│   ├── Footer.tsx         # Footer with nav columns + social links
│   └── index.ts           # Barrel exports
└── lib/
    └── supabase/
        ├── client.ts      # Browser Supabase client
        ├── server.ts      # Server-side Supabase client
        └── index.ts       # Barrel exports
```

**Full docs are in `docs/` folder** — BRAND.md, ARCHITECTURE.md, MVP-SPEC.md, DATA-MODEL.md, ROADMAP.md, SETUP-GUIDE.md, GROWTH-STRATEGY.md, project-instructions.md. Reference these when building features, but **CLAUDE.md is the source of truth** for current state. Some docs have outdated color values and copy — when in conflict, trust CLAUDE.md and the actual code in globals.css.

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

1. **Navigation** — Fixed sticky navbar. Logo + search + links (Tactics, Ranking, Creators, About) + Submit/Login/Signup. Hamburger menu on mobile with dropdown.
2. **Hero** — "Find the right tactic for your save." Subtitle: "Football Manager tactics backed by real saves, real data, and real results. No hype, just evidence." Canvas match simulation on right (hidden on mobile). Shows tactic name (e.g. "COUNTER-ATTACK") bottom-right in copper mono. 5 scripted tactical sequences cycle automatically.
3. **FilterCard** (Explore tactics) — Header "Explore tactics" (no subtitle). 4-column filter: Formation picker, Playing Style chips, Team Level chips, FM Version + Rating + Win Rate. Quick search pills at bottom.
4. **ResultsGrid** — Collapsed CTA by default ("Don't know where to start?"), expands to 4-col tactic card grid (2 on tablet, 1 on mobile). Sort by rating/win rate/downloads/newest. Contains inline submit tactic CTA when expanded.
5. **ReviewsCarousel** (What managers are saying) — Eyebrow "💬 From the Touchline". Auto-rotating review cards (10s interval) with horizontal slide animation. 2 cards on desktop, 1 on mobile. Dot navigation, pause on hover. Uses `useRef` pattern for stable `setInterval`.
6. **TheDugout** (Top Creators) — Eyebrow "🏟️ From the Dugout". Sortable creator leaderboard (Rating/Downloads/Tactics). Top 3 as large cards (#1, #2, #3 left to right, equal size) with rank numbers, verified pills, specialty chips, primary metric, proof lines, trending indicators. Ranks 4+ as data table with alternating rows, hover highlight. Subtitle: "Discover the most trusted tactic makers—ranked by real community results."
7. **Footer** — Brand + social links, Browse/Community/About nav columns.

## Conventions

- Client components use `'use client'` directive
- Components export via barrel file (`components/index.ts`)
- Tailwind for styling; CSS variables for theme tokens (`--copper`, `--cream-muted`, etc.)
- Custom utility classes in `globals.css` (`.chip`, `.tag`, `.wr-badge`, `.star-filled`, `.sec-eyebrow`)
- `useCallback` for animation callbacks to prevent re-render loops
- Canvas API for HeroCanvas: both attackers and defenders use Catmull-Rom spline paths (8 waypoints each). No AI/dynamic positioning — all movement is choreographed per sequence for predictability.
- Responsive: mobile-first approach with `md:` and `lg:` Tailwind prefixes
- All sections use responsive padding: `px-4 md:px-8 lg:px-12`
- Some inline styles use hardcoded `rgba(26,23,20,...)` for overlays (can't be themed via CSS vars)

## Copy Decisions (already implemented)

- Hero title: "Find the *right* tactic for *your save*" (right/your save in copper italic)
- Hero subtitle: "Football Manager tactics backed by real saves, real data, and real results. No hype, just evidence."
- Search placeholder: "Search anything..." (not just tactics -- future-proofed)
- Reviews section: eyebrow "💬 From the Touchline", title "What managers are saying"
- Creators section: eyebrow "🏟️ From the Dugout", title "Top Creators"
- Browser tab: "The Backroom - Football Manager tactics, rated and reviewed by the community."
- Favicon: SVG pitch icon at `/public/icon.svg`
- Capitalization: lowercase everywhere, only capitalize when grammatically correct (no Title Case)

## Brand Voice

- **Knowledgeable but not elitist.** We know our stuff, but we don't gatekeep.
- **Direct and useful.** No fluff, no corporate speak, no "Welcome to our platform!"
- **Community-first.** The users and creators are the stars, not the platform.
- **Subtly witty.** FM humor is dry and specific.
- Never say: "Welcome!", "ultimate platform", "powered by AI", "thousands of managers"
- Good: "Rated 4.3 by 89 managers who actually used it."
- Microcopy examples: Empty state: "Be the first to test this one." | Zero results: "Nothing matches those filters. Try loosening up the formation." | Successful review: "Your report is in. The backroom thanks you."

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
- ReviewsCarousel uses `useRef` + functional state updater for stable `setInterval` (avoids stale closure bug)
- ReviewsCarousel slide animation: 3-state machine (`idle` → `sliding-out` → `sliding-in` → `idle`) with `translateX` + `opacity`
- TheDugout uses `useMemo` for sorted creator array, `useState` for sort key
- TheDugout has two tiers: PodiumCard (top 3) + CreatorTableRow (rank 4+)

---

## Roadmap & Build Status

### Phase 1: Project Setup & Brand -- DONE
- [x] Next.js project initialized with Tailwind + brand tokens
- [x] Domain registered (thebackroom.fm)
- [x] Deployed to Vercel
- [x] Google Fonts configured (Fraunces, Outfit, JetBrains Mono)
- [x] Favicon + OG metadata

### Phase 2: Core Pages -- IN PROGRESS
- [x] Homepage: all sections built, polished, responsive
- [x] Canvas hero animation working
- [x] 3-face tactic card rotation
- [ ] **Tactic Detail Page** (/tactic/[slug]) — THE priority, most important page
- [ ] Explore Page (/explore) — full filter + results with URL-based filters
- [ ] Tactic Submission form (/submit)
- [ ] Supabase database tables created (see Data Model below)
- [ ] Connect homepage to real data from Supabase

### Phase 3: Community Features -- NOT STARTED
- [ ] Review system (3-axis star ratings + structured data)
- [ ] User profiles (/user/[username]) with shelves (Tried/Want to Try/Favorites)
- [ ] Discussion threads on tactic pages (max 2-level threading)
- [ ] Manager/Ranking page (/ranking)

### Phase 4: Admin & Operations -- NOT STARTED
- [ ] Admin panel (Brian's account only)
- [ ] Tactic approval queue
- [ ] Staff Picks management
- [ ] Flagged content queue

### Phase 5: Polish & Launch Prep -- NOT STARTED
- [ ] SEO: sitemap, robots.txt, schema markup, Search Console
- [ ] Performance: Lighthouse > 90
- [ ] Content seeding: catalog 30-50 popular FM26 tactics
- [ ] Static pages: About, FAQ, Contact

### Phase 6: Launch -- NOT STARTED
- [ ] Reddit r/footballmanagergames, FM Discord servers, creator outreach

---

## Data Model (key tables — full spec in docs/DATA-MODEL.md)

### resources (the core content table)
Tactics are stored as `type: "tactic"`. Architecture supports future types (saves, wonderkids, shortlists).

Key columns: `slug`, `title`, `description`, `creator_id`, `fm_version`, `status` (pending/approved/rejected), `source_type` (hosted/external), `file_url` or `external_url`, `metadata` (JSONB with formation, positions, playing_styles, team_levels, complexity), `rating_composite`, `rating_results`, `rating_experience`, `rating_ease`, `win_rate`, `download_count`, `review_count`, `is_featured`, `is_trending`.

### profiles (extends Supabase auth.users)
Key columns: `username`, `display_name`, `avatar_url`, `bio`, `role` (user/creator/admin), `is_verified_creator`, `badges` (JSONB), `stats` (JSONB: tactics_tried, reviews_written, etc.), `external_links` (JSONB).

### reviews
3-axis rating system. Key columns: `resource_id`, `user_id`, `rating_results` (1-5), `rating_experience` (1-5), `rating_ease` (1-5), `body`, `team_used`, `league`, `matches_played`, `wins`, `draws`, `losses`, `helpful_count`.

**Composite score formula:** `(results x 0.40) + (experience x 0.30) + (ease x 0.20) + (arena_bonus x 0.10)`

### Other tables
- `helpful_votes` — one per user per review
- `comments` — threaded discussion on tactic pages (max 2 levels)
- `shelves` — user shelves: tried / want_to_try / favorite
- `activity_log` — user action feed

---

## Tactic Detail Page Spec (THE most important page)

Full spec in docs/ARCHITECTURE.md. Key sections:
1. **Header:** Title + formation badge + creator + FM version + tags + composite rating
2. **Download:** If hosted: .fmf download button. If external: link to original source.
3. **Creator's Pinned Note:** Highlighted card with copper left border
4. **Rating Breakdown:** Composite + 3 axes (Results/Experience/Ease) + star distribution
5. **Reviews:** Sorted by helpful votes. Each has: avatar, 3 star ratings, structured data (team/league/W-D-L), free text, helpful vote
6. **Discussion Thread:** Below reviews, max 2-level threading
7. **Sidebar:** Shelf buttons, similar tactics, creator's other tactics, ad slot (desktop)

**Content model:** Tactics can be "hosted" (.fmf on Supabase Storage) or "cataloged" (external download URL — for cold-start curation). Both use same page layout.

---

## SEO Requirements

- Server-side rendering (Next.js SSR) for all public pages
- Schema.org markup: Review, AggregateRating, Product
- Auto-generated sitemap + robots.txt
- Meta tags + OpenGraph images per page
- Target keywords: "best FM26 tactic [formation]", "FM26 counter attack tactic", "[tactic name] review"

**Page title patterns:**
- Home: "The Backroom -- FM Tactics Rated by the Community"
- Explore: "Browse FM26 Tactics -- Filter by Formation, Style, Level | The Backroom"
- Tactic: "[Name] by [Creator] -- FM26 [Formation] Tactic | The Backroom"
- Profile: "[Username] | The Backroom"

---

## Important Constraints

- **Tactics only for V1.** No facepacks, logopacks, kits, skins -- ever (legal risk).
- **Ethical content sourcing:** Never host .fmf files without creator permission. Catalog model OK (link to original).
- **Resource-generic architecture:** All DB and component design must support future content types without rebuild.
- **"Managers" not "coaches"** -- matches FM terminology.
- **No forums.** Discussion is contextual (per-tactic threads only).
- **One-person operation.** No features requiring a moderation team.
- **Desktop-first design, responsive down.** FM is a PC game, but mobile must work.
- **Design must not feel AI-generated.** Use brand fonts, copper palette, grain texture, warm tones.

---

## What's Built (as of Feb 2026)

- Full homepage with 7 sections, polished design, fully responsive/mobile-ready
- Dark theme only (warm charcoal + copper)
- All data is hardcoded/mock (no Supabase integration yet)
- No routing beyond homepage (links exist but pages don't)
- No auth flow implemented
- No tactic submission flow
- Canvas hero animation: 5 tactical sequences (Counter-Attack, Tiki-Taka, Wing Overload, Gegenpressing, Route One) with scripted attacker AND defender spline paths, ball physics with arc, trails, goal flash. Only tactic name shown as overlay (no play-by-play, no "LIVE" label).
- Reviews carousel with auto-rotation (10s) and horizontal slide animation
- Top Creators leaderboard with sortable podium (top 3 cards) + data table (rank 4+), verified badges, specialty chips, trending indicators, proof lines
- SubmitCTA component exists but is not currently rendered on the page (removed from layout, kept for future use)
- Newsletter components exist but are not currently rendered (deferred for later)
- `docs/` folder has complete specs for every feature

## What's Next (immediate priorities)

1. **Supabase database setup** — create tables per docs/DATA-MODEL.md
2. **Tactic Detail Page** (/tactic/[slug]) — the core page of the entire site
3. **Auth flow** (login/signup with Google + Discord OAuth)
4. **Explore Page** with real filtering + URL-based filters
5. **Tactic Submission form** (/submit)
6. **Connect homepage to real Supabase data**
