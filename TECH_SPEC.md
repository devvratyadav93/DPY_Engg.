# Technical Specification (TECH_SPEC)

## Project: DPY Marine Engineering Corporate Web Platform
- **Version:** 1.0.0
- **Build Tool:** Vite 6.x
- **Runtime Target:** Modern Web Browsers (ES2022+)
- **Hosting / CI/CD:** Cloudflare Pages (via GitHub Repository: `devvratyadav93/DYP_Engg.`)

---

## 1. Architecture Overview

The application is structured as an ultra-fast, pre-rendered static single-page application (SPA) powered by Vite for modern asset bundling, zero-latency local development (HMR), and automated CSS minification.

```
DYP Engg/
├── .gitignore
├── package.json
├── PRD.md
├── TECH_SPEC.md
├── index.html                  # Semantic, accessible HTML5 structure with SEO meta
├── public/
│   ├── favicon.svg             # Maritime vessel vector icon
│   └── dpy-logo.svg            # Custom vector recreation of DPY Marine Engineering logo
└── src/
    ├── styles/
    │   ├── variables.css       # Maritime design tokens (HSL oceanic blues, typography, elevation)
    │   ├── base.css            # Modern reset, fluid type, accessibility focus styles
    │   ├── components.css      # Buttons, badges, cards, modals, form controls
    │   ├── navigation.css      # Glassmorphic header & mobile drawer
    │   ├── hero.css            # Dynamic nautical hero & metrics ribbon
    │   ├── services.css        # Services grid, category filters, detail modals
    │   ├── estimator.css       # Interactive RFQ & manpower calculator
    │   └── footer.css          # Compliance credentials & contact cards
    └── scripts/
        ├── main.js             # Entry point, navigation, scroll behavior
        ├── services-data.js    # Data schema for 10 core disciplines
        ├── quote-estimator.js  # Dynamic calculator logic & summary generation
        └── rfq-modal.js        # Accessible modal dialog & form submission handler
```

---

## 2. Design System Tokens & Aesthetic Palette

| Token | Hex / HSL | Usage |
|-------|-----------|-------|
| `--color-navy-dark` | `#071527` / `hsl(214, 70%, 9%)` | Deep maritime ocean background |
| `--color-navy-card` | `#0d233f` / `hsl(214, 65%, 15%)` | Elevated card surfaces |
| `--color-cyan-primary` | `#0284c7` / `hsl(200, 98%, 39%)` | Primary brand action color |
| `--color-cyan-bright` | `#38bdf8` / `hsl(199, 89%, 60%)` | Accents, highlights, glows |
| `--color-steel-light` | `#94a3b8` / `hsl(215, 20%, 65%)` | Secondary technical text & borders |
| `--color-white` | `#ffffff` / `hsl(0, 0%, 100%)` | Heading text, pristine contrast |
| `--font-primary` | `'Plus Jakarta Sans', 'Inter', sans-serif` | Modern, authoritative technical typography |

---

## 3. Data Contracts & State Management

### 3.1 Service Discipline Schema
```typescript
interface ServiceDiscipline {
  id: string;
  category: 'shipbuilding' | 'piping' | 'repair' | 'manpower';
  title: string;
  tagline: string;
  description: string;
  keyDeliverables: string[];
  certificationsOrStandards: string[];
  iconSvg: string;
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
- **Git Provider:** GitHub (`https://github.com/devvratyadav93/DYP_Engg.`)
- **Build System:** Cloudflare Pages standard Node.js builder
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `/`

---

## Changelog
### 2026-09-13 — Initial TECH_SPEC Created
- Modified: Complete technical specification for the Vite static architecture.
- Before: Blank project repository.
- After: Defined architecture, design tokens, data models, and Cloudflare Pages CI/CD configuration.
- Reason: Baseline technical contract prior to code implementation.
