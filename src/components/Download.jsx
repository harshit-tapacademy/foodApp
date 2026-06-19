import { motion } from 'framer-motion'
import { Chip } from './primitives.jsx'
import { Fish } from './icons.jsx'

export default function Download() {
  return (
    <section className="download">
      <div className="container download__inner">
        <motion.div
          className="download__copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Chip>Get the app</Chip>
          <h2 className="section__title">Your next meal is one tap away</h2>
          <p className="section__lead">Download ForkFleet, drop your address, and let dinner come to you. First delivery is on us.</p>
          <form className="download__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@email.com" aria-label="Email address" />
            <button className="btn btn--lime btn--lg" type="submit">Send me the link</button>
          </form>
          <div className="download__badges">
            <span className="store-badge"> App Store</span>
            <span className="store-badge">▶ Google Play</span>
          </div>
        </motion.div>

        <motion.div
          className="download__art"
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{ position: 'absolute', top: -18, right: '8%', zIndex: 3 }}
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Fish style={{ width: 70 }} />
          </motion.div>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=620&h=620&fit=crop&q=80"
            alt="A fresh bowl ready to order in the ForkFleet app"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
