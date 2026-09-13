/**
 * DPY Marine Engineering - RFQ & Vendor Inquiry Modal Handler
 */

export function initRfqModal() {
  const modal = document.getElementById('rfq-modal');
  if (!modal) return { open: () => {} };

  const closeBtns = modal.querySelectorAll('.modal-close, [data-modal-close]');
  const modalForm = document.getElementById('modal-rfq-form');
  const modalStatus = document.getElementById('modal-status');
  const projectTypeInput = document.getElementById('modal-project-type');
  const messageInput = document.getElementById('modal-message');

  function open(prefillData = {}) {
    if (prefillData.projectType && projectTypeInput) {
      projectTypeInput.value = prefillData.projectType;
    }
    if (prefillData.message && messageInput) {
      messageInput.value = prefillData.message;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalStatus) {
      modalStatus.className = 'form-status';
      modalStatus.style.display = 'none';
    }
  }

  closeBtns.forEach(btn => btn.addEventListener('click', close));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      close();
    }
  });

  // Global trigger buttons
  document.querySelectorAll('[data-open-rfq]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const scope = trigger.dataset.openRfqScope || '';
      open({
        projectType: scope ? scope : 'Shipbuilding & Marine Fabrication',
        message: scope ? `Inquiry regarding specialized work package: ${scope}` : ''
      });
    });
  });

  // Form submission handler
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-name')?.value.trim();
      const company = document.getElementById('modal-company')?.value.trim();
      const email = document.getElementById('modal-email')?.value.trim();
      const phone = document.getElementById('modal-phone')?.value.trim();
      const projectType = projectTypeInput?.value || 'General Marine Scope';
      const notes = messageInput?.value.trim() || '';

      if (!name || !company || !email || !phone) {
        if (modalStatus) {
          modalStatus.className = 'form-status error';
          modalStatus.textContent = 'Please provide your name, shipyard/company name, email, and phone number.';
          modalStatus.style.display = 'block';
        }
        return;
      }

      // Format RFQ summary
      const rfqSummary = 
`*DPY MARINE ENGINEERING - RFQ INQUIRY*
---------------------------------------
• Client: ${name}
• Organization: ${company}
• Contact: ${phone} | ${email}
• Project Scope: ${projectType}
• Notes / Package Requirements: ${notes || 'Standard evaluation requested'}`;

      // Open WhatsApp or mailto option
      const cleanPhone = "919876543210";
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rfqSummary)}`;

      if (modalStatus) {
        modalStatus.className = 'form-status success';
        modalStatus.innerHTML = `
          <strong>Inquiry Generated Successfully!</strong><br>
          We have recorded your project request. You can also send this directly to Dwarika Prasad Yadav on WhatsApp:
          <div style="margin-top: 10px;">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="display:inline-flex;">
              Dispatch via WhatsApp &rarr;
            </a>
          </div>
        `;
        modalStatus.style.display = 'block';
      }

      modalForm.reset();
    });
  }

  return { open, close };
}
