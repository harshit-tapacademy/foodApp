// Loads the Razorpay Standard Checkout script once and resolves when ready.
const SRC = 'https://checkout.razorpay.com/v1/checkout.js'
let loader

export function loadRazorpay() {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve(true)
  if (loader) return loader
  loader = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => { loader = null; resolve(false) }
    document.body.appendChild(s)
  })
  return loader
}

// Best-effort: ask an optional serverless function to create a Razorpay order
// (server holds the Key Secret). Returns the order id, or null if no backend.
export async function createOrder(amountPaise, currency = 'INR') {
  try {
    const res = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountPaise, currency }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.id || null
  } catch {
    return null // no backend (e.g. static dev/test) → fall back to amount-only test flow
  }
}
