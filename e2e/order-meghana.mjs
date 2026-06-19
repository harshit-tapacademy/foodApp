import puppeteer from 'puppeteer'

const log = (...a) => console.log(...a)
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
const errors = []
page.on('pageerror', e => errors.push(e.message))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 1500))

// helper: click an element matching a selector whose text includes `txt`
const clickByText = (sel, txt) => page.evaluate((sel, txt) => {
  const el = [...document.querySelectorAll(sel)].find(e => e.textContent.includes(txt))
  if (!el) return false
  el.click(); return true
}, sel, txt)

// 1) open Meghana Foods
log('→ Opening Meghana Foods…')
const opened = await clickByText('.resto', 'Meghana Foods')
if (!opened) throw new Error('Meghana card not found')
await page.waitForSelector('.modal', { visible: true })
await new Promise(r => setTimeout(r, 900))
const title = await page.$eval('.modal__heroInfo h2', e => e.textContent)
log('   Modal open:', title)

// 2) add the signature biryani to the cart (x2) + a gulab jamun
const addDish = (name) => page.evaluate((name) => {
  const row = [...document.querySelectorAll('.menu-row')].find(r => r.querySelector('h4')?.textContent.includes(name))
  if (!row) return false
  const add = row.querySelector('.btn--add') || row.querySelector('.stepper button:last-child')
  add.click(); return true
}, name)
const incDish = (name) => page.evaluate((name) => {
  const row = [...document.querySelectorAll('.menu-row')].find(r => r.querySelector('h4')?.textContent.includes(name))
  row.querySelector('.stepper button:last-child').click()
}, name)

log('→ Adding Special Boneless Chicken Biryani × 2')
await addDish('Special Boneless Chicken Biryani'); await new Promise(r => setTimeout(r, 400))
await incDish('Special Boneless Chicken Biryani'); await new Promise(r => setTimeout(r, 400))
log('→ Adding Gulab Jamun × 1')
await addDish('Gulab Jamun'); await new Promise(r => setTimeout(r, 400))

// 3) open the cart via the modal's "View cart"
log('→ Opening cart…')
await clickByText('.modal__foot .btn', 'View cart')
await page.waitForSelector('.drawer', { visible: true })
await new Promise(r => setTimeout(r, 900))

// read the items + bill
const order = await page.evaluate(() => {
  const items = [...document.querySelectorAll('.cart-item')].map(ci => ({
    name: ci.querySelector('.cart-item__name span')?.textContent,
    qty: ci.querySelector('.stepper span')?.textContent,
    price: ci.querySelector('.cart-item__price')?.textContent,
  }))
  const bill = {}
  document.querySelectorAll('.drawer__bill .bill-row').forEach(r => {
    const [k, v] = [...r.children].map(c => c.textContent)
    bill[k] = v
  })
  return { items, bill }
})
log('\n🧾 ORDER SUMMARY — Meghana Foods')
order.items.forEach(i => log(`   ${i.qty} ×  ${i.name}  →  ${i.price}`))
log('   ' + '-'.repeat(34))
Object.entries(order.bill).forEach(([k, v]) => log(`   ${k.padEnd(20)} ${v}`))
await page.screenshot({ path: 'e2e/order-cart.png' })

// 4) place the order
log('\n→ Placing order…')
await clickByText('.drawer__checkout', 'Place order')
await new Promise(r => setTimeout(r, 1500))
const success = await page.evaluate(() => {
  const h = document.querySelector('.drawer__empty h4')?.textContent
  const p = document.querySelector('.drawer__empty p')?.textContent
  return { h, p }
})
await page.screenshot({ path: 'e2e/order-placed.png' })
log('\n✅', success.h)
log('  ', success.p)
log('\n   pageErrors:', errors.length)
await browser.close()
