import { motion } from 'framer-motion'
import { Chip, Wave } from './primitives.jsx'
import { reviews } from '../data.js'

const tiltMap = { 'quote--tl': -2, 'quote--tr': 1.5, 'quote--tl2': -1 }

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <Wave fill="#3366e0" position="top" />
      <div className="container">
        <div className="section__head section__head--light">
          <Chip onBlue>Loved by eaters</Chip>
          <h2 className="section__title section__title--light">People are full and happy</h2>
        </div>

        <div className="grid grid--3 reviews__grid">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              className={`quote ${r.tilt}`}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: tiltMap[r.tilt] }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -6, boxShadow: 'rgb(23,23,23) 6px 6px 0px 0px' }}
            >
              <div className="quote__head">
                <img className="quote__logo" src={r.avatar} alt="" />
                <span>{r.name}<small style={{ display: 'block', fontWeight: 500, fontSize: 13, color: 'var(--color-steel)' }}>{r.area}</small></span>
              </div>
              <blockquote>"{r.text}"</blockquote>
              <div className="quote__stats">
                {r.stats.map((s) => (
                  <div key={s.label} className="mini-stat">
                    <span className="mini-stat__num">{s.num}{s.unit && <small>{s.unit}</small>}</span>
                    <span className="mini-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
      <Wave fill="#fef3c8" position="bottom" />
    </section>
  )
}
