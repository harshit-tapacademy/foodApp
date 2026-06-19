import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/react'
import { useCart } from '../cart.jsx'
import { formatINR, DELIVERY_FEE, PACKING_FEE, GST_RATE } from '../data.js'
import { loadRazorpay, createOrder } from '../razorpay.js'
import VegDot from './VegDot.jsx'

const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID

export default function CartDrawer() {
  const { cartOpen, closeCart, items, inc, dec, removeItem, subtotal, clear, ping } = useCart()
  const { user } = useUser()
  const [placed, setPlaced] = useState(false)
  const [paymentId, setPaymentId] = useState(null)
  const [paying, setPaying] = useState(false)

  useEffect(() => { if (cartOpen) { setPlaced(false); setPaymentId(null) } }, [cartOpen])

  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE + PACKING_FEE + gst : 0

  const onSuccess = (rzpPaymentId) => {
    setPaymentId(rzpPaymentId || null)
    setPlaced(true)
    clear()
    ping('Payment successful! 🛵')
  }

  const checkout = async () => {
    if (!RZP_KEY || RZP_KEY.includes('REPLACE')) {
      ping('Add your Razorpay Key ID to .env.local')
      return
    }
    setPaying(true)
    const ready = await loadRazorpay()
    if (!ready) { setPaying(false); ping('Could not reach Razorpay. Check your connection.'); return }

    const amountPaise = total * 100
    const orderId = await createOrder(amountPaise) // null on static/test (no backend)

    const rzp = new window.Razorpay({
      key: RZP_KEY,
      amount: amountPaise,
      currency: 'INR',
      name: 'ForkFleet',
      description: `${items.length} item(s) from ${items[0]?.restName || 'Bengaluru'}`,
      ...(orderId ? { order_id: orderId } : {}),
      prefill: {
        name: user?.fullName || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        contact: user?.primaryPhoneNumber?.phoneNumber || '',
      },
      notes: { items: items.map((i) => `${i.qty}× ${i.name}`).join(', '), area: items[0]?.restName },
      theme: { color: '#3366e0' },
      handler: (resp) => { setPaying(false); onSuccess(resp.razorpay_payment_id) },
      modal: { ondismiss: () => { setPaying(false); ping('Payment cancelled') } },
    })
    rzp.on('payment.failed', (resp) => {
      setPaying(false)
      ping('Payment failed: ' + (resp.error?.description || 'try again'))
    })
    rzp.open()
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
                <p>Payment received. Your food is being prepared and will reach you shortly. Track it live in the app.</p>
                {paymentId && <span className="payment-id">Payment ID: {paymentId}</span>}
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
                  <button className="btn btn--lime btn--lg drawer__checkout" onClick={checkout} disabled={paying}>
                    {paying ? 'Opening payment…' : `Pay ${formatINR(total)}`}
                  </button>
                  <p className="drawer__secure">🔒 Secured by Razorpay · UPI, cards, netbanking</p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
