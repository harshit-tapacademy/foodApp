import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../cart.jsx'
import { formatINR } from '../data.js'
import VegDot from './VegDot.jsx'

export default function RestaurantModal() {
  const { activeRestaurant: r, closeRestaurant, addItem, items, inc, dec, openCart } = useCart()

  // lock body scroll while open
  useEffect(() => {
    if (r) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [r])

  // esc to close
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeRestaurant()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeRestaurant])

  const qtyOf = (rest, dishId) => {
    const it = items.find((i) => i.key === `${rest.id}:${dishId}`)
    return it ? it.qty : 0
  }

  return (
    <AnimatePresence>
      {r && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeRestaurant}
        >
          <motion.div
            className="modal"
            role="dialog" aria-modal="true" aria-label={`${r.name} menu`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={closeRestaurant} aria-label="Close">✕</button>

            <div className="modal__hero">
              <img src={r.cover} alt={r.name} />
              <div className="modal__heroOverlay" />
              <div className="modal__heroInfo">
                {r.rank <= 3 && <span className="rank-badge">#{r.rank} Most ordered</span>}
                <h2>{r.name}</h2>
                <p>{r.cuisine} · {r.area}</p>
              </div>
            </div>

            <div className="modal__meta">
              <span className="meta-pill meta-pill--rating">★ {r.rating}</span>
              <span className="meta-pill">{r.time}</span>
              <span className="meta-pill">{formatINR(r.costForTwo)} for two</span>
              <span className="meta-pill">Since {r.since}</span>
            </div>

            <p className="modal__blurb">{r.blurb}</p>

            <div className="modal__menu">
              <h3 className="modal__menuTitle">Menu</h3>
              {r.menu.map((d) => {
                const q = qtyOf(r, d.id)
                return (
                  <div className="menu-row" key={d.id}>
                    <div className="menu-row__info">
                      <div className="menu-row__top">
                        <VegDot veg={d.veg} />
                        {d.popular && <span className="bestseller">★ Bestseller</span>}
                      </div>
                      <h4>{d.name}</h4>
                      <span className="menu-row__price">{formatINR(d.price)}</span>
                      <p className="menu-row__desc">{d.desc}</p>
                    </div>
                    <div className="menu-row__media">
                      <img src={d.img} alt={d.name} loading="lazy" />
                      {q === 0 ? (
                        <button className="btn btn--lime btn--add menu-row__add" onClick={() => addItem(d, r)}>
                          ADD +
                        </button>
                      ) : (
                        <div className="stepper menu-row__add">
                          <button onClick={() => dec(`${r.id}:${d.id}`)} aria-label="Remove one">−</button>
                          <span>{q}</span>
                          <button onClick={() => inc(`${r.id}:${d.id}`)} aria-label="Add one">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="modal__foot">
              <button className="btn btn--lime btn--lg" onClick={() => { closeRestaurant(); openCart() }}>
                View cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
