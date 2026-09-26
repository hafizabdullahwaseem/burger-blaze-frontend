# Burger Blaze — Modern Flame-Crafted Fast-Food Web Experience

Burger Blaze is a high-octane, production-ready, single-page web application built with a cinematic dark theme, vibrant red (`#E63B2E`) and warm amber (`#F5A623`) accents, fluid kinetic typography, and interactive 3D WebGL visuals.

## 🚀 Key Features & Architectural Sections

1. **3D Preloader Sequence**:
   - Isometric spinning burger animation with glowing embers, live progress counter, and smooth exit transition.
2. **Glassmorphism Sticky Navbar**:
   - Top Bar Contract compliant navigation with dynamic background blur, active section spy indicator, mobile slide-over menu, and live shopping bag counter.
3. **Hero Section ("Taste the Blaze")**:
   - Word-by-word kinetic typography reveal powered by Framer Motion.
   - High-resolution cinematic flame-grilled burger imagery with measured darkening scrims.
   - Floating CTA button and continuously rotating 360° circular badge (`100% BLACK ANGUS • FLAME GRILLED • CHEF SPECIAL`).
   - Claim-to-proof metrics (4.9★ rating, 18-minute doorstep drop).
4. **Featured Menu Grid**:
   - Categorized filter tabs (All, Burgers, Crispy Chicken, Loaded Sides, Handcrafted Shakes).
   - Card hover lift with subtle crimson glow and slide-in "Add to Cart" interaction.
   - Quick ingredient inspector modal.
5. **"Why Choose Us" Pillars**:
   - Three sequential scroll-animated columns highlighting Fresh Ingredients, Fast Aero-Vented Delivery, and 500° Cast Iron Premium Taste.
6. **Signature Interactive 3D Burger Deconstruct**:
   - Real-time Three.js 3D burger model with realistic procedural materials (toasted brioche crown with 3D sesame seeds, dripping secret blaze aioli, heirloom tomato slices, ruffled hydroponic lettuce, melted cheddar with drooping corners, charred Angus patty, and foundation bun).
   - Scroll-driven unstacking + interactive scrub slider + full 360° drag rotation controls + dynamic ingredient provenance callout cards.
7. **Testimonials Carousel**:
   - Horizontal review slider featuring culinary critics and verified patrons with star ratings, drag gestures, and autoplay.
8. **Call-to-Action Banner ("Craving Yet?")**:
   - Parallax scrolling background typography with vibrant flame gradient and one-click coupon copy tool (`BLAZE20`).
9. **Interactive Shopping Bag & Order Flow**:
   - Real-time cart drawer with quantity adjustments, live tax and delivery calculation, coupon discounts, and an express checkout modal with arrival timeline tracker.
10. **Multi-Column Footer**:
    - Complete with brand story, quick links, kitchen hours, address, and interactive VIP newsletter signup.

---

## 🛠 Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**:
  - `lenis` for smooth inertial scrolling
  - `motion` (Framer Motion v12) for layout transitions & kinetic typography
  - `gsap` & `ScrollTrigger` for scroll orchestration
- **3D Graphics**: `three` (WebGL canvas with custom standard materials, shadows, and interactive orbit rotation)
- **Icons**: `lucide-react`

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```
