# UI/UX Enhancements & SWOT Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the top prioritized UI/UX and conversion optimizations identified in the in-depth SWOT audit across the restaurant web application.

**Architecture:** Enhance existing Next.js / React client components (`MenuSection`, `MegaDealBanner`, `CheckoutModal`, `CartDrawer`, `BranchLocator`, `FloatingMobileBar`, `HeroSection`) with zero breaking changes, adhering to modern UX ergonomics (Fitts's Law, Hick's Law, 8pt grid, WCAG accessibility) and fluid Framer Motion micro-interactions.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Framer Motion, Zustand (`useStore`), Lucide Icons, Canvas Confetti.

**Spec:** [ui_ux_in_depth_swot_analysis.md](file:///C:/Users/mhrat/.gemini/antigravity-ide/brain/335f0621-6138-43c6-ac3b-6d7dcea140fe/ui_ux_in_depth_swot_analysis.md)

## Global Constraints

- Preserve all existing styling tokens (`bg-brand-red`, `bg-brand-dark`, `font-display`, `cta-shimmer`).
- Zero hydration mismatches (`useEffect` or `mounted` checks for client-only state like `localStorage` and timers).
- All new interactive elements must have minimum 44x44px touch targets on mobile or appropriate accessibility labels.
- Zero extra external dependencies required.

---

### Task 1: Sticky Category Filter Rail with Mobile Scroll Fade on MenuSection

**Files:**
- Modify: `components/MenuSection.tsx`

- [ ] **Step 1: Update container to support sticky positioning below the navbar**
  Add sticky positioning (`sticky top-16 z-30 bg-[#FCFBFA]/95 backdrop-blur-md py-3 border-b border-neutral-200/60 shadow-xs`) to the category filter bar in `MenuSection.tsx`.
- [ ] **Step 2: Add horizontal scroll edge fade hints for mobile**
  Add right-edge gradient masks to indicate scrollable content on smaller screens.
- [ ] **Step 3: Test and verify sticky behavior in browser**
  Scroll down on `http://localhost:3000/#portion-section` and confirm category pills remain accessible without obstructing dishes.

---

### Task 2: Live Countdown Urgency Timer on MegaDealBanner

**Files:**
- Modify: `components/MegaDealBanner.tsx`

- [ ] **Step 1: Add ticking countdown timer state and hydration-safe clock logic**
  Implement `timeLeft` state showing hours, minutes, and seconds remaining until midnight.
- [ ] **Step 2: Render animated countdown clock pill in the banner**
  Add high-contrast badge (`⏰ Flash Deal Ends: 04h : 22m : 15s`) next to the delivery assurance tag.
- [ ] **Step 3: Verify countdown updates every second in browser**
  Inspect `http://localhost:3000/#mega-deal` to ensure timer decrements cleanly without layout shift.

---

### Task 3: Customer Details LocalStorage Pre-Fill & Persistence on CheckoutModal

**Files:**
- Modify: `components/CheckoutModal.tsx`

- [ ] **Step 1: Add local storage loading on mount for returning patrons**
  Read `flame_customer_name`, `flame_customer_phone`, and `flame_customer_address` from `localStorage`.
- [ ] **Step 2: Add "Save my details for future orders" checkbox**
  Provide a toggle switch allowing users to manage saved profile persistence.
- [ ] **Step 3: Save details upon successful order completion**
  In `handlePlaceOrder`, persist the user's details if the checkbox is active.
- [ ] **Step 4: Verify pre-fill works seamlessly**
  Fill form once, reload modal, and verify fields pre-populate.

---

### Task 4: Dynamic 1-Click Upsell Add-ons in CartDrawer

**Files:**
- Modify: `components/CartDrawer.tsx`

- [ ] **Step 1: Define popular add-on items array**
  Curate quick upsells: Chilled Borhani (৳90), Peri Spiced Fries (৳160), Extra Potato (৳40).
- [ ] **Step 2: Build horizontal 1-click add chips in CartDrawer**
  Render above the coupon and bill breakdown with a `+ Add` button.
- [ ] **Step 3: Connect to `addToCart` with toast notification**
  Verify clicking "+ Add" adds the item to the tray and recalculates totals instantly.

---

### Task 5: Real-Time "Open Now / Closes at 11:30 PM" Status on BranchLocator

**Files:**
- Modify: `components/BranchLocator.tsx`

- [ ] **Step 1: Add outlet operating status calculation helper**
  Calculate whether the current local time falls between 12:00 PM and 11:30 PM.
- [ ] **Step 2: Render status pill on each branch card**
  Display a pulsing green indicator (`Open Now • Dine-in & Delivery`) or amber pill (`Opens at 12:00 PM`).
- [ ] **Step 3: Verify in browser**
  Check that branch cards reflect current kitchen operational status.

---

### Task 6: Mobile Bottom Stack Safe Area & Overflow Clearance

**Files:**
- Modify: `components/FloatingMobileBar.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Add bottom padding clearance to Footer**
  Ensure footer has `pb-36 lg:pb-12` so the floating tray pill and mobile dock never obscure footer links.
- [ ] **Step 2: Enforce safe area insets on mobile navigation dock**
  Verify `pb-[env(safe-area-inset-bottom)]` and background backdrop blur.

---

### Task 7: Mobile Horizontal Category Ribbon Fade Hint on HeroSection

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Add right fade overlay on mobile ribbon**
  Add a subtle gradient indicator (`sm:hidden pointer-events-none`) so mobile users immediately recognize the ribbon is swipeable.
- [ ] **Step 2: Final visual regression test in browser**
  Take screenshots of desktop and mobile to confirm all fixes pass with flying colors.
