# Technical Specification (TECH_SPEC)

## Project: DPY Marine Engineering Corporate Web Platform
- **Version:** 1.0.0
- **Build Tool:** Vite 6.x
- **Runtime Target:** Modern Web Browsers (ES2022+)
- **Hosting / CI/CD:** Cloudflare Pages (via GitHub Repository: `devvratyadav93/DPY_Engg.`)

---

## 1. Architecture Overview

The application is structured as a multi-page static application (MPA) built with Vite 6.x, utilizing clean directory routes (`/services/`, `/about/`, `/contact/`, `/login/`, `/register/`, `/portal/`) for direct static hosting on Cloudflare Pages.

```
DPY Engg/
├── vite.config.js              # Multi-page Rollup input configuration
├── schema.sql                  # Cloudflare D1 SQLite database schema (users, inquiries, manpower)
├── package.json
├── PRD.md
├── TECH_SPEC.md
├── index.html                  # 1. Home Page
├── services/
│   └── index.html              # 2. Services Page
├── about/
│   └── index.html              # 3. About Page
├── contact/
│   └── index.html              # 4. Contact Page
├── login/
│   └── index.html              # 5. Client Login Page
├── register/
│   └── index.html              # 6. Client Register Page
├── portal/
│   └── index.html              # 7. Client Dashboard / Portal
├── public/
│   ├── favicon.svg
│   ├── dpy-header-logo-trans.png # Exact official letterhead logo
│   └── _headers
└── src/
    ├── styles/                 # Modular CSS (variables, base, auth, navigation, etc.)
    └── scripts/
        ├── auth.js             # Session state, login/register/logout handlers
        ├── main.js             # App entry, services rendering, mobile drawer
        ├── services-data.js    # 10 core disciplines data
        ├── quote-estimator.js  # Live estimator logic
        └── rfq-modal.js        # Quotation modal dialog logic
```

---

## Changelog
### 2026-09-13 — Single-Screen Viewport Calibration (Zero-Scroll 100vh)
- Modified: `src/styles/auth.css`, `login/index.html`, and `register/index.html`.
- Before: Full-page layout used expansive margins (`margin-bottom: 2rem`) and multi-card showcase lists, pushing total document height beyond 900px and requiring vertical scrolling.
- After: Desktop container enforces `height: 100vh; max-height: 100vh; overflow: hidden;`. Form fields and headers use viewport-proportional clamps (`clamp(0.5rem, 1.1vh, 0.85rem)`). Replaced large card pillars with `.auth-quick-checks` vector check list. Streamlined registration to 3 essential 2-column rows (User ID, Full Name, Shipyard, Email, Phone, Password).
- Reason: User requested single-screen fit without scrolling.

### 2026-09-13 — Full-Page Split Authentication Architecture
- Modified: `src/styles/components.css`, `src/styles/auth.css`, `login/index.html`, and `register/index.html`.
- Before: Login and Register pages rendered a small centered floating card (`.auth-card`) constrained to 480px-580px with missing global form styles, causing inputs to fall back to unstyled browser defaults and cramped layout.
- After: Implemented `.auth-split-page` full-height (100vh) split layout. Left panel (`.auth-showcase`) hosts high-contrast maritime branding, trust pillars, class certifications, and executive quotes. Right panel (`.auth-form-column`) hosts spacious, responsive form containers (`.auth-form-container`). Added global form controls system (`.form-group`, `.form-label`, `.form-input`, `.form-grid-2`, `.password-input-wrap`, `.input-addon-group`, `.auth-submit-btn`) to `src/styles/components.css` and `src/styles/auth.css`.
- Reason: User rejected the console-like floating box and requested full-page professional layouts.

### 2026-09-13 — Authentication Architecture Upgrade (User ID, Avatar Dropdown, Enterprise Registration)
- Modified: `src/scripts/auth.js`, `schema.sql`, `register/index.html`, `login/index.html`, `src/styles/navigation.css`, `src/styles/auth.css`, and navbar action containers across all 5 main pages (`index.html`, `services/index.html`, `about/index.html`, `contact/index.html`, `portal/index.html`).
- Before: Header displayed static "Client Login" and "Request Quote" buttons regardless of authentication status. Login only matched email. Registration form was basic.
- After: Header dynamically toggles between `.nav-auth-buttons` (`Login` & `Register`) when unauthenticated, and `.user-avatar-dropdown` (avatar circle with uppercase 2-letter initials, online indicator dot, user/org metadata, and dropdown menu) when authenticated. Login accepts either `userId` (case-insensitive) or `email`. Registration page provides full enterprise input fields with User ID validation and password show/hide toggles. `users` table schema updated with `user_id TEXT UNIQUE`.
- Reason: User requested `Login` and `Register` buttons instead of `Client Login` & `Request Quote`, User ID login support, a professional registration page, and displaying the user's Avatar upon login.

