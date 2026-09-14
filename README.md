# 🔥 FLAME & FEAST — Full-Stack Restaurant Web Application

> **Fiery Flame-Grilled & Heritage Dum Delicacies**  
> A modern, high-performance, animated full-stack restaurant platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Prisma ORM**.

---

## ✨ Key Features

- 🔥 **Rich Animated UI/UX**: Flame particle background canvas, fiery shimmer gradients, floating stamps, and luxury glassmorphism.
- 🍗 **Interactive Portion Sizing Engine**: 1:1, 1:2, and 1:4 person serving selectors with instant price calculation.
- 🌶️ **Meal Customizer**: Select Peri-Peri spice levels, extra add-ons (Extra Aloo, Egg, Borhani, Firni, Garlic Dip), and kitchen instructions.
- ⚡ **Limited-Time Mega Feast Deal**: Glowing ৳999 4-REG Platter showcase with 1-click add to cart.
- 🛒 **Slide-Over Tray Drawer & Checkout**: Real-time tray drawer with promo voucher codes (`FEAST100`, `WELCOME50`), delivery fee calculator, and multi-step checkout (COD, bKash, Nagad, Card) with confetti celebration.
- 🚴 **Live 5-Stage Order Tracking (`/track/[orderId]`)**: Real-time kitchen telemetry (*Received* ➔ *Prepping* ➔ *On Flame* ➔ *Out for Delivery* ➔ *Delivered*), arrival timer, and rider contact details.
- 📅 **Table Reservation Wizard (`/reserve`)**: 4-step table booking wizard with date/time slot pickers, guest counts, seating zones, and instant confirmed reference codes (`#RES-XXXX`).
- 👨‍🍳 **Staff Kitchen Admin Portal (`/admin`)**: Password-protected portal (`admin123`) with sales telemetry, live order dispatch center, and table reservation manager.
- 🚀 **Universal Deployment Ready**: Ready for **cPanel**, **Linux VPS (PM2 + Nginx)**, **Docker**, or **Vercel** hosting with standalone server configuration.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Canvas Particles
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Persistent LocalStorage Cart)
- **Database & ORM**: [Prisma](https://www.prisma.io/) with SQLite (1-line switchable to PostgreSQL/MySQL via `.env`)
- **Process Manager**: PM2 (`ecosystem.config.js`)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Ratul-NotFound/Resturant-Website.git
cd Resturant-Website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Database & Seed Initial Menu
```bash
npx prisma generate
npx prisma db push
node scripts/seed.mjs
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🔐 Admin Credentials
- **Admin URL**: `http://localhost:3000/admin/login`
- **Default Password**: `admin123` (Configurable in `.env` via `ADMIN_PASSWORD`)

---

## 📦 Production & Hosting

Detailed deployment guides for **cPanel**, **VPS (Ubuntu + PM2 + Nginx)**, and **Docker** are available in [DEPLOYMENT.md](./DEPLOYMENT.md).

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📄 License
MIT License © 2026 Flame & Feast Inc.
