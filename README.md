# The Backroom

**Goodreads for Football Manager** — Community-rated tactics discovered, reviewed, and curated by the managers who actually use them.

🌐 [thebackroom.fm](https://thebackroom.fm)

## Tech Stack

- **Frontend:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS (custom dark warm theme)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your credentials
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Production site URL |
| `NEXT_PUBLIC_ADS_ENABLED` | Enable/disable ad slots |

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with fonts & metadata
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles & Tailwind
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── Analytics.tsx
│   └── home/
│       └── HeroSection.tsx
└── lib/
    └── supabase/        # Supabase client configuration
```

## Design System

- **Colors:** Warm charcoal background (#100E0C), copper accents (#C4875A)
- **Fonts:** Fraunces (serif headings), Outfit (body), JetBrains Mono (data)
- **Texture:** Grain overlay via SVG feTurbulence

---

Built with ☕ in Buenos Aires.