### 2026-09-13 — Home Page Leadership Spotlight Teaser Removed
- Modified: Removed the redundant `ABOUT LEADERSHIP TEASER` component from `index.html`.
- Before: Home page contained a teaser card linking to the CEO profile.
- After: Home page ends cleanly after the Commercial Engagement Models section, keeping all in-depth leadership and executive biography content consolidated within `/about/`.
- Reason: User requested removing this duplicate component.

### 2026-09-13 — Replacement of Estimator with 3-Tier Commercial Engagement Matrix
- Modified: Removed `interactive-estimator` section and decoupled `quote-estimator.js` / `estimator.css` from `index.html`. Added 3 high-resolution engagement photography assets (`public/images/engagement/subcontract-model.jpg`, `labour-model.jpg`, `rate-contract-model.jpg`). Enhanced `.contract-card` component with 16:9 photography cover headers, glassmorphic badges, hover elevation, and direct modal RFQ triggers on both `index.html` and `services/index.html`.
- Before: `index.html` hosted an interactive number counter estimator widget.
- After: `index.html` and `services/index.html` feature a cohesive 3-Tier Commercial Engagement Matrix with authentic shipyard photography and 1-click RFQ scopes.
- Reason: User requested removing the estimator and implementing Option 4 with relevant photos.

### 2026-09-13 — Services Page Authentic Photography & Schema Expansion
- Modified: Enhanced `ServiceDiscipline` interface with `image`, `imageAlt`, and `categoryLabel`. Added 10 high-resolution marine engineering photography assets in `public/images/services/`. Updated `.service-card` CSS with 16:9 aspect-ratio cover container, glassmorphic badges, and hover zoom.
- Before: Service cards rendered only SVG vector icons and textual metadata without photographic context.
- After: Service cards render edge-to-edge 16:9 authentic maritime photography, dark gradient depth overlay, glassmorphic category badges, numeric indicator, and smooth 1.07x hover zoom.
- Reason: User requested adding relevant photos for each service on the Services Page.

### 2026-09-13 — CEO Executive Portrait Asset Integration
- Modified: Added optimized WebP/PNG executive portrait asset `public/images/ceo-dwarika-prasad-yadav.webp`; integrated in About and Home templates.
- Reason: User provided CEO photo reference.

### 2026-09-13 — Multi-Page Architecture & Client Authentication
- Modified: Configured Vite MPA build (`vite.config.js`) for 7 dedicated pages; added `users` authentication table to `schema.sql`; implemented client session manager `src/scripts/auth.js`.
- Before: Single-page application with hash-based section scroll.
- After: Multi-page static architecture with dedicated routes and client portal.
- Reason: User requested separate pages for Home, Services, About, Contact, plus Login/Register.

### 2026-09-13 — Switched to Light Mode & Added Cloudflare D1 Schema

| Token | Hex / HSL | Usage |
|-------|-----------|-------|
| `--bg-primary` | `#ffffff` | Clean white document background |
| `--bg-secondary` | `#f8fafc` | Soft light slate background |
| `--navy-dark` | `#091e36` | Headings, title typography, footer |
| `--navy-primary` | `#0f294a` | Subheadings, bold labels |
| `--primary` | `#0284c7` | Primary ocean blue action color |
| `--primary-light` | `#0ea5e9` | Hover states and interactive accents |
| `--text-main` | `#1e293b` | Body text high contrast |
| `--text-muted` | `#475569` | Secondary descriptions and captions |
| `--border-subtle` | `#e2e8f0` | Card borders and dividers |
| `--font-primary` | `'Plus Jakarta Sans', sans-serif` | Modern, authoritative technical typography |

---

## 3. Data Contracts & Database Architecture (Cloudflare D1)

### 3.1 Database Engine: SQLite Dialect
Cloudflare D1 is built on SQLite. Local development runs on SQLite (or Wrangler local D1 simulation), guaranteeing zero dialect drift when deploying to production Cloudflare D1.

Schema file defined in `schema.sql`:
- `rfq_inquiries`: Captures proposal requests, contact credentials, and status workflow.
- `manpower_requests`: Captures specific trade counts (Welders, Fitters, Fabricators, Supervisors).
- `vendor_registrations`: Handles shipyard vendor panel onboarding.

---

### 3.2 Service Discipline Schema
```typescript
interface ServiceDiscipline {
  id: string;
  category: 'shipbuilding' | 'piping' | 'repair' | 'manpower';
  categoryLabel: string;
  number: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  description: string;
  deliverables: string[];
  standards: string;
  icon: string;
}
```

