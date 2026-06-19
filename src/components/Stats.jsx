import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Chip, stagger, item } from './primitives.jsx'
import { stats } from '../data.js'

// Counts up the numeric part of a label like "2,400+" or "98" when scrolled into view.
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')
  const match = value.match(/^([\d,]+)(.*)$/)
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    if (!inView || !match) { if (!match) setDisplay(value); return }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString() + suffix),
    })
    return () => controls.stop()
  }, [inView])

  return <span ref={ref}>{display}</span>
}

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className="stats-band">
          <div className="stats-band__copy">
            <Chip>Why ForkFleet</Chip>
            <h2 className="section__title">Built for hungry people in a hurry</h2>
            <p className="section__lead">A logistics engine and a love of good food, working together so your meal shows up fast and still perfect.</p>
          </div>
          <motion.div
            className="stats-band__grid"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                className="stat-card"
                variants={item}
                whileHover={{ y: -4, boxShadow: 'rgb(10,10,13) 4px 4px 0px 0px' }}
              >
                <span className="stat-card__num">
                  <CountUp value={s.num} />{s.unit && <small>{s.unit}</small>}
                </span>
                <span className="stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
