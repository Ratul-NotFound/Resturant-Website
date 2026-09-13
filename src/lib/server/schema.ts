/**
 * SQLite Database Schema DDL for AURA Restaurant.
 * Executed on initial database connection.
 */
export const SCHEMA_SQL = `
-- ═════════════════════════════════════════════════════════════════════
-- TABLE: menu_items
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS menu_items (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category        TEXT NOT NULL,
  price           REAL NOT NULL,
  description     TEXT NOT NULL,
  short_desc      TEXT,
  ingredients     TEXT NOT NULL,
  dietary_tags    TEXT NOT NULL,
  allergens       TEXT NOT NULL,
  calories        INTEGER,
  prep_time       TEXT,
  is_chef_special INTEGER DEFAULT 0,
  is_popular      INTEGER DEFAULT 0,
  wine_pairing    TEXT,
  chef_note       TEXT,
  farm_provenance TEXT,
  image           TEXT NOT NULL,
  gallery         TEXT DEFAULT '[]',
  display_order   INTEGER DEFAULT 0,
  is_active       INTEGER DEFAULT 1,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_active ON menu_items(is_active);

-- ═════════════════════════════════════════════════════════════════════
-- TABLE: reservations
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS reservations (
  id                TEXT PRIMARY KEY,
  booking_reference TEXT NOT NULL UNIQUE,
  guest_name        TEXT NOT NULL,
  guest_email       TEXT NOT NULL,
  guest_phone       TEXT NOT NULL,
  party_size        INTEGER NOT NULL,
  dining_date       TEXT NOT NULL,
  time_slot         TEXT NOT NULL,
  seating_area      TEXT NOT NULL,
  occasion          TEXT DEFAULT 'none',
  dietary_notes     TEXT DEFAULT '',
  status            TEXT DEFAULT 'CONFIRMED',
  qr_data           TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_res_lookup ON reservations(dining_date, time_slot, seating_area, status);
CREATE INDEX IF NOT EXISTS idx_res_email ON reservations(guest_email);

-- ═════════════════════════════════════════════════════════════════════
-- TABLE: orders
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS orders (
  id               TEXT PRIMARY KEY,
  customer_name    TEXT NOT NULL,
  customer_email   TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  items_json       TEXT NOT NULL,
  coupon_code      TEXT DEFAULT NULL,
  tip_percentage   REAL DEFAULT 18.0,
  subtotal         REAL NOT NULL,
  discount         REAL DEFAULT 0.0,
  tax              REAL NOT NULL,
  tip_amount       REAL NOT NULL,
  grand_total      REAL NOT NULL,
  status           TEXT DEFAULT 'CONFIRMED',
  estimated_prep   INTEGER DEFAULT 35,
  created_at       TEXT DEFAULT (datetime('now')),
  updated_at       TEXT DEFAULT (datetime('now'))
);

-- ═════════════════════════════════════════════════════════════════════
-- TABLE: slot_capacity
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS slot_capacity (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  seating_area TEXT NOT NULL,
  time_slot    TEXT NOT NULL,
  total_tables INTEGER NOT NULL,
  is_blocked   INTEGER DEFAULT 0,
  UNIQUE(seating_area, time_slot)
);

-- ═════════════════════════════════════════════════════════════════════
-- TABLE: newsletter_subscribers
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  is_active     INTEGER DEFAULT 1,
  subscribed_at TEXT DEFAULT (datetime('now'))
);

-- ═════════════════════════════════════════════════════════════════════
-- TABLE: rate_limit_buckets
-- ═════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS rate_limit_buckets (
  ip          TEXT NOT NULL,
  endpoint    TEXT NOT NULL,
  tokens      REAL NOT NULL,
  last_refill TEXT NOT NULL,
  PRIMARY KEY (ip, endpoint)
);
`;
