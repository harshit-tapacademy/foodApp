import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Chip } from './primitives.jsx'
import { popularDishes, cuisineFilters, restaurantById, formatINR } from '../data.js'
import { useCart } from '../cart.jsx'
import VegDot from './VegDot.jsx'

// map a dish to a filter bucket via its restaurant cuisine/tags
const matches = (dish, key) => {
  if (key === 'all') return true
  const r = restaurantById[dish.restId]
  return r.cuisine.includes(key) || r.tags.includes(key)
}

export default function Menu() {
  const [active, setActive] = useState('all')
  const { addItem, openRestaurant } = useCart()
  const shown = popularDishes.filter((d) => matches(d, active))

  return (
    <section className="section section--tint" id="menu">
      <div className="container">
        <div className="section__head">
          <Chip>Signature dishes</Chip>
          <h2 className="section__title">Bengaluru's most-ordered plates</h2>
          <p className="section__lead">The dishes that built reputations. Add to cart, or tap a card to open the full menu.</p>
        </div>

        <div className="filters" role="tablist" aria-label="Cuisine filters">
          {cuisineFilters.map((f) => (
            <button
              key={f.key}
              className={`filter${active === f.key ? ' is-active' : ''}`}
              onClick={() => setActive(f.key)}
              role="tab" aria-selected={active === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid--4 dishes">
            <AnimatePresence mode="popLayout">
              {shown.map((d) => (
                <motion.article
                  key={`${d.restId}:${d.id}`}
                  className="dish"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: 'rgb(10,10,13) 5px 5px 0px 0px' }}
                  onClick={() => openRestaurant(restaurantById[d.restId])}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter') && openRestaurant(restaurantById[d.restId])}
                >
                  <div className="dish__media">
                    <img src={d.img} alt={d.name} loading="lazy" />
                    <span className="dish__tag"><VegDot veg={d.veg} /> Bestseller</span>
                  </div>
                  <div className="dish__body">
                    <span className="dish__cat">{d.restName} · {d.area}</span>
                    <h3 className="dish__name">{d.name}</h3>
                    <div className="dish__row">
                      <span className="dish__price">{formatINR(d.price)}</span>
                      <button
                        className="btn btn--lime btn--add"
                        onClick={(e) => { e.stopPropagation(); addItem(d, restaurantById[d.restId]) }}
                        aria-label={`Add ${d.name} to cart`}
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
