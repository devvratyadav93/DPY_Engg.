/**
 * DPY Marine Engineering - Main Application Script
 */

import { SERVICES_DATA } from './services-data.js';
import { initRfqModal } from './rfq-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize RFQ Modal Dialog
  const rfqModal = initRfqModal();

  // 3. Render 10 Core Marine Services
  renderServices('all');
  initServiceFilters();

  // 4. Header Scroll State
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 5. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav .nav-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    mobileToggle?.classList.add('open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    mobileToggle?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 6. Section Scroll Spy (Active nav highlighting)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // 7. Main RFP / Contact Form Handler
  const contactForm = document.getElementById('contact-rfp-form');
  const contactStatus = document.getElementById('contact-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const company = document.getElementById('form-company')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const projectType = document.getElementById('form-project-type')?.value || 'Shipbuilding & Marine Fabrication';
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !company || !email || !phone) {
        if (contactStatus) {
          contactStatus.className = 'form-status error';
          contactStatus.textContent = 'Please fill out all required fields (Name, Company/Shipyard, Email, Phone).';
          contactStatus.style.display = 'block';
        }
        return;
      }

      const inquirySummary = 
`*DPY MARINE ENGINEERING - WORK INQUIRY*
---------------------------------------
• Client: ${name}
• Shipyard/Company: ${company}
• Contact: ${phone} | ${email}
• Scope: ${projectType}
• Details: ${message || 'No additional notes provided'}`;

      const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(inquirySummary)}`;

      if (contactStatus) {
        contactStatus.className = 'form-status success';
        contactStatus.innerHTML = `
          <strong>Thank you, ${name}! Your inquiry has been received.</strong><br>
          Our technical team and Proprietor Dwarika Prasad Yadav will review your requirements.<br>
          <div style="margin-top: 10px;">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="display:inline-flex;">
              Chat directly with Proprietor on WhatsApp &rarr;
            </a>
          </div>
        `;
        contactStatus.style.display = 'block';
      }

      contactForm.reset();
    });
  }
});

/**
 * Render service cards into DOM with category filter support
 */
function renderServices(activeCategory) {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const filtered = activeCategory === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  container.innerHTML = filtered.map(service => `
    <article class="service-card" data-category="${service.category}">
      <div class="service-card-image-wrap">
        <img 
          src="${service.image}" 
          alt="${service.imageAlt}" 
          class="service-card-img" 
          loading="lazy" 
          width="480" 
          height="270"
        />
        <div class="service-card-image-overlay"></div>
        <span class="service-card-category-badge">${service.categoryLabel}</span>
        <span class="service-number">#${service.number}</span>
      </div>

      <div class="service-card-body">
        <div class="service-card-top">
          <div class="service-icon-box" aria-hidden="true">
            ${service.icon}
          </div>
        </div>
        <div class="service-tagline">${service.tagline}</div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
        
        <div class="service-deliverables">
          <div class="service-deliverables-title">Key Scope &amp; Deliverables</div>
          <ul class="service-deliverables-list">
            ${service.deliverables.map(item => `
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="service-card-bottom">
          <span class="service-standards-tag">${service.standards}</span>
          <button class="btn btn-sm btn-outline" data-open-rfq data-open-rfq-scope="${service.title}">
            Inquire Scope
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Re-bind click handlers for dynamic service card buttons
  container.querySelectorAll('[data-open-rfq]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const scope = btn.dataset.openRfqScope;
      const modal = document.getElementById('rfq-modal');
      const projectTypeInput = document.getElementById('modal-project-type');
      const messageInput = document.getElementById('modal-message');

      if (projectTypeInput) projectTypeInput.value = scope;
      if (messageInput) messageInput.value = `Requesting quotation and technical availability for: ${scope}`;
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/**
 * Filter button event handlers
 */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filterCategory || 'all';
      renderServices(category);
    });
  });
}
