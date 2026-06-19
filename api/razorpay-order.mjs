// Optional serverless function (Vercel / Netlify-compatible) — POST /api/razorpay-order
// Creates a Razorpay order server-side so the amount is trusted and the Key Secret
// never reaches the browser. The frontend (src/razorpay.js → createOrder) calls this
// best-effort and falls back to an amount-only test checkout if it's not deployed.
//
// Required server env vars (set in your host dashboard — NEVER in frontend / .env.local):
//   RAZORPAY_KEY_ID
//   RAZORPAY_KEY_SECRET
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: 'Razorpay server keys not configured' })
  }

  const { amount, currency = 'INR' } = req.body || {}
  if (!amount || amount < 100) return res.status(400).json({ error: 'Invalid amount (paise)' })

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')
  const r = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ amount, currency, receipt: `rcpt_${Date.now()}` }),
  })
  const data = await r.json()
  if (!r.ok) return res.status(r.status).json(data)
  return res.status(200).json(data) // { id: "order_...", amount, currency, ... }
}
