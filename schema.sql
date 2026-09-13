-- =============================================================================
-- DPY Marine Engineering - Cloudflare D1 Database Schema
-- Dialect: SQLite (Cloudflare D1 native engine)
-- =============================================================================

-- 1. Table: Registered Clients & Shipyard Procurement Users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  gst_number TEXT,
  role TEXT DEFAULT 'CLIENT' CHECK (role IN ('CLIENT', 'VENDOR_MANAGER', 'ADMIN')),
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: RFQ & Work Package Inquiries
CREATE TABLE IF NOT EXISTS rfq_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  scope_details TEXT,
  engagement_model TEXT DEFAULT 'Subcontract Basis',
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_REVIEW', 'QUOTATION_DISPATCHED', 'CONTRACTED', 'REJECTED')),
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: Manpower Package Estimations
CREATE TABLE IF NOT EXISTS manpower_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rfq_id INTEGER REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
  discipline TEXT NOT NULL,
  welders_count INTEGER DEFAULT 0,
  fitters_count INTEGER DEFAULT 0,
  fabricators_count INTEGER DEFAULT 0,
  supervisors_count INTEGER DEFAULT 0,
  total_workforce INTEGER GENERATED ALWAYS AS (welders_count + fitters_count + fabricators_count + supervisors_count) VIRTUAL,
  mobilization_timeline TEXT DEFAULT '48 - 72 Hours',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: Shipyard Vendor Panel Registrations & Enquiries
CREATE TABLE IF NOT EXISTS vendor_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  shipyard_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  designation TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  trade_requirements TEXT,
  status TEXT DEFAULT 'NEW' CHECK (status IN ('NEW', 'DOCUMENTS_SENT', 'PANEL_APPROVED', 'ARCHIVED')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_rfq_user_id ON rfq_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_rfq_status ON rfq_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_rfq_created ON rfq_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vendor_shipyard ON vendor_registrations(shipyard_name);
