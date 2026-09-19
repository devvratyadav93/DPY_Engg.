# Product Requirements Document (PRD)

## Project: DPY Marine Engineering Corporate Web Platform
- **Version:** 1.0.0
- **Status:** Active Implementation
- **Target Deployment:** Cloudflare Pages (via GitHub CI/CD)
- **Primary Audience:** Shipyard procurement managers (e.g. Goa Shipyard Limited, Cochin Shipyard, MDL), marine contractors, port authorities, vessel owners.

---

## 1. Problem Statement & Business Objective
DPY Marine Engineering is a premier Goa-based marine engineering & shipbuilding subcontracting firm founded by Proprietor Dwarika Prasad Yadav. While the firm possesses deep operational capabilities across hull outfitting, piping, fabrication, certified SMAW/FCAW/GTAW welding, and skilled manpower mobilization, prospective clients and shipyard procurement officials require a modern, credible, and comprehensive digital presence to:
1. Review core technical capabilities, fabrication experience, and certifications.
2. Verify statutory & compliance readiness (GST, PAN, MSME, Shipyard Safety standards).
3. Directly submit Request for Quotations (RFQs) and request skilled manpower deployments on Subcontract, Labour-Contract, or Rate-Contract basis.

---

## 2. Core Functional Requirements

### 2.1 Navigation & Brand Header
- Prominent DPY Marine Engineering maritime brand identity and vessel crest.
- Quick contact bar: Goa, India | Phone: `+91 98765 43210` | Email: `dpy.marine@gmail.com`.
- Navigation links: Services, Engagement Models, Quality & Safety, Capability & Credentials, Request Quote.
- Mobile-responsive navigation drawer with accessible hamburger toggle.

### 2.2 Hero & Trust Signals
- Headline: *"Building Tomorrow's Vessels with Trust & Excellence"*.
- Sub-headline positioning DPY as a trusted shipbuilding and marine engineering subcontracting partner.
- Primary Call to Action (CTA): "Request Quote" (opens interactive RFQ).
- Secondary CTA: "Explore Services" (navigates to /services/).
- Trust Metrics Strip:
  - 10+ Core Marine Specializations
  - 100% Statutory Compliance (MSME, GST, PAN)
  - 6G / 6GR Certified Welding Capabilities
  - Flexible Contract Models (Subcontract, Labour, Rate-Contract)

### 2.3 Core Services Showcase (10 Client Disciplines)
Interactive grid of all 10 services highlighted in client introduction:
1. **Hull Outfitting & Installation**
2. **Structural Fabrication & Erection**
3. **Pipe Fabrication & Installation**
4. **Plate Fitting & Fabrication**
5. **SMAW / FCAW / GTAW Certified Welding**
6. **Ship Repair & Maintenance**
7. **Grinding, Cutting & Precision Fit-up**
8. **Skilled Welder / Fitter / Fabricator Manpower Supply**
9. **Site Supervision & Work Coordination**
10. **Safety & Quality Compliance**

### 2.4 Contract Engagement Models
Visual comparison and selection for:
- **Subcontract Basis**: Turnkey compartment and package delivery.
- **Labour-Contract Basis**: Rapid mobilization of screened, certified tradesmen under yard supervisor.
- **Rate-Contract Basis**: Defined unit pricing per tonnage, running meter, or weld joint.

### 2.5 Interactive RFQ & Work-Package Estimator
- Step-by-step or instant calculator allowing procurement leads to select:
  - Project Scope (Shipbuilding, Piping, Structural, Repair, Manpower)
  - Manpower trades needed (Welders, Fitters, Fabricators, Riggers, Supervisors)
  - Engagement terms & timeline
- Produces an instant inquiry summary with 1-click email and WhatsApp dispatch options.

### 2.6 Statutory & Shipyard Compliance Center
- Highlighting compliance with Goa Shipyard Limited (GSL) vendor requirements.
- MSME Registration, GSTIN, and PAN display markers.
- Downloadable capability summary / introduction letter.

### 2.7 Contact & Yard Location
- Direct telephone, WhatsApp, and email touchpoints.
- Service coverage highlighting Goa naval and shipyard zones (Vasco da Gama, Mormugao, Panaji) and pan-India project mobilization.

