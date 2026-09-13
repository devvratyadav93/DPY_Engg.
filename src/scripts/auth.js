/**
 * DPY Marine Engineering - Client Authentication & Portal State Manager
 */

const STORAGE_KEY = 'dyp_client_session';
const INQUIRIES_KEY = 'dyp_client_inquiries';

// Initial Demo Seed Data with User ID support
const DEFAULT_DEMO_USER = {
  id: 101,
  userId: 'gsl_procure',
  fullName: 'Rajesh Sharma',
  companyName: 'Goa Shipyard Limited',
  email: 'procurement@goashipyard.com',
  phone: '+91 98221 55432',
  gstNumber: '30AAACG1234F1Z5',
  role: 'CLIENT'
};

const DEFAULT_INQUIRIES = [
  {
    id: 'RFQ-2026-081',
    date: '10 Sep 2026',
    scope: 'Hull Outfitting & Deck Machinery Fitment',
    model: 'Subcontract Basis',
    manpowerCount: 15,
    status: 'IN_REVIEW',
    notes: 'Required for Yard Berth 3 offshore patrol vessel module.'
  },
  {
    id: 'RFQ-2026-044',
    date: '28 Aug 2026',
    scope: 'High-Pressure Cu-Ni 90/10 Pipe Spooling',
    model: 'Rate-Contract Basis',
    manpowerCount: 8,
    status: 'QUOTATION_DISPATCHED',
    notes: 'Radiography tested 6G/6GR weld joints approved by Class.'
  }
];

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  updateNavAuthStatus();
}

export function getClientInquiries() {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INQUIRIES;
  }
}

