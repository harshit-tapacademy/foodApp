import { useEffect } from 'react'
import Lenis from 'lenis'
import { CartProvider } from './cart.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Menu from './components/Menu.jsx'
import Stats from './components/Stats.jsx'
import Restaurants from './components/Restaurants.jsx'
import Reviews from './components/Reviews.jsx'
import Download from './components/Download.jsx'
import Footer from './components/Footer.jsx'
import RestaurantModal from './components/RestaurantModal.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  // Lenis smooth inertia scrolling + anchor-link smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -90 }) }
    }
    document.addEventListener('click', onClick)

    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', onClick) }
  }, [])

  return (
    <CartProvider>
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <Menu />
        <Stats />
        <Restaurants />
        <Reviews />
        <Download />
      </main>
      <Footer />
      <RestaurantModal />
      <CartDrawer />
    </CartProvider>
  )
}