### 3.2 RFQ & Manpower Estimate State
```typescript
interface RFQPayload {
  projectType: string;
  engagementModel: 'subcontract' | 'labour' | 'rate-contract';
  tradesRequested: {
    welders: number;
    fitters: number;
    fabricators: number;
    supervisors: number;
  };
  durationMonths: number;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  notes?: string;
}
```

---

## 4. Security & Compliance Protocols
- **Sanitization:** All form inputs are sanitized prior to DOM insertion or payload formatting.
- **Zero Insecure Injection:** Strict prohibition of `innerHTML` with unsanitized user content.
- **Headers & CSP:** Compatible with Cloudflare Pages `_headers` configuration (CSP, X-Frame-Options: DENY, HSTS).
- **Environment Isolation:** No secrets exposed in client bundles.

---

## 5. Cloudflare Pages CI/CD Specification
- **Git Provider:** GitHub (`https://github.com/devvratyadav93/DPY_Engg.`)
- **Build System:** Cloudflare Pages standard Node.js builder
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `/`

---

## Changelog
### 2026-09-19 — Mobile Viewport Optimization & Component Hardening
- Modified: `src/scripts/navigation.js` (created), `src/scripts/auth.js`, `src/scripts/main.js`, `about/index.html`, `portal/index.html`, `src/styles/auth.css`, `src/styles/components.css`, `src/styles/navigation.css`, and `src/styles/services.css`.
- Before: Mobile navigation failed to open on `/about/` and was missing on `/portal/`; registration form fields were squished into 2 columns on 375px screens; modal dialog scrollbar clipped rounded corners; and subpage scroll events stripped active nav highlights.
- After: Implemented global `navigation.js` handling mobile drawers across all pages; added `#mobile-toggle` and `#mobile-drawer` to `/portal/`; forced `.form-row, .form-grid-2` to single-column on mobile (< 640px); streamlined mobile login/register showcase header; added mobile swipeable pills to `.services-filter-bar`; and refined modal overlay and scrollbar gutter.
- Reason: User reported that pages and components were not opening or rendering effectively in mobile view.

### 2026-09-19 — Cloudflare Deployment Fix & Wrangler Static Assets Configuration
- Modified: `wrangler.jsonc` (created), `vite.config.js` (added `plugins: []`), `package.json` & `package-lock.json` (added `wrangler` devDependency and `deploy` script).
- Before: Cloudflare deployment running `npx wrangler deploy` halted with error `Cannot modify Vite config: could not find a valid plugins array` due to missing `wrangler.jsonc` and unconfigured `plugins` array in `vite.config.js`.
- After: Added explicit `wrangler.jsonc` declaring `./dist` static assets directory with SPA fallback, added `plugins: []` in `vite.config.js`, and installed `wrangler` locally.
- Reason: User's Cloudflare automated deploy command failed when Wrangler attempted interactive configuration in non-interactive CI.

### 2026-09-19 — GitHub Remote Repository Migration to DPY_Engg.
- Modified: Git origin remote configuration, `TECH_SPEC.md`, `PRD.md`.
- Before: Remote pointed to deleted repository `https://github.com/devvratyadav93/DYP_Engg..git`.
- After: Remote switched to new repository `https://github.com/devvratyadav93/DPY_Engg..git` with complete history and code synchronization.
- Reason: User deleted legacy repository and established the new repository reflecting the correct acronym `DPY_Engg.`.

### 2026-09-13 — GitHub Actions Automated CI/CD Pipeline & Remote Sync
- Modified: `.github/workflows/ci.yml` (new), `.gitignore` (added `scratch/`, `.env*`), and synchronized remote repository `https://github.com/devvratyadav93/DYP_Engg..git`.
- Before: Local-only builds requiring manual error discovery.
- After: Automated GitHub Actions CI workflow executing Node 20 environment setup, dependency installation (`npm ci`), production build (`npm run build`), and artifact integrity checks across all 7 pages on every push and PR.
- Reason: User requested automated CI/CD execution to eliminate manual error fixing for production issues.

### 2026-09-13 — Auth Pages Typography Scale & Spacious Spacing Recalibration
- Modified: `src/styles/auth.css` (`.auth-split-page`, `.auth-form-column`, `.auth-form-wrapper`, `.auth-form-wrapper--login`, `.auth-form-wrapper--register`, `.form-group`, `.form-label`, `.form-input`, `.form-grid-2`, `.auth-options-row`, `.custom-checkbox-label`), `login/index.html`, and `register/index.html`.
- Before: Forms stretched across `580px` max-width with large font clamps (1.8rem-1.9rem titles) and cramped 8px vertical margins, creating a "zoomed in and components too close" appearance.
- After: Constrained login wrapper to `430px` and register wrapper to `530px`, scaled titles down to crisp `1.45rem`, relaxed vertical spacing to `margin-bottom: 1.15rem` and `gap: 0.45rem`, and expanded grid gap to `1.15rem`.
- Reason: User requested removing the zoomed-in look and making components spacious while maintaining zero vertical scrolling on 100vh desktop viewports.