export function addClientInquiry(inquiry) {
  const list = getClientInquiries();
  const newItem = {
    id: `RFQ-2026-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'PENDING',
    ...inquiry
  };
  list.unshift(newItem);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(list));
  return newItem;
}

/**
 * Authenticate using either User ID or Email Address
 */
export function loginUser(identifier, password) {
  if (!identifier || !password) {
    return { success: false, error: 'Please enter both your User ID / Email and password.' };
  }

  const cleanId = identifier.trim().toLowerCase();

  // 1. Check Demo Account match (either User ID: gsl_procure or Email: procurement@goashipyard.com)
  if (cleanId === 'procurement@goashipyard.com' || cleanId === 'gsl_procure') {
    if (password === 'demo1234' || password === 'admin' || password === 'password') {
      setCurrentUser(DEFAULT_DEMO_USER);
      return { success: true, user: DEFAULT_DEMO_USER };
    }
  }

  // 2. Check registered users database in localStorage
  const registeredUsersRaw = localStorage.getItem('dyp_registered_users');
  if (registeredUsersRaw) {
    try {
      const registeredUsers = JSON.parse(registeredUsersRaw);
      const matched = registeredUsers.find(u => 
        (u.userId && u.userId.toLowerCase() === cleanId) || 
        (u.email && u.email.toLowerCase() === cleanId)
      );

      if (matched) {
        if (matched.password === password) {
          const sessionUser = { ...matched };
          delete sessionUser.password;
          setCurrentUser(sessionUser);
          return { success: true, user: sessionUser };
        } else {
          return { success: false, error: 'Incorrect password. Please verify and try again.' };
        }
      }
    } catch (e) {
      console.error('Error reading registered users', e);
    }
  }

  return { 
    success: false, 
    error: 'No registered user found with that User ID or Email. Please check your credentials or register.' 
  };
}

/**
 * Register a new organization / client account with unique User ID
 */
export function registerUser(userData) {
  const registeredUsersRaw = localStorage.getItem('dyp_registered_users');
  let registeredUsers = [];
  try {
    registeredUsers = registeredUsersRaw ? JSON.parse(registeredUsersRaw) : [];
  } catch {
    registeredUsers = [];
  }

  const cleanUserId = userData.userId.trim().toLowerCase();
  const cleanEmail = userData.email.trim().toLowerCase();

  // Validate unique User ID
  if (registeredUsers.some(u => u.userId && u.userId.toLowerCase() === cleanUserId)) {
    return { success: false, error: 'This User ID is already taken. Please choose another unique handle.' };
  }

  // Validate unique Email
  if (registeredUsers.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please log in instead.' };
  }

  // Also reserve the demo user ID
  if (cleanUserId === 'gsl_procure' || cleanEmail === 'procurement@goashipyard.com') {
    return { success: false, error: 'This User ID or Email is reserved for system demonstrations.' };
  }

  const newUser = {
    id: Date.now(),
    userId: userData.userId.trim(),
    fullName: userData.fullName.trim(),
    companyName: userData.companyName.trim(),
    email: userData.email.trim(),
    phone: userData.phone.trim(),
    gstNumber: (userData.gstNumber || '').trim(),
    password: userData.password,
    role: 'CLIENT',
    createdAt: new Date().toISOString()
  };

  registeredUsers.push(newUser);
  localStorage.setItem('dyp_registered_users', JSON.stringify(registeredUsers));

  const sessionUser = { ...newUser };
  delete sessionUser.password;
  setCurrentUser(sessionUser);

  return { success: true, user: sessionUser };
}

export function logoutUser() {
  setCurrentUser(null);
  window.location.href = '/';
}

/**
 * Generate 2-letter uppercase initials from full name
 */
function getInitials(name) {
  if (!name) return 'ME';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Dynamically update the navbar buttons on all pages based on auth status
 */
export function updateNavAuthStatus() {
  const user = getCurrentUser();
  const authBtnContainer = document.getElementById('nav-auth-container');
  const drawerFooter = document.querySelector('.drawer-footer');

  if (authBtnContainer) {
    if (user) {
      const initials = getInitials(user.fullName);
      const shortName = user.fullName.split(' ')[0];
      const shortCompany = (user.companyName || 'Client').split(' ')[0];
      const displayId = user.userId || user.email.split('@')[0];

      authBtnContainer.innerHTML = `
        <div class="user-avatar-dropdown" id="user-avatar-dropdown">
          <button class="avatar-trigger" id="avatar-trigger" type="button" aria-expanded="false" aria-label="Account menu for ${user.fullName}">
            <div class="avatar-circle">
              <span class="avatar-initials">${initials}</span>
              <span class="avatar-status-dot" title="Online &amp; Active"></span>
            </div>
            <div class="avatar-text">
              <span class="avatar-name">${shortName}</span>
              <span class="avatar-role">${shortCompany}</span>
            </div>
            <svg class="avatar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <div class="avatar-dropdown-menu" id="avatar-dropdown-menu" aria-hidden="true">
            <div class="avatar-dropdown-header">
              <div class="avatar-user-full">${user.fullName}</div>
              <div class="avatar-user-id">User ID: <strong>@${displayId}</strong></div>
              <div class="avatar-user-company">${user.companyName}</div>
            </div>
            <div class="avatar-dropdown-divider"></div>
            <a href="/portal/" class="avatar-dropdown-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>Client Dashboard</span>
            </a>
            <a href="/services/" class="avatar-dropdown-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
              <span>Browse 10 Disciplines</span>
            </a>
            <div class="avatar-dropdown-divider"></div>
            <button id="nav-logout-btn" class="avatar-dropdown-link logout" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      `;

      // Toggle dropdown behavior
      const dropdownWrap = document.getElementById('user-avatar-dropdown');
      const trigger = document.getElementById('avatar-trigger');
      const menu = document.getElementById('avatar-dropdown-menu');

      trigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownWrap?.classList.contains('open');
        if (isOpen) {
          dropdownWrap?.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          menu?.setAttribute('aria-hidden', 'true');
        } else {
          dropdownWrap?.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          menu?.setAttribute('aria-hidden', 'false');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (dropdownWrap && !dropdownWrap.contains(e.target)) {
          dropdownWrap.classList.remove('open');
          trigger?.setAttribute('aria-expanded', 'false');
          menu?.setAttribute('aria-hidden', 'true');
        }
      });

      // Bind logout
      document.getElementById('nav-logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
      });

    } else {
      // Logged out: render Login and Register buttons
      authBtnContainer.innerHTML = `
        <div class="nav-auth-buttons">
          <a href="/login/" class="btn btn-sm btn-outline nav-btn-login">Login</a>
          <a href="/register/" class="btn btn-sm btn-primary nav-btn-register">Register</a>
        </div>
      `;
    }
  }

  // Update mobile drawer footer
  if (drawerFooter) {
    if (user) {
      drawerFooter.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.25rem;">
            <div class="avatar-circle" style="width: 40px; height: 40px;">
              <span class="avatar-initials">${getInitials(user.fullName)}</span>
            </div>
            <div style="display: flex; flex-direction: column; text-align: left;">
              <strong style="color: var(--navy-dark); font-size: 0.95rem;">${user.fullName}</strong>
              <span style="color: var(--text-muted); font-size: 0.78rem;">@${user.userId || user.email.split('@')[0]}</span>
            </div>
          </div>
          <a href="/portal/" class="btn btn-primary" style="width: 100%;">Open Client Dashboard</a>
          <button id="drawer-logout-btn" class="btn btn-secondary" style="width: 100%;">Sign Out</button>
        </div>
      `;
      document.getElementById('drawer-logout-btn')?.addEventListener('click', () => {
        logoutUser();
      });
    } else {
      drawerFooter.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; width: 100%;">
          <a href="/login/" class="btn btn-outline" style="text-align: center;">Login</a>
          <a href="/register/" class="btn btn-primary" style="text-align: center;">Register</a>
        </div>
      `;
    }
  }
}

// Auto-run on script load
document.addEventListener('DOMContentLoaded', () => {
  updateNavAuthStatus();
});
