import { motion } from 'framer-motion'
import { Wave, stagger, item } from './primitives.jsx'
import { partners } from '../data.js'

export default function LogoStrip() {
  return (
    <section className="logos">
      <Wave fill="#b9f0c0" position="top" />
      <div className="container logos__inner">
        <p className="logos__label">Trusted by kitchens across the city</p>
        <motion.ul
          className="logos__row"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {partners.map((p) => (
            <motion.li key={p} variants={item}>{p}</motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
