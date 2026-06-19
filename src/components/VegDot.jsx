// Indian-style veg / non-veg square indicator
export default function VegDot({ veg }) {
  const color = veg ? '#2a8c4a' : '#c0392b'
  return (
    <span
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      title={veg ? 'Veg' : 'Non-veg'}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 16, height: 16, border: `1.5px solid ${color}`, borderRadius: 3, flexShrink: 0,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
    </span>
  )
}