### 2026-09-13 — Hero CTA Labels Streamlined
- Modified: `index.html` hero actions markup.
- Before: Primary button labelled "Request Work Package Quote", secondary button labelled "Explore 10 Services".
- After: Primary button renamed to "Request Quote", secondary button renamed to "Explore Services".
- Reason: User requested punchier CTA labels matching the header navigation action.

### 2026-09-13 — Hero Background GIF Finalized: Option #1 (A-ROSA Sailing Bow)
- Modified: `index.html` (set background image permanently to `/images/home-hero-bg-1.gif` with descriptive alt attribute `alt="Marine Vessel Navigating Open Waters - DPY Engineering"`), retained gradient overlay (`.hero-overlay`) with 90-degree transition for WCAG AAA dark navy text contrast.
- Before: Testing options sequentially (Option #1 -> Option #2 -> Option #3).
- After: Option #1 finalized and active. Alternate candidate files retained in `public/images/` as staged assets.
- Reason: User completed review of all three downloaded candidates and selected Option #1.

### 2026-09-13 — Hero Background GIF Evaluation: Option #1 (A-ROSA Sailing Bow)
- Modified: `index.html` (updated background image to `/images/home-hero-bg-1.gif`), centered object position in `src/styles/hero.css`, and mapped all 3 candidate GIFs from `Supporting Docs/Home GIF/` into `public/images/`.
- Before: Generated synthetic Goa Shipyard animated GIF.
- After: Active hero background set to user-selected candidate GIF #1 (`GIF by A-ROSA Kreuzfahrten.gif` → `home-hero-bg-1.gif`), with options #2 (`home-hero-bg-2.gif`) and #3 (`home-hero-bg-3.gif`) staged for immediate switching.
- Reason: User workflow to evaluate candidate downloaded GIFs one-by-one.

### 2026-09-13 — Hero Animated Shipyard GIF Background & Component Streamlining
- Modified: `index.html` (removed `.hero-badge` and `.hero-card`), `src/styles/hero.css` (`.hero-bg-media`, `.hero-gif-bg`, `.hero-overlay`, `.hero-content`), and generated `public/images/shipyard-hero-bg.gif`.
- Before: Two-column grid with a highlighted badge and right-side capability matrix card, over a simple linear gradient.
- After: Seamless looping animated background GIF depicting Goa Shipyard Ltd. drydocks, naval hulls, and animated water ripples (`/images/shipyard-hero-bg.gif`), accompanied by a protective 90-degree gradient overlay for optimal readability.
- Reason: User requested removal of the highlighted badge and capability card, and integration of an animated GIF background in the top section of the Home page.

### 2026-09-13 — Wide Layout Expansion & Mobile Responsive Architecture
- Modified: `variables.css` (`--max-width: 1560px;`, `--max-width-wide: 1720px;`, `--container-padding: clamp(1.25rem, 3.5vw, 3.5rem);`), `base.css` (`.container`, `.container-wide`, `.container-fluid`), `navigation.css`, `components.css`, `hero.css`, `contact.css`, `estimator.css`, `auth.css`, and page templates.
- Before: Constrained `1280px` max-width and `860px` inline page headers causing excessive empty whitespace gutters on 1080p and ultrawide monitors.
- After: Full-screen responsive architecture filling 85%+ viewport width on desktop, dynamic fluid typography, and mobile-first touch optimization (stacking grids, 44px tap targets, 88vw mobile drawer).
- Reason: User requested efficient horizontal space utilization on desktop displays and verified mobile excellence.

### 2026-09-13 — Brand Identity Hardcoded Typography & Vector Emblem
- Modified: Header navigation and footer brand markup across all 7 pages and `navigation.css`.
- Before: Integrated full raster image (`dpy-header-logo-trans.png`) which rendered sub-text illegible at scaled navbar dimensions.
- After: Paired standalone transparent DPY vessel emblem (`public/dpy-mark-trans.png`) with hardcoded HTML typography (`.brand-company-title`, `.brand-company-services`, `.brand-company-tagline`) styled with responsive font-scaling and breakpoint control.
- Reason: Eliminates raster scaling blur, providing 100% vector-crisp typography for "MARINE ENGINEERING", "SHIPBUILDING • OUTFITTING • PIPING • FABRICATION", and "Building Tomorrow's Vessels with Trust & Excellence".

### 2026-09-13 — Initial TECH_SPEC Created
- Modified: Complete technical specification for the Vite static architecture.
- Before: Blank project repository.
- After: Defined architecture, design tokens, data models, and Cloudflare Pages CI/CD configuration.
- Reason: Baseline technical contract prior to code implementation.
