/**
 * DPY Marine Engineering - Interactive RFQ & Manpower Estimator Logic
 */

export function initQuoteEstimator(openModalWithData) {
  const container = document.getElementById('interactive-estimator');
  if (!container) return;

  // Internal State
  const state = {
    discipline: 'Hull Block Fabrication & Outfitting',
    engagementModel: 'Subcontract Basis',
    manpower: {
      welders: 6,
      fitters: 4,
      fabricators: 4,
      supervisors: 1
    },
    durationWeeks: 8
  };

  // DOM Elements
  const weldersVal = document.getElementById('val-welders');
  const fittersVal = document.getElementById('val-fitters');
  const fabricatorsVal = document.getElementById('val-fabricators');
  const supervisorsVal = document.getElementById('val-supervisors');

  const summaryDiscipline = document.getElementById('summary-discipline');
  const summaryModel = document.getElementById('summary-model');
  const summaryHeadcount = document.getElementById('summary-headcount');
  const summaryTimeline = document.getElementById('summary-timeline');
  const btnLaunchRfq = document.getElementById('btn-estimator-rfq');

  function updateDisplay() {
    if (weldersVal) weldersVal.textContent = state.manpower.welders;
    if (fittersVal) fittersVal.textContent = state.manpower.fitters;
    if (fabricatorsVal) fabricatorsVal.textContent = state.manpower.fabricators;
    if (supervisorsVal) supervisorsVal.textContent = state.manpower.supervisors;

    const totalHeadcount = 
      state.manpower.welders + 
      state.manpower.fitters + 
      state.manpower.fabricators + 
      state.manpower.supervisors;

    if (summaryDiscipline) summaryDiscipline.textContent = state.discipline;
    if (summaryModel) summaryModel.textContent = state.engagementModel;
    if (summaryHeadcount) summaryHeadcount.textContent = `${totalHeadcount} Certified Personnel`;

    // Dynamic mobilization timeline estimation
    let mobTime = "48 - 72 Hours (Goa Yards)";
    if (totalHeadcount > 25) {
      mobTime = "5 - 7 Days (Staggered Batches)";
    }
    if (summaryTimeline) summaryTimeline.textContent = mobTime;
  }

  // Counter button bindings
  container.querySelectorAll('[data-counter-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.counterTarget;
      const action = btn.dataset.counterAction;

      if (!state.manpower[target] && state.manpower[target] !== 0) return;

      if (action === 'inc') {
        state.manpower[target] = Math.min(50, state.manpower[target] + 1);
      } else if (action === 'dec') {
        state.manpower[target] = Math.max(0, state.manpower[target] - 1);
      }

      updateDisplay();
    });
  });

  // Discipline radio bindings
  container.querySelectorAll('input[name="estimator-discipline"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.discipline = e.target.value;
      updateDisplay();
    });
  });

  // Contract Model radio bindings
  container.querySelectorAll('input[name="estimator-model"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.engagementModel = e.target.value;
      updateDisplay();
    });
  });

  // Launch prefilled RFQ
  if (btnLaunchRfq) {
    btnLaunchRfq.addEventListener('click', () => {
      const totalHeadcount = 
        state.manpower.welders + 
        state.manpower.fitters + 
        state.manpower.fabricators + 
        state.manpower.supervisors;

      const prefillNote = `Scope: ${state.discipline} | Model: ${state.engagementModel} | Team Size: ${totalHeadcount} (Welders: ${state.manpower.welders}, Fitters: ${state.manpower.fitters}, Fabricators: ${state.manpower.fabricators}, Supervisors: ${state.manpower.supervisors})`;

      if (typeof openModalWithData === 'function') {
        openModalWithData({
          projectType: state.discipline,
          message: prefillNote
        });
      } else {
        // Fallback: scroll to contact form and fill
        const projectSelect = document.getElementById('form-project-type');
        const messageBox = document.getElementById('form-message');
        if (projectSelect) projectSelect.value = state.discipline;
        if (messageBox) messageBox.value = prefillNote;
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Initial render
  updateDisplay();
}
