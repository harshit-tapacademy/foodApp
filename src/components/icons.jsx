// Inline line-art icons & decorative SVGs (1.5–2px black stroke, Brainfish style)
const s = { fill: 'none', stroke: '#000', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const ForkLogo = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...s} {...p}>
    <path d="M5 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
    <path d="M7 12v9" />
    <path d="M17 3c-1.5 1-2.5 3-2.5 5.5S15.5 13 17 13v8" />
  </svg>
)

export const CartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...s} {...p}>
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
)

export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...s} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
)
export const TruckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...s} {...p}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
)

// decorative floats
export const Cloud = (p) => (
  <svg viewBox="0 0 90 50" {...p}><path d="M20 38c-9 0-15-6-15-13s6-12 14-12c2-7 9-11 16-11 9 0 16 6 17 14 7 0 11 5 11 11s-5 11-13 11Z" fill="#fff" stroke="#000" strokeWidth="2" /></svg>
)
export const Burger = (p) => (
  <svg viewBox="0 0 60 50" {...p}>
    <path d="M8 20c0-9 10-15 22-15s22 6 22 15Z" fill="#fbbf25" stroke="#000" strokeWidth="2" />
    <path d="M6 28h48M6 28c0 4 3 6 7 6h34c4 0 7-2 7-6" stroke="#000" strokeWidth="2" fill="none" />
    <path d="M8 38c0 5 5 8 12 8h20c7 0 12-3 12-8Z" fill="#a3e635" stroke="#000" strokeWidth="2" />
  </svg>
)
export const Fish = (p) => (
  <svg viewBox="0 0 60 40" {...p}>
    <path d="M5 20c8-12 28-16 40-8 5-4 10-5 12-5-2 4-2 8 0 12-2 0-7-1-12-5C33 28 13 24 5 20Z" fill="#fff" stroke="#000" strokeWidth="2" />
    <circle cx="18" cy="18" r="1.6" fill="#000" />
  </svg>
)
