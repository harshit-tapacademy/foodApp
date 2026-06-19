import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { key, id, name, price, veg, restId, restName, qty }
  const [cartOpen, setCartOpen] = useState(false)
  const [activeRestaurant, setActiveRestaurant] = useState(null)
  const [toast, setToast] = useState(null)
  const timer = useRef()

  const ping = useCallback((msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2000)
  }, [])

  const addItem = useCallback((dish, rest) => {
    const key = `${rest.id}:${dish.id}`
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { key, id: dish.id, name: dish.name, price: dish.price, veg: dish.veg, restId: rest.id, restName: rest.name, qty: 1 }]
    })
    ping(`Added ${dish.name}`)
  }, [ping])

  const inc = useCallback((key) =>
    setItems((p) => p.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))), [])

  const dec = useCallback((key) =>
    setItems((p) => p.flatMap((i) => (i.key === key ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))), [])

  const removeItem = useCallback((key) =>
    setItems((p) => p.filter((i) => i.key !== key)), [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((n, i) => n + i.qty * i.price, 0), [items])

  const openRestaurant = useCallback((rest) => setActiveRestaurant(rest), [])
  const closeRestaurant = useCallback(() => setActiveRestaurant(null), [])

  const value = {
    items, addItem, inc, dec, removeItem, clear, count, subtotal,
    cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
    activeRestaurant, openRestaurant, closeRestaurant, ping,
  }

  return (
    <CartCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 24, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 24, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <span className="toast__dot" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </CartCtx.Provider>
  )
}