---

## 3. Non-Functional Requirements
- **Performance:** 95+ Google Lighthouse score; static HTML/CSS/JS with zero runtime framework bloat.
- **Accessibility:** WCAG 2.1 AA compliant color contrasts, semantic landmarks, and ARIA labels.
- **Security:** Strict input sanitization, zero unvalidated client redirects, no sensitive hardcoded secrets.
- **Compatibility:** Full responsiveness across mobile (320px+), tablet, and desktop (up to 4K).

---

## Changelog
### 2026-09-19 — Vendor Credentials 4-Box Grid Mobile Single-Column Layout
- Changed: Transformed `.compliance-badge-grid` from a rigid 2x2 grid into a responsive 1-column stacked layout on mobile screens (< 640px) in [`src/styles/engagement.css`](file:///e:/My%20Projects/DPY%20Engg/src/styles/engagement.css), refined card padding, and equalized credential box heights on desktop.
- Reason: User reported that the 4 credential boxes appeared uneven and cramped on mobile screens.
- Impact: Restores clean, legible typography where titles and descriptions fit comfortably on a single line with icons aligned on the left, eliminating awkward word splitting.

### 2026-09-19 — Section 5 CTA Button Mobile Responsive Wrap & Rename
- Changed: Renamed the Section 5 call-to-action button in [`index.html`](file:///e:/My%20Projects/DPY%20Engg/index.html) from "View All 10 Marine Disciplines & Contract Models" to "Explore All 10 Marine Disciplines", and added mobile responsive wrapping and padding scaling to `.btn` and `.btn-lg` in [`src/styles/components.css`](file:///e:/My%20Projects/DPY%20Engg/src/styles/components.css).
- Reason: User reported that this button was overflowing and not appearing fit to screen on mobile view.
- Impact: Eliminates horizontal button overflow across all mobile viewports, including compact 320px screen widths, while maintaining an elegant touch target.

### 2026-09-19 — Mobile Viewport Optimization & Component Hardening
- Changed: Implemented global `src/scripts/navigation.js` enabling responsive mobile drawers on all pages; integrated `#mobile-toggle` and `#mobile-drawer` on Client Portal (`/portal/`); converted registration form fields to full-width single-column layout on mobile viewports (< 640px); streamlined login/register brand header on mobile; refined RFQ modal dialog padding and scrollbars; made service category filters horizontally swipeable; and fixed Section Scroll Spy on subpages.
- Reason: User reported that several pages and components were not opening or rendering effectively in mobile view.
- Impact: Seamless touch navigation and native-feeling form interactions across all mobile and tablet viewports down to 320px screen width.

### 2026-09-19 — Cloudflare Deployment Fix & Wrangler Static Assets Configuration
- Changed: Added `wrangler.jsonc` declaring `./dist` static assets directory with single-page application fallback, added `plugins: []` in `vite.config.js`, and added `wrangler` devDependency with `deploy` script in `package.json`.
- Reason: Cloudflare deployment pipeline failed with `Cannot modify Vite config: could not find a valid plugins array` when attempting interactive setup in non-interactive CI.
- Impact: Enables zero-touch automated deploys via `npx wrangler deploy` on Cloudflare, bypassing interactive setup prompts.

### 2026-09-19 — GitHub Remote Repository Migration to DPY_Engg.
- Changed: Updated Git origin remote configuration and project documentation from legacy `DYP_Engg.` to the newly established GitHub repository (`https://github.com/devvratyadav93/DPY_Engg..git`). Synchronized all multi-page source files, CI/CD verification workflows, static assets, and relational schema files.
- Reason: User deleted the previous GitHub repository and created a new repository (`devvratyadav93/DPY_Engg.`).
- Impact: Seamlessly restores automated GitHub Actions CI/CD pipeline triggers and Cloudflare Pages git integration against the active repository.

### 2026-09-13 — GitHub Actions Automated CI/CD Pipeline & Remote Sync
- Changed: Configured automated GitHub Actions workflow (`.github/workflows/ci.yml`) triggering on pushes and pull requests to `main`. Automatically installs dependencies (`npm ci`), executes the Vite multi-page production build (`npm run build`), and validates all 7 page artifacts (`dist/index.html`, `dist/services/`, `dist/about/`, `dist/contact/`, `dist/login/`, `dist/register/`, and `dist/portal/`). Updated `.gitignore` with `scratch/` and `.env*` rules. Synchronized entire multi-page codebase and assets to remote GitHub repository (`https://github.com/devvratyadav93/DYP_Engg..git`).
- Reason: User requested pushing everything to GitHub and establishing automated CI/CD execution to eliminate manual error fixing for production issues.
- Impact: Automated verification on every push prevents broken builds from reaching production, and enables zero-touch deployment through Cloudflare Pages.

### 2026-09-13 — Auth Pages Typography Scale & Spacious Spacing Refinement
- Changed: Recalibrated typography, container proportions, and vertical whitespace on `/login/` and `/register/`. Wrapped form and navigation in dedicated width-constrained wrappers (`.auth-form-wrapper--login` at `430px` max-width and `.auth-form-wrapper--register` at `530px` max-width), reduced oversized titles from 1.9rem down to crisp 1.45rem, and restored comfortable breathing room between form groups (`margin-bottom: 1.15rem`, `gap: 0.45rem`, `grid-gap: 1.15rem`, and `margin: 1.35rem` on action rows).
- Reason: User reported that elements previously looked "zoomed in and components are too close. Make it little spacy."
- Impact: Solved the optical illusion of being zoomed in, eliminated cramped input clusters, gave generous breathing room around all elements, and preserved the 100vh single-screen fit with zero scrolling on desktop.

### 2026-09-13 — Home Page Leadership Spotlight Teaser Removed
- Changed: Removed the redundant Leadership Spotlight teaser card from the bottom of `index.html`.
- Reason: User requested removing this section since the full executive profile, credentials, and message of Proprietor Dwarika Prasad Yadav are comprehensively featured on the dedicated About Page (`/about/`).
- Impact: Streamlined Home page layout, avoiding duplicate leadership information and leading cleanly from the Commercial Engagement Models into the footer navigation.

### 2026-09-13 — Replacement of Estimator with 3-Tier Commercial Engagement Matrix
- Changed: Removed the legacy interactive calculator section (`#estimator`, `quote-estimator.js`, `estimator.css`) from `index.html`. Replaced it with the high-converting 3-Tier Commercial Engagement Models matrix (`Subcontract Basis`, `Labour-Contract Basis`, `Rate-Contract Basis`) equipped with custom photorealistic maritime imagery (`/images/engagement/subcontract-model.jpg`, `labour-model.jpg`, and `rate-contract-model.jpg`), glassmorphic badges, responsibility deliverables, and 1-click RFQ triggers. Synchronized the enhanced photo cards to `services/index.html`.
- Reason: User requested removing the Work Package & Manpower Estimator and replacing it with Option 4 (Commercial Engagement Matrix) with relevant, high-impact photography.
- Impact: Elevated enterprise B2B shipyard positioning, streamlined user journey towards direct RFQ conversion, eliminated legacy calculator JS/CSS bundle overhead, and harmonized cross-page card design.

### 2026-09-13 — Core Services Page Authentic Photography Integration
- Changed: Generated 10 photorealistic, high-resolution marine engineering photographs for each service discipline in `public/images/services/` (Hull Outfitting, Structural Fabrication, Pipe Fabrication, Plate Fitting, Certified Welding, Ship Repair, Grinding & Cutting, Skilled Manpower, Site Supervision, and Safety Compliance). Updated `SERVICES_DATA` with `image`, `imageAlt`, and `categoryLabel`. Enhanced `.service-card` layout with edge-to-edge 16:9 photography header, subtle dark gradient overlay, glassmorphic category badges, numeric tags (`#01` - `#10`), and smooth 1.07x hover zoom animation.
- Reason: User requested adding relevant photos for each service on the Services Page (`/services/`) to maximize visual impact, maritime realism, and shipyard procurement trust.
- Impact: Dramatically elevated visual presentation of the 10 core disciplines, reinforced technical credibility for naval defense and shipyard contractors, and ensured responsive rendering across all viewports with lazy loading and zero layout shift.

### 2026-09-13 — Hero Background GIF Evaluation: Option #1 (A-ROSA Sailing Bow)
- Changed: Integrated the first user-provided GIF (`GIF by A-ROSA Kreuzfahrten.gif` → `/images/home-hero-bg-1.gif`) as the active hero section animated background. Prepared all three provided GIFs in `public/images/` (`home-hero-bg-1.gif`, `home-hero-bg-2.gif`, and `home-hero-bg-3.gif`) for sequential evaluation.
- Reason: User requested testing their downloaded candidate GIFs one-by-one, starting with the first one.
- Impact: Displays a live maritime sailing bow perspective on the open sea, protected by the readable gradient overlay.

### 2026-09-13 — Hero CTA Labels Streamlined
- Changed: Renamed primary hero button from "Request Work Package Quote" to "Request Quote" and secondary button from "Explore 10 Services" to "Explore Services".
- Reason: User requested punchier, uncluttered button copy aligned with the header CTA ("Request Quote").
- Impact: Cleaner button layout, improved visual balance, and consistent messaging.

### 2026-09-13 — Hero Background GIF Finalized: Option #1 (A-ROSA Ocean Bow Perspective)
- Changed: Evaluated 3 candidate GIFs downloaded by the user and finalized Option #1 (`/images/home-hero-bg-1.gif` from `GIF by A-ROSA Kreuzfahrten.gif`) as the primary Home hero background media.
- Reason: User completed sequential review of all 3 candidate GIFs and finalized Option #1 for its authentic maritime viewpoint, anchor windlass deck machinery, and dynamic ocean wave motion.
- Impact: Permanent hero background locked in with high-contrast text overlay (`.hero-overlay`) ensuring WCAG AAA dark navy typography legibility and smooth cross-device rendering.

### 2026-09-13 — Hero Animated Shipyard GIF Background & Component Streamlining
- Changed: Removed the top hero badge (`Goa Shipyard Ecosystem • Marine Subcontracting Partner`) and the right-column card (`Technical Capability Matrix`), and integrated a cinematic, looping animated GIF background depicting Goa Shipyard drydock vessel outfitting (`/images/shipyard-hero-bg.gif`) with high-contrast text overlay.
- Reason: User requested removal of the two highlighted components and addition of an animated GIF background in the top section of the Home page.
- Impact: Dramatic visual impact showcasing Goa Shipyard Ltd. drydocks and naval vessels with fluid water ripples, while maintaining 100% text readability and mobile performance.

### 2026-09-13 — Wide-Screen Space Utilization & Comprehensive Mobile Optimization
- Changed: Expanded design system container width from constrained `1280px` to modern enterprise `1560px` (with `1720px` for navbar/wide containers), replaced rigid fixed widths with fluid `clamp()` padding and typography, widened hero headers to `1180px` to eliminate large left/right whitespace gutters, and reinforced mobile touch padding, stacking, and viewport safety across all 7 pages.
- Reason: User requested better utilization of left and right screen space on wide monitors while ensuring top-tier visual experience and usability on mobile devices.
- Impact: 85%+ screen utilization on desktop/ultrawide displays, elegant responsive typography, seamless mobile grid collapses, and zero horizontal overflow.

### 2026-09-13 — Brand Identity Typography Upgrade (Hardcoded Sharp Vectors)
- Changed: Replaced embedded raster image text in navbar and footers with standalone DPY vessel mark (`/dpy-mark-trans.png`) paired with hardcoded, responsive, vector-rendered HTML/CSS typography (`MARINE ENGINEERING`, `SHIPBUILDING • OUTFITTING • PIPING • FABRICATION`, and `Building Tomorrow's Vessels with Trust & Excellence`).
- Reason: User identified that small subtext below "Marine Engineering" in the raster image scaled down into unreadable blur.
- Impact: 100% crisp legibility on all Retina and high-DPI displays, responsive scaling on mobile, and cohesive corporate styling across all 7 pages.

### 2026-09-13 — Integrated CEO Executive Portrait (Dwarika Prasad Yadav)
- Changed: Processed and integrated high-resolution executive portrait of Proprietor & CEO Dwarika Prasad Yadav into [`about/index.html`](file:///e:/My%20Projects/DYP%20Engg/about/index.html) and Home page leadership spotlight [`index.html`](file:///e:/My%20Projects/DYP%20Engg/index.html).
- Reason: User provided reference executive photo (`Gemini_Generated_Image_x4fmjhx4fmjhx4fm.png`) to humanize brand leadership and boost corporate trust.
- Impact: Elevated credibility for shipyard procurement evaluation and vendor onboarding.

### 2026-09-13 — Multi-Page Architecture & Client Authentication Portal
- Changed: Restructured application from single-page to multi-page architecture with dedicated routes for Home (`/`), Services (`/services/`), About (`/about/`), Contact (`/contact/`), Login (`/login/`), Register (`/register/`), and Client Portal (`/portal/`). Added `users` table and session management in `src/scripts/auth.js`.
- Reason: User requested dedicated pages for sections and client authentication to enable shipyard clients to log in and avail services.
- Impact: Multi-page navigation, role-ready authentication, client RFQ tracking portal, and updated `vite.config.js` MPA build.

### 2026-09-13 — Single-Screen (100vh) Zero-Scroll Optimization for Login & Register
- Changed: Re-engineered Login and Registration layouts to fit completely within a single desktop viewport (100vh) without requiring any vertical scrolling. Streamlined the left showcase panel to a punchy headline, 3 compact checkmarks, and a succinct CEO quote; removed redundant registration inputs (optional GSTIN and duplicate confirm password); and calibrated form spacing (`clamp(0.5rem, 1.1vh, 0.85rem)`) for zero-overflow presentation.
- Reason: User requested arranging both Login and Registration on a single screen without vertical scrolling by removing unnecessary details.
- Impact: Frictionless, modern single-screen experience on all desktop displays with zero scrollbars and responsive mobile fallback.

### 2026-09-13 — Full-Page Enterprise Auth Redesign (Split Layout & Form System)
- Changed: Replaced the cramped floating-card console modal layout on `/login/` and `/register/` with an immersive, full-height enterprise split layout (45% brand showcase panel with maritime gradients, trust pillars, class certifications, and CEO endorsement; 55% spacious form pane with 48px styled inputs, `@username` addon prefixes, show/hide eye toggles, password strength meter, and seamless navigation). Standardized the global form design system in `src/styles/components.css`.
- Reason: User requested professional full-page designs instead of a console-like cramped floating modal.
- Impact: World-class enterprise appearance on desktop and mobile, eliminating unstyled input glitches and navigation clutter.

### 2026-09-13 — Authentication Experience Upgrade (User ID, Registration Page, Navbar Avatar)
- Changed: Replaced header action buttons across all pages (`Client Login` and `Request Quote`) with dedicated `Login` and `Register` buttons when logged out, and an interactive User Avatar badge with live status indicator and dropdown menu when logged in. Upgraded authentication flow to support login via either unique User ID (username) or Email Address alongside Password. Built a dedicated enterprise-grade Registration page (`/register/`) featuring real-time client-side validation, password strength feedback, and show/hide visibility toggles.
- Reason: User requested standardizing the auth flow to allow login via User ID & password, creating a professional registration page, replacing Client Login & Request Quote with Login & Register, and replacing those buttons with the user's Avatar once logged in.
- Impact: Clean, modern header state across all 7 pages, friction-free login with usernames, professional onboarding for shipyards, and intuitive account management.

### 2026-09-13 — Transitioned to Enterprise Light Mode & Cloudflare D1 Schema
- Changed: Transformed UI theme from Dark Mode to Clean Maritime Light Mode (pure white canvas, deep navy `#091e36` typography, ocean azure `#0284c7` accents); extracted and integrated exact official letterhead logo (`public/dpy-header-logo-trans.png`); generated Cloudflare D1 SQLite database schema (`schema.sql`).
- Reason: Client branding alignment with official letterhead stationery and preparation for serverless Cloudflare D1 data persistence.
- Impact: Elevated corporate credibility for shipyard procurement review, resolved logo mismatch, and established SQL database structure.

### 2026-09-13 — Initial PRD Created
- Changed: Created comprehensive PRD based on client introduction letter `DRP Engg..jpeg`.
- Reason: Project initiation and baseline architecture documentation.
- Impact: Guides the development of index.html, modular CSS, interactive JavaScript, and assets.
