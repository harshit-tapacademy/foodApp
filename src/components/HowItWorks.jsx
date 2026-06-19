import { motion } from 'framer-motion'
import { Chip, stagger, item } from './primitives.jsx'
import { SearchIcon, CartIcon, TruckIcon } from './icons.jsx'

const steps = [
  { cls: 'info-card--yellow', icon: <SearchIcon />, step: 'Step 1', title: 'Browse nearby', body: "Discover restaurants, dishes, and deals around you, ranked by what's hottest right now." },
  { cls: 'info-card--mint', icon: <CartIcon width="24" height="24" />, step: 'Step 2', title: 'Order in seconds', body: 'Build your cart, apply a coupon, and pay in a tap. Saved cards and addresses keep it quick.' },
  { cls: 'info-card--lilac', icon: <TruckIcon />, step: 'Step 3', title: 'Track to your door', body: "Follow your rider on a live map and get a ping the moment they're knocking. Still piping hot." },
]

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section__head">
          <Chip>How it works</Chip>
          <h2 className="section__title">Three taps to a full plate</h2>
          <p className="section__lead">No phone calls, no waiting on hold. Just food you love, on its way.</p>
        </div>

        <motion.div
          className="grid grid--3"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((s) => (
            <motion.article
              key={s.step}
              className={`info-card ${s.cls}`}
              variants={item}
              whileHover={{ y: -6, boxShadow: 'rgb(10,10,13) 4px 4px 0px 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="info-card__icon">{s.icon}</span>
              <span className="info-card__step">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
