import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Chip, Wave } from './primitives.jsx'
import { PinIcon, Cloud, Burger, Fish } from './icons.jsx'

gsap.registerPlugin(ScrollTrigger)

// infinite gentle float for the badge cards (still when reduced motion is requested)
const floatAnim = (dur, delay = 0, reduce = false) =>
  reduce
    ? { animate: { y: 0, rotate: 0 } }
    : {
        animate: { y: [0, -14, 0], rotate: [0, 1.5, 0] },
        transition: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
      }

export default function Hero() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  // GSAP parallax drift on the line-art as you scroll
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.float').forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 ? 120 : -90),
          x: (i % 2 ? -40 : 30),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section className="hero" id="top" ref={root}>
      <Cloud className="float" style={{ width: 90, top: '14%', left: '8%' }} />
      <Cloud className="float" style={{ width: 64, top: '24%', right: '12%' }} />
      <Burger className="float" style={{ width: 64, top: '60%', left: '5%' }} />
      <Fish className="float" style={{ width: 60, top: '40%', right: '7%' }} />

      <div className="container hero__inner">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Chip>Now delivering across Bengaluru 🛵</Chip>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Namma food.<br />Zero&nbsp;wait.
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
        >
          From MTR's dosas to Meghana's biryani — order Bengaluru's most iconic kitchens
          and watch it cruise to your door in 30 minutes or less.
        </motion.p>

        <motion.form
          className="hero__order" id="order" onSubmit={(e) => { e.preventDefault(); document.getElementById('restaurants')?.scrollIntoView() }}
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
        >
          <div className="hero__input">
            <PinIcon />
            <input type="text" placeholder="Koramangala, Indiranagar, Jayanagar…" aria-label="Delivery address" defaultValue="Indiranagar, Bengaluru" />
          </div>
          <button className="btn btn--lime btn--lg" type="submit">Find food</button>
        </motion.form>

        <motion.div
          className="hero__trust"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          <div className="hero__avatars" aria-hidden="true">
            {['1438761681033-6461ffad8d80', '1500648767791-00dcc994a43e', '1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d'].map((id) => (
              <img key={id} src={`https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop&q=80`} alt="" />
            ))}
          </div>
          <p><strong>2 lakh+</strong> Bengalureans served · <span className="stars">★★★★★</span> 4.9</p>
        </motion.div>
      </div>

      <div className="container">
        <motion.figure
          className="hero__mockup"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="hero__badge hero__badge--a" {...floatAnim(5, 0, reduceMotion)}>
            <span className="emoji">🍛</span>
            <span>Meghana Foods<small>30 min · ★ 4.5</small></span>
          </motion.div>
          <motion.div className="hero__badge hero__badge--b" {...floatAnim(6, 0.6, reduceMotion)}>
            <span className="emoji">🛵</span>
            <span>On the way!<small>Arriving in 4 min</small></span>
          </motion.div>
          <motion.div className="hero__badge hero__badge--c" {...floatAnim(5.5, 1, reduceMotion)}>
            <span className="emoji">🪔</span>
            <span>MTR Rava Idli<small>₹110 · Bestseller</small></span>
          </motion.div>

          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dot" /><span className="browser__dot" /><span className="browser__dot" />
              <span className="browser__url">app.forkfleet.com/order</span>
            </div>
            <img
              className="browser__shot"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=560&fit=crop&q=80"
              alt="A spread of freshly prepared dishes in the ForkFleet app"
              loading="lazy"
            />
          </div>
        </motion.figure>
      </div>

      <Wave fill="#ffffff" position="bottom" />
    </section>
  )
}
