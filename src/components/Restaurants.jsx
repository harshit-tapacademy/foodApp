import { motion } from 'framer-motion'
import { Chip, stagger, item } from './primitives.jsx'
import { restaurants, formatINR } from '../data.js'
import { useCart } from '../cart.jsx'

export default function Restaurants() {
  const { openRestaurant } = useCart()

  return (
    <section className="section section--tint" id="restaurants">
      <div className="container">
        <div className="section__head">
          <Chip>Bengaluru favourites</Chip>
          <h2 className="section__title">The city's most-loved restaurants</h2>
          <p className="section__lead">From MTR's century-old dosas to Meghana's legendary biryani — tap any spot to see its menu and order.</p>
        </div>

        <motion.div
          className="grid grid--3"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        >
          {restaurants.map((r) => (
            <motion.article
              key={r.id}
              className="resto"
              variants={item}
              whileHover={{ y: -6, boxShadow: 'rgb(10,10,13) 5px 5px 0px 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => openRestaurant(r)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openRestaurant(r))}
              aria-label={`View ${r.name} menu`}
            >
              <div className="resto__media">
                <img src={r.cover} alt={r.name} loading="lazy" />
                {r.rank <= 3 && <span className="resto__rank">#{r.rank} Most ordered</span>}
                <span className="resto__badge">★ {r.rating} · {r.time}</span>
              </div>
              <div className="resto__body">
                <h3 className="resto__name">{r.name}</h3>
                <p className="resto__meta">{r.cuisine} · {r.area}</p>
                <div className="resto__tags">
                  {r.tags.slice(0, 2).map((t) => <span key={t} className="pill-tag">{t}</span>)}
                  <span className="pill-tag pill-tag--cost">{formatINR(r.costForTwo)} for two</span>
                </div>
                <span className="resto__cta">View menu →</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
