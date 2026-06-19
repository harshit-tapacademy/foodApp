# 🍱 ForkFleet — Hot food, zero wait

An animated, highly interactive food-delivery marketing site built in the **Brainfish** neo-brutalist "stickers on construction paper" design system — white canvas, a single lime-green accent, full-bleed pastel bands, hard offset shadows (zero blur), and pill silhouettes.

## ✨ Highlights

- **Sticker nav** that shrinks on scroll, with a mobile slide-down sheet
- **Parallax hero** — line-art burger / fish / clouds drift on scroll (GSAP ScrollTrigger) with infinitely floating order-status cards (Framer Motion)
- **Scroll-reveal sections** with staggered card entrances
- **Live category filter** on the menu with smooth layout/exit animations
- **Animated count-up** stats
- **Tilted testimonial cards** that settle into place and straighten on hover
- **Cart toast** with spring animation
- **Lenis** buttery smooth-scroll throughout
- Fully **responsive** + `prefers-reduced-motion` aware

## 🧱 Tech stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Animation | Framer Motion |
| Scroll parallax | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Styling | Plain CSS with Brainfish design tokens (CSS custom properties) |
| Imagery | Unsplash (hotlinked, responsive, lazy-loaded) |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## 📁 Structure

```
src/
  App.jsx            # Lenis smooth scroll + section composition
  cart.jsx           # cart context + animated toast
  data.js            # dishes, restaurants, reviews, stats
  index.css          # Brainfish design system + component styles
  components/
    Nav, Hero, LogoStrip, HowItWorks, Menu,
    Stats, Restaurants, Reviews, Download, Footer
    icons.jsx        # inline line-art SVGs
    primitives.jsx   # Reveal, Chip, Wave, stagger variants
```

Built with hungry hands. 🛵
