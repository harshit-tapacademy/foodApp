import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { ForkLogo, CartIcon } from './icons.jsx'
import { useCart } from '../cart.jsx'

const links = [
  ['How it works', '#how'],
  ['Menu', '#menu'],
  ['Restaurants', '#restaurants'],
  ['Reviews', '#reviews'],
]

export default function Nav() {
  const [shrink, setShrink] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="nav-wrap"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className={`nav${shrink ? ' nav--shrink' : ''}`} aria-label="Primary">
          <a className="nav__brand" href="#top">
            <span className="nav__logo"><ForkLogo /></span>ForkFleet
          </a>

          <ul className="nav__links">
            {links.map(([label, href]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>

          <div className="nav__cta">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="btn btn--ghost nav__signin">Sign in</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn--lime nav__signup">Sign up</button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <span className="nav__user"><UserButton afterSignOutUrl="/" /></span>
            </Show>
            <button className="btn btn--lime" onClick={openCart} aria-label="Open cart">
              <CartIcon /> Cart{count > 0 ? ` · ${count}` : ''}
            </button>
            <button
              className="nav__burger"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="nav-sheet__panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
              ))}
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <a href="#" onClick={() => setOpen(false)}>Sign in</a>
                </SignInButton>
                <SignUpButton mode="modal">
                  <a href="#" onClick={() => setOpen(false)}>Sign up</a>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="nav-sheet__user"><UserButton afterSignOutUrl="/" /> <span>My account</span></div>
              </Show>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
