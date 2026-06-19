// Optional serverless function — POST /api/razorpay-verify
// Verifies the payment signature returned by Checkout, confirming the payment is
// authentic before you fulfil the order. Call this from the frontend `handler`
// (with razorpay_order_id, razorpay_payment_id, razorpay_signature) once you run
// the server-order flow. Uses HMAC-SHA256 with your Key Secret.
//
// Required server env var: RAZORPAY_KEY_SECRET
import crypto from 'node:crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { RAZORPAY_KEY_SECRET } = process.env
  if (!RAZORPAY_KEY_SECRET) return res.status(500).json({ error: 'Razorpay secret not configured' })

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment fields' })
  }

  const expected = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))
  return res.status(valid ? 200 : 400).json({ valid })
}
