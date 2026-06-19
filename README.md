<div align="center">

# 🍱 ForkFleet

### Hot food, zero wait — Bengaluru's iconic kitchens, delivered.

An animated, highly interactive food-delivery web app featuring real Bangalore restaurants, a fully working cart &amp; checkout, Clerk authentication, and Razorpay payments — wrapped in a playful neo-brutalist *"stickers on construction paper"* design system.

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)
![Lenis](https://img.shields.io/badge/Smooth_Scroll-Lenis-000000?style=for-the-badge)
![Status](https://img.shields.io/badge/status-learning_project-a3e635?style=for-the-badge)

</div>

---

## ✨ Features

🛵 **Real Bengaluru restaurants** — 12 iconic kitchens (MTR, Meghana Foods, Vidyarthi Bhavan, Empire, CTR, Brahmin's, Toit, Corner House, Nagarjuna, Koshy's, Karavalli &amp; more) with signature dishes and authentic ₹ pricing.

🍽️ **Fully functional ordering** — tap any restaurant → animated menu modal → add dishes with quantity steppers → a live cart with a real bill breakdown (item total + delivery + packing + 5% GST) → checkout.

🔐 **Authentication** — sign up / sign in powered by [Clerk](https://clerk.com), with a user avatar menu and session handling. Customer details auto-prefill at checkout.

💳 **Payments** — [Razorpay](https://razorpay.com) Standard Checkout (UPI, cards, netbanking, wallets) in test mode, with optional serverless functions for the secure server-order &amp; signature-verification flow.

🎬 **Premium motion** — parallax hero illustrations (GSAP ScrollTrigger), infinitely floating cards, scroll-reveal sections, animated category filters, count-up stats, and buttery [Lenis](https://lenis.darkroom.engineering) smooth scrolling.

📱 **Responsive &amp; accessible** — mobile-first, zero horizontal overflow across breakpoints, `prefers-reduced-motion` aware, ARIA labels, and veg / non-veg indicators throughout.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite 5 |
| **Animation** | Framer Motion 11 · GSAP 3 (ScrollTrigger) |
| **Smooth scroll** | Lenis |
| **Authentication** | @clerk/react |
| **Payments** | Razorpay Standard Checkout |
| **Styling** | Plain CSS with the *Brainfish* design tokens (CSS custom properties) |
| **Imagery** | Unsplash (responsive, lazy-loaded) |
| **Testing** | Puppeteer end-to-end smoke tests |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/harshit-tapacademy/foodApp.git
cd foodApp

# 2. Install dependencies
npm install

# 3. Add your keys (see below)
cp .env.example .env.local   # then fill in your keys

# 4. Run the dev server
npm run dev                  # → http://localhost:5173

# 5. Production build
npm run build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env.local` file (already gitignored) in the project root:

| Variable | Where it lives | Description |
|----------|----------------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend ✅ public | Clerk publishable key — [dashboard.clerk.com](https://dashboard.clerk.com) → API Keys → React |
| `VITE_RAZORPAY_KEY_ID` | Frontend ✅ public | Razorpay **Key ID** (`rzp_test_…`) — [dashboard.razorpay.com](https://dashboard.razorpay.com) → API Keys |
| `RAZORPAY_KEY_ID` | Server only 🔒 | For the optional `/api` functions (set in your host's env, **never** in the repo) |
| `RAZORPAY_KEY_SECRET` | Server only 🔒 | Razorpay secret — used server-side to create orders &amp; verify signatures |

> ⚠️ **Security:** Publishable / Key IDs are safe in the frontend. The Razorpay **Key Secret** must *only* ever live in your hosting dashboard's environment variables — never commit it.

---

## 🗂️ Project Structure

```
foodApp/
├── api/                        # Optional serverless functions (Vercel/Netlify)
│   ├── razorpay-order.mjs       # create a Razorpay order (server-side, secret key)
│   └── razorpay-verify.mjs      # verify the payment signature (HMAC-SHA256)
├── e2e/                        # Puppeteer end-to-end smoke tests
│   ├── smoke.mjs
│   └── clerk-check.mjs
├── src/
│   ├── App.jsx                 # Lenis smooth scroll + section composition
│   ├── main.jsx                # <ClerkProvider> root
│   ├── cart.jsx                # cart store (items, totals, modal + drawer state, toast)
│   ├── razorpay.js             # checkout.js loader + order helper
│   ├── data.js                 # restaurants, dishes, ₹ pricing, reviews, stats
│   ├── index.css               # Brainfish design system + component styles
│   └── components/
│       ├── Nav, Hero, LogoStrip, HowItWorks, Menu,
│       ├── Stats, Restaurants, Reviews, Download, Footer
│       ├── RestaurantModal.jsx # menu view + add to cart
│       ├── CartDrawer.jsx      # cart, bill, Razorpay checkout
│       └── VegDot, icons, primitives
└── vite.config.js
```

---

## 🎨 Design System — *Brainfish*

A neo-brutalist *"stickers on construction paper"* aesthetic:

- 🟢 **Lime `#a3e635`** as the single action color
- ⬛ **Hard offset shadows** (`2px 2px 0 0`, zero blur) on every interactive surface
- 💊 **Pill silhouettes** (100px radius) for nav, buttons &amp; badges
- 🌊 **Full-bleed pastel bands** (sky, meadow, cobalt) split by wavy SVG dividers
- ✏️ **Line-art illustrations** scattered as playful furniture

---

## 🧪 Testing

End-to-end smoke tests run a real headless browser through the full flow — open a restaurant, add to cart, checkout, and check 3 viewports for responsiveness and console errors:

```bash
node e2e/smoke.mjs        # full order flow + responsiveness
node e2e/clerk-check.mjs  # verifies Clerk initializes with no errors
```

---

## 🌐 Deployment

The app builds to a static `dist/` and deploys anywhere (Vercel, Netlify, GitHub Pages). For Razorpay's secure server flow, deploy on a host that supports the `/api` serverless functions (Vercel / Netlify) and set `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` in the host's env.

```bash
npm run build   # outputs dist/
```

---

<div align="center">

### 🙌 Built as a learning project

Restaurant names &amp; details are real Bengaluru institutions, used for educational purposes.
Razorpay &amp; Clerk run in **test mode** — no real payments are processed.

*Made with hungry hands in Bengaluru* 🛵💨

</div>
