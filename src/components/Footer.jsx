import { ForkLogo } from './icons.jsx'

const cols = [
  ['Company', ['About us', 'Careers', 'Press', 'Blog']],
  ['Partners', ['Add your restaurant', 'Become a rider', 'Business']],
  ['Support', ['Help centre', 'Contact', 'Terms', 'Privacy']],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="nav__brand" href="#top">
            <span className="nav__logo"><ForkLogo /></span>ForkFleet
          </a>
          <p>Hot food, zero wait. Delivering happiness from local kitchens to your door.</p>
        </div>
        {cols.map(([title, links]) => (
          <nav className="footer__col" key={title} aria-label={title}>
            <h4>{title}</h4>
            {links.map((l) => <a key={l} href="#">{l}</a>)}
          </nav>
        ))}
      </div>
      <div className="container footer__base">
        <span>© 2026 ForkFleet. Made with hungry hands.</span>
        <span className="footer__social">
          <a href="#">Twitter</a><a href="#">Instagram</a><a href="#">TikTok</a>
        </span>
      </div>
    </footer>
  )
}
