import puppeteer from 'puppeteer'
const errors = [], failed = []
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))
page.on('requestfailed', r => failed.push(r.url()))
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise(r => setTimeout(r, 2500))
// did Clerk render the auth buttons?
const buttons = await page.$$eval('button', els => els.map(e => e.textContent.trim()))
const hasSignIn = buttons.some(t => /sign in/i.test(t))
const hasSignUp = buttons.some(t => /sign up/i.test(t))
// open sign-up modal to confirm Clerk mounts its UI
let modalMounted = false
try {
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /sign up/i.test(b.textContent))?.click())
  await new Promise(r => setTimeout(r, 2500))
  modalMounted = await page.evaluate(() => !!document.querySelector('.cl-rootBox, .cl-modalContent, [data-clerk-modal], .cl-card'))
} catch {}
console.log(JSON.stringify({
  clerkErrors: errors.filter(e => /clerk|publishable/i.test(e)),
  totalConsoleErrors: errors.length,
  failedRequests: failed.filter(u => !u.includes('favicon')).length,
  hasSignIn, hasSignUp, modalMounted,
  sampleErrors: errors.slice(0, 4),
}, null, 2))
await browser.close()
