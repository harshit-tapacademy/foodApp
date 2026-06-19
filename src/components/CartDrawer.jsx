import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../cart.jsx'
import { formatINR, DELIVERY_FEE, PACKING_FEE, GST_RATE } from '../data.js'
import VegDot from './VegDot.jsx'

export default function CartDrawer() {
  const { cartOpen, closeCart, items, inc, dec, removeItem, subtotal, clear, ping } = useCart()
  const [placed, setPlaced] = useState(false)

  useEffect(() => { if (cartOpen) setPlaced(false) }, [cartOpen])

  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE + PACKING_FEE + gst : 0

  const checkout = () => {
    setPlaced(true)
    clear()
    ping('Order placed! 🛵')
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="drawer"
            role="dialog" aria-label="Your cart"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            <div className="drawer__head">
              <h3>Your order</h3>
              <button className="drawer__close" onClick={closeCart} aria-label="Close cart">✕</button>
            </div>

            {placed ? (
              <div className="drawer__empty">
                <div className="drawer__bigemoji">🛵</div>
                <h4>Order placed!</h4>
                <p>Your food is being prepared and will reach you shortly. Track it live in the app.</p>
                <button className="btn btn--lime btn--lg" onClick={closeCart}>Done</button>
              </div>
            ) : items.length === 0 ? (
              <div className="drawer__empty">
                <div className="drawer__bigemoji">🍽️</div>
                <h4>Your cart is empty</h4>
                <p>Add dishes from your favourite Bengaluru restaurants to get started.</p>
                <button className="btn btn--lime btn--lg" onClick={closeCart}>Browse restaurants</button>
              </div>
            ) : (
              <>
                <div className="drawer__items">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.div
                        key={i.key}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="cart-item__info">
                          <div className="cart-item__name"><VegDot veg={i.veg} /> <span>{i.name}</span></div>
                          <span className="cart-item__rest">{i.restName}</span>
                        </div>
                        <div className="stepper">
                          <button onClick={() => dec(i.key)} aria-label="Decrease">−</button>
                          <span>{i.qty}</span>
                          <button onClick={() => inc(i.key)} aria-label="Increase">+</button>
                        </div>
                        <span className="cart-item__price">{formatINR(i.price * i.qty)}</span>
                        <button className="cart-item__del" onClick={() => removeItem(i.key)} aria-label={`Remove ${i.name}`}>✕</button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="drawer__bill">
                  <div className="bill-row"><span>Item total</span><span>{formatINR(subtotal)}</span></div>
                  <div className="bill-row"><span>Delivery fee</span><span>{formatINR(DELIVERY_FEE)}</span></div>
                  <div className="bill-row"><span>Packing charges</span><span>{formatINR(PACKING_FEE)}</span></div>
                  <div className="bill-row"><span>GST (5%)</span><span>{formatINR(gst)}</span></div>
                  <div className="bill-row bill-row--total"><span>To pay</span><span>{formatINR(total)}</span></div>
                </div>

                <div className="drawer__foot">
                  <button className="btn btn--lime btn--lg drawer__checkout" onClick={checkout}>
                    Place order · {formatINR(total)}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
