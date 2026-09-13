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
- Primary Call to Action (CTA): "Request Work Package Quote" (opens interactive RFQ).
- Secondary CTA: "Explore Core Services".
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
### 2026-09-13 — Initial PRD Created
- Changed: Created comprehensive PRD based on client introduction letter `DRP Engg..jpeg`.
- Reason: Project initiation and baseline architecture documentation.
- Impact: Guides the development of index.html, modular CSS, interactive JavaScript, and assets.
