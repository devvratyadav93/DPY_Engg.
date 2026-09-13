/**
 * DPY Marine Engineering - Core Marine Disciplines Dataset
 * Sourced directly from official client capability profile.
 */

export const SERVICES_DATA = [
  {
    id: "hull-outfitting",
    category: "shipbuilding",
    number: "01",
    title: "Hull Outfitting & Installation",
    tagline: "Precision Hull Mechanical & Deck Installations",
    description: "End-to-end outfitting of vessel compartments, deck machinery foundations, mast fittings, watertight doors, hatches, manholes, and accommodation ventilation systems in accordance with naval drawings.",
    deliverables: [
      "Deck machinery & mooring gear foundations",
      "Watertight door & hatch cover fitment",
      "Ladders, walkways & handrail installations",
      "Ventilation trunking & equipment foundations"
    ],
    standards: "Naval & Class Rules (IRS/DNV/LRS)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1"/><path d="M4 18V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"/><circle cx="12" cy="10" r="3"/></svg>`
  },
  {
    id: "structural-fabrication",
    category: "shipbuilding",
    number: "02",
    title: "Structural Fabrication & Erection",
    tagline: "Heavy Marine Hull Block Assembly & Integration",
    description: "Fabrication, pre-erection assembly, and drydock/berth erection of complex hull blocks, transverse & longitudinal bulkheads, double bottom sections, and superstructure modules.",
    deliverables: [
      "Hull block section alignment & erection",
      "Bulkhead & deck panel stiffener welding",
      "Heavy mast, crane pedestal & superstructure modules",
      "Fairing & structural dimensional tolerance control"
    ],
    standards: "Strict Yard Tolerances (GSL / MDL / CSL)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/></svg>`
  },
  {
    id: "pipe-fabrication",
    category: "piping",
    number: "03",
    title: "Pipe Fabrication & Installation",
    tagline: "High-Pressure Marine & Engine Room Pipe Spooling",
    description: "Shop fabrication and on-board installation of marine pipe spools across sea water, bilge, ballast, fuel oil, hydraulic, fire-fighting, and exhaust gas systems using high-spec metallurgy.",
    deliverables: [
      "Cu-Ni (Copper Nickel 90/10), SS316L & Carbon Steel spooling",
      "High-pressure hydraulic & pneumatic line fitment",
      "Hydrostatic pressure testing & chemical flushing",
      "Penetration sleeve installation & bulkhead spools"
    ],
    standards: "ASME B31.1 / Marine Piping Codes",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/></svg>`
  },
  {
    id: "plate-fitting",
    category: "shipbuilding",
    number: "04",
    title: "Plate Fitting & Fabrication",
    tagline: "Precision Shell Plating, Curvature & Fairing",
    description: "Expert plate development, roll bending, edge preparation (beveling), and 3D fit-up for bulbous bows, stern frames, bottom shell plating, and curved bilge strakes.",
    deliverables: [
      "Complex 3D curvature plate fairing & fit-up",
      "Beveling & root gap preparation for 100% penetration welds",
      "Shell plate renewal on afloat and drydocked vessels",
      "Laser & optical template alignment"
    ],
    standards: "IACS Shipbuilding Quality Standards",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
  },
  {
    id: "certified-welding",
    category: "piping",
    number: "05",
    title: "SMAW / FCAW / GTAW Certified Welding",
    tagline: "Class-Qualified 6G & 6GR Multi-Process Welding",
    description: "Radiography and ultrasonic testing (RT/UT) compliant welding by certified welders utilizing SMAW (Manual Metal Arc), FCAW (Flux-Cored Arc), and GTAW (TIG) processes on high-tensile steel and exotic alloys.",
    deliverables: [
      "6G / 6GR positions on marine pipe spools & heavy nodes",
      "FCAW welding for high-speed structural block joints",
      "TIG (GTAW) root run for high-pressure fuel & steam lines",
      "Full WPS/PQR compliance & NDT clearance guarantee"
    ],
    standards: "AWS D1.1 / ASME IX / IRS Approved",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    id: "ship-repair",
    category: "repair",
    number: "06",
    title: "Ship Repair & Maintenance",
    tagline: "Afloat, Anchorage & Drydock Emergency Overhauls",
    description: "Rapid deployment repair teams for commercial, naval, and offshore vessels in Goa waters, executing steel renewals, sea chest overhauls, rudder/propeller compartment repairs, and pipe retrofits.",
    deliverables: [
      "Hull plate renewals & internal stiffener crop-and-replace",
      "Ballast & cargo tank re-piping & valve overhauls",
      "Deck crane, windlass & hatch cover refurbishments",
      "Emergency voyage repairs with 24/7 technical mobilization"
    ],
    standards: "Port State & Classification Survey Ready",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
  },
  {
    id: "grinding-cutting",
    category: "shipbuilding",
    number: "07",
    title: "Grinding, Cutting & Fit-up",
    tagline: "Heavy Thermal Cutting & Mechanical Edge Preparation",
    description: "Accurate oxy-fuel, plasma cutting, air-carbon arc gouging, back gouging, and grinding to achieve defect-free weld root preparation and pristine finish standards.",
    deliverables: [
      "Air-arc gouging of structural butt welds for back-welding",
      "CNC & manual thermal cutting of high-tensile plates",
      "Weld seam dress grinding & weld flush preparation",
      "Pre-heating and interpass temperature monitoring"
    ],
    standards: "QA/QC Visual & Surface Inspection Compliant",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`
  },
  {
    id: "skilled-manpower",
    category: "manpower",
    number: "08",
    title: "Skilled Technical Manpower Supply",
    tagline: "Certified Marine Welders, Fitters & Riggers",
    description: "Immediate mobilization of certified marine tradesmen with verified shipyard experience, trade test credentials, and full statutory PF/ESIC/Insurance compliance.",
    deliverables: [
      "Certified 6G Pipe Welders (SMAW, GTAW, FCAW)",
      "Marine Structural Fitters & Plate Fabricators",
      "Marine Pipe Fitters (Isometric drawing readers)",
      "Certified Riggers & Scaffolding Crews"
    ],
    standards: "Pre-screened & Trade-Tested for Shipyard Gates",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    id: "site-supervision",
    category: "manpower",
    number: "09",
    title: "Site Supervision & Work Coordination",
    tagline: "On-Site Naval Foremen & Execution Management",
    description: "Dedicated site engineers and supervisors overseeing daily production schedules, drawing interpretations, trade logistics, and shipyard interface coordination.",
    deliverables: [
      "Shipyard drawing interpretation & work packaging",
      "Daily progress reporting & milestone tracking",
      "Inter-trade coordination (Hull, Piping, Outfitting)",
      "Consumable & material reconciliation management"
    ],
    standards: "Daily DPR & Milestone Accountability",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>`
  },
  {
    id: "safety-compliance",
    category: "manpower",
    number: "10",
    title: "Safety & Quality Compliance",
    tagline: "Zero-Accident Protocol & Full QA/QC Documentation",
    description: "Comprehensive adherence to shipyard HSE norms, daily toolbox talks, hot work permits, confined space entry protocols, and stage-by-stage quality inspection sign-offs.",
    deliverables: [
      "Mandatory shipyard PPE & safety harness protocols",
      "Hot work & confined space gas-free clearance management",
      "Welder qualification records (WQR) & traceability",
      "MSME, GST & statutory labor law adherence"
    ],
    standards: "Zero-Incident Safety Target / ISO Aligned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
  }
];
