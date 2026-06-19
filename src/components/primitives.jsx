import { motion } from 'framer-motion'

// Scroll-reveal wrapper — fades + lifts into place once, when scrolled into view.
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

// Staggered container + item for grids
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
export const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function Chip({ children, onBlue }) {
  return (
    <span className={`chip${onBlue ? ' chip--onblue' : ''}`}>
      <span className="chip__dot" />
      {children}
    </span>
  )
}

// Wavy SVG band divider
export function Wave({ fill, position = 'bottom' }) {
  const d =
    position === 'bottom'
      ? 'M0 40c180 40 360 40 540 16s360-56 540-40 240 56 360 48v56H0Z'
      : 'M0 30c160-36 320-36 520-10s380 44 560 22 260-40 360-30v58H0Z'
  const vb = position === 'bottom' ? '0 0 1440 80' : '0 0 1440 70'
  return (
    <svg className={`wave wave--${position}`} viewBox={vb} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill={fill} />
    </svg>
  )
}
