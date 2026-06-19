// ForkFleet — Bengaluru edition
// Real, famous Bangalore restaurants with signature dishes. Prices in INR (₹).
const img = (id, w = 600, h = 440) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`

// shared dish photos (all verified to load)
const P = {
  biryani: img('1563379091339-03b21ab4a4f8'),
  biryani2: img('1589302168068-964664d93dc0'),
  biryani3: img('1601050690597-df0568f70950'),
  biryani4: img('1633945274405-b6c8069047b0'),
  muttonCurry: img('1603894584373-5ac82b2ae398'),
  butterChicken: img('1588166524941-3bf61a9c41db'),
  curry: img('1585937421612-70a008356fbe'),
  paneer: img('1631452180519-c014fe946bc7'),
  dosa: img('1668236543090-82eba5ee5976'),
  dosa2: img('1630383249896-424e482df921'),
  dosa3: img('1631292784640-2b24be784d5d'),
  idliVada: img('1589301760014-d929f3979dbc'),
  vada: img('1630409351217-bc4fa6422075'),
  thali: img('1567188040759-fb8a883dc6d8'),
  coffee: img('1495474472287-4d71bcdd2085'),
  coffee2: img('1559314809-0d155014e29e'),
  burger: img('1568901346375-23c9450c58cd'),
  burger2: img('1565299507177-b0ac66763828'),
  pizza: img('1513104890138-7c749659a591'),
  pizza2: img('1606491956689-2ea866880c84'),
  icecream: img('1551024506-0bccd828d307'),
  sundae: img('1563805042-7684c019e1cb'),
  dessert: img('1574894709920-11b28e7367e3'),
  kebab: img('1599487488170-d11ec9c172f0'),
  fish: img('1626777552726-4a6b54c97e46'),
  coastal: img('1604908176997-125f25cc6f3d'),
  pasta: img('1596797038530-2c107229654b'),
  breakfast: img('1604382354936-07c5d9983bd3'),
}

// cover photos for restaurant cards
const C = {
  meghana: img('1563379091339-03b21ab4a4f8', 700, 460),
  empire: img('1599487488170-d11ec9c172f0', 700, 460),
  mtr: img('1567188040759-fb8a883dc6d8', 700, 460),
  vidyarthi: img('1668236543090-82eba5ee5976', 700, 460),
  ctr: img('1630383249896-424e482df921', 700, 460),
  brahmins: img('1589301760014-d929f3979dbc', 700, 460),
  truffles: img('1565299507177-b0ac66763828', 700, 460),
  cornerhouse: img('1574894709920-11b28e7367e3', 700, 460),
  nagarjuna: img('1589302168068-964664d93dc0', 700, 460),
  toit: img('1513104890138-7c749659a591', 700, 460),
  koshys: img('1604382354936-07c5d9983bd3', 700, 460),
  karavalli: img('1626777552726-4a6b54c97e46', 700, 460),
}

export const restaurants = [
  {
    id: 'meghana', name: 'Meghana Foods', cuisine: 'Andhra · Biryani', area: 'Residency Road',
    rating: 4.5, time: '30-35 min', costForTwo: 600, cover: C.meghana, rank: 1,
    tags: ['Andhra', 'Biryani', 'Spicy'], since: 2006,
    blurb: "Bengaluru's biryani temple — legendary for its fiery Special Boneless Chicken Biryani.",
    menu: [
      { id: 'm1', name: 'Special Boneless Chicken Biryani', price: 375, veg: false, popular: true, img: P.biryani, desc: 'The cult classic. Fragrant long-grain rice, tender boneless chicken, signature spice.' },
      { id: 'm2', name: 'Mutton Biryani', price: 420, veg: false, img: P.biryani3, desc: 'Slow-dum mutton with aromatic Andhra masala.' },
      { id: 'm3', name: 'Paneer Biryani', price: 320, veg: true, img: P.biryani2, desc: 'Soft paneer cubes layered with spiced basmati.' },
      { id: 'm4', name: 'Chicken 65', price: 290, veg: false, popular: true, img: P.kebab, desc: 'Crispy, tangy, deep-red fried chicken bites.' },
      { id: 'm5', name: 'Apollo Fish', price: 360, veg: false, img: P.fish, desc: 'Boneless fish tossed in a spicy curry-leaf glaze.' },
      { id: 'm6', name: 'Gulab Jamun (2 pc)', price: 120, veg: true, img: P.dessert, desc: 'Warm, syrup-soaked classic to cool the spice.' },
    ],
  },
  {
    id: 'empire', name: 'Empire Restaurant', cuisine: 'Mughlai · Kebabs', area: 'Church Street',
    rating: 4.3, time: '25-30 min', costForTwo: 500, cover: C.empire, rank: 2,
    tags: ['Mughlai', 'Kebab', 'Late night'], since: 1966,
    blurb: 'Round-the-clock Bengaluru institution famous for Har-Dil-Azeez biryani and butter chicken.',
    menu: [
      { id: 'e1', name: 'Har-Dil-Azeez Chicken Biryani', price: 330, veg: false, popular: true, img: P.biryani4, desc: 'The crowd favourite — rich, buttery, generously spiced.' },
      { id: 'e2', name: 'Butter Chicken', price: 340, veg: false, popular: true, img: P.butterChicken, desc: 'Silky tomato-butter gravy, best mopped with parotta.' },
      { id: 'e3', name: 'Chicken Kebab Roll', price: 180, veg: false, img: P.kebab, desc: 'Smoky grilled kebab wrapped in a soft rumali.' },
      { id: 'e4', name: 'Mutton Pepper Fry', price: 360, veg: false, img: P.muttonCurry, desc: 'Dry-fried mutton loaded with crushed pepper.' },
      { id: 'e5', name: 'Kerala Parotta (2 pc)', price: 60, veg: true, img: P.curry, desc: 'Flaky, layered parottas — the perfect scoop.' },
    ],
  },
  {
    id: 'mtr', name: 'MTR (Mavalli Tiffin Room)', cuisine: 'South Indian', area: 'Lalbagh Road',
    rating: 4.6, time: '35-40 min', costForTwo: 400, cover: C.mtr, rank: 3,
    tags: ['Iconic', 'Veg', 'Breakfast'], since: 1924,
    blurb: 'The 100-year-old legend where Rava Idli was invented. Filter coffee in silver tumblers.',
    menu: [
      { id: 't1', name: 'Rava Idli', price: 110, veg: true, popular: true, img: P.idliVada, desc: 'Invented right here in the 1940s. Fluffy, ghee-kissed.' },
      { id: 't2', name: 'Masala Dosa', price: 130, veg: true, popular: true, img: P.dosa, desc: 'Golden, ghee-roasted, with MTR\'s signature potato palya.' },
      { id: 't3', name: 'Bisi Bele Bath', price: 140, veg: true, img: P.thali, desc: 'Hot, tangy rice-lentil classic with a ghee finish.' },
      { id: 't4', name: 'South Indian Thali', price: 350, veg: true, img: P.thali, desc: 'The full spread — pooris, sagu, sweets, rice and more.' },
      { id: 't5', name: 'Filter Coffee', price: 60, veg: true, img: P.coffee, desc: 'Strong, frothy, served the old Bengaluru way.' },
    ],
  },
  {
    id: 'vidyarthi', name: 'Vidyarthi Bhavan', cuisine: 'South Indian', area: 'Gandhi Bazaar',
    rating: 4.6, time: '30-35 min', costForTwo: 250, cover: C.vidyarthi, rank: 4,
    tags: ['Iconic', 'Veg', 'Since 1943'], since: 1943,
    blurb: 'Basavanagudi institution serving the city\'s most famous crispy butter masala dosa since 1943.',
    menu: [
      { id: 'v1', name: 'Masala Dosa', price: 90, veg: true, popular: true, img: P.dosa2, desc: 'Crisp, deep-golden, dripping butter — the benchmark dosa.' },
      { id: 'v2', name: 'Khara Bath', price: 70, veg: true, img: P.thali, desc: 'Spiced semolina upma, soft and savoury.' },
      { id: 'v3', name: 'Kesari Bath', price: 60, veg: true, popular: true, img: P.dessert, desc: 'Sweet saffron semolina — pairs as the classic "chow chow bath".' },
      { id: 'v4', name: 'Idli Vada', price: 75, veg: true, img: P.idliVada, desc: 'Steamed idli and a crisp medu vada with chutney.' },
      { id: 'v5', name: 'Filter Coffee', price: 40, veg: true, img: P.coffee2, desc: 'The perfect full stop to the dosa.' },
    ],
  },
  {
    id: 'ctr', name: 'CTR (Shri Sagar)', cuisine: 'South Indian', area: 'Malleshwaram',
    rating: 4.5, time: '30-35 min', costForTwo: 300, cover: C.ctr, rank: 5,
    tags: ['Iconic', 'Veg', 'Benne Dosa'], since: 1920,
    blurb: 'Malleshwaram\'s pride — home of the decadent Benne (butter) Masala Dosa.',
    menu: [
      { id: 'c1', name: 'Benne Masala Dosa', price: 110, veg: true, popular: true, img: P.dosa3, desc: 'Loaded with white butter — crisp outside, molten within.' },
      { id: 'c2', name: 'Idli Vada', price: 70, veg: true, img: P.idliVada, desc: 'Soft idli with a perfectly crisp vada.' },
      { id: 'c3', name: 'Poori Saagu', price: 90, veg: true, img: P.thali, desc: 'Puffy pooris with mildly spiced veg saagu.' },
      { id: 'c4', name: 'Kharabath', price: 70, veg: true, img: P.thali, desc: 'Savoury semolina with a fragrant tempering.' },
      { id: 'c5', name: 'Mangalore Bajji', price: 80, veg: true, img: P.vada, desc: 'Fluffy goli bajji with coconut chutney.' },
    ],
  },
  {
    id: 'brahmins', name: "Brahmin's Coffee Bar", cuisine: 'South Indian', area: 'Basavanagudi',
    rating: 4.7, time: '25-30 min', costForTwo: 150, cover: C.brahmins, rank: 6,
    tags: ['Top rated', 'Veg', 'Since 1965'], since: 1965,
    blurb: 'A tiny stall with a giant reputation — idli, vada and chutney worth queuing for.',
    menu: [
      { id: 'b1', name: 'Idli (2 pc)', price: 50, veg: true, popular: true, img: P.idliVada, desc: 'Cloud-soft idli with the legendary coconut chutney.' },
      { id: 'b2', name: 'Medu Vada', price: 40, veg: true, popular: true, img: P.vada, desc: 'Crunchy outside, pillowy inside.' },
      { id: 'b3', name: 'Khara Bath', price: 60, veg: true, img: P.thali, desc: 'Warm, spiced upma done just right.' },
      { id: 'b4', name: 'Kesari Bath', price: 55, veg: true, img: P.dessert, desc: 'Glossy, sweet and saffron-rich.' },
      { id: 'b5', name: 'Filter Coffee', price: 35, veg: true, img: P.coffee, desc: 'Possibly the best ₹35 you\'ll spend in the city.' },
    ],
  },
  {
    id: 'truffles', name: 'Truffles', cuisine: 'Burgers · Continental', area: 'Koramangala',
    rating: 4.4, time: '30-35 min', costForTwo: 700, cover: C.truffles, rank: 7,
    tags: ['Burgers', 'Continental'], since: 2005,
    blurb: 'Koramangala\'s forever-packed spot for indulgent burgers, pastas and shakes.',
    menu: [
      { id: 'r1', name: 'Mutton Cheese Burger', price: 320, veg: false, popular: true, img: P.burger, desc: 'Juicy mutton patty, melted cheese, the Truffles classic.' },
      { id: 'r2', name: 'Chicken Spaghetti', price: 350, veg: false, img: P.pasta, desc: 'Creamy spaghetti loaded with grilled chicken.' },
      { id: 'r3', name: 'Loaded Nachos', price: 280, veg: true, img: P.burger2, desc: 'Cheesy, saucy, jalapeño-topped sharing plate.' },
      { id: 'r4', name: 'BBQ Chicken Wings', price: 330, veg: false, popular: true, img: P.kebab, desc: 'Sticky, smoky, finger-licking wings.' },
      { id: 'r5', name: 'Brownie Sundae', price: 220, veg: true, img: P.sundae, desc: 'Warm brownie, cold ice cream, hot fudge.' },
    ],
  },
  {
    id: 'cornerhouse', name: 'Corner House', cuisine: 'Desserts · Ice Cream', area: 'Multiple Outlets',
    rating: 4.6, time: '20-25 min', costForTwo: 350, cover: C.cornerhouse, rank: 8,
    tags: ['Desserts', 'Ice Cream', 'Cult'], since: 1982,
    blurb: 'Every Bengalurean\'s childhood — home of the iconic Death by Chocolate.',
    menu: [
      { id: 'h1', name: 'Death by Chocolate', price: 260, veg: true, popular: true, img: P.icecream, desc: 'The legend: brownie, ice cream, chocolate sauce, nuts.' },
      { id: 'h2', name: 'Hot Chocolate Fudge', price: 240, veg: true, popular: true, img: P.sundae, desc: 'Vanilla scoops drowned in warm fudge.' },
      { id: 'h3', name: 'Caramel Crunch Sundae', price: 230, veg: true, img: P.dessert, desc: 'Buttery caramel with a satisfying crunch.' },
      { id: 'h4', name: 'Cold Coffee', price: 160, veg: true, img: P.coffee2, desc: 'Thick, frosty, perfectly sweet.' },
    ],
  },
  {
    id: 'nagarjuna', name: 'Nagarjuna', cuisine: 'Andhra', area: 'Residency Road',
    rating: 4.3, time: '35-40 min', costForTwo: 550, cover: C.nagarjuna, rank: 9,
    tags: ['Andhra', 'Spicy', 'Meals'], since: 1986,
    blurb: 'Fiery Andhra meals and mutton biryani that have ruled Residency Road since the 80s.',
    menu: [
      { id: 'n1', name: 'Andhra Mutton Biryani', price: 390, veg: false, popular: true, img: P.biryani3, desc: 'Bold, peppery, unmistakably Andhra.' },
      { id: 'n2', name: 'Andhra Chicken Curry', price: 320, veg: false, img: P.curry, desc: 'Spice-forward gravy that demands extra rice.' },
      { id: 'n3', name: 'Andhra Veg Meals', price: 280, veg: true, popular: true, img: P.thali, desc: 'Unlimited rice, rasam, pappu, pickle and more.' },
      { id: 'n4', name: 'Gongura Mutton', price: 360, veg: false, img: P.muttonCurry, desc: 'Tangy sorrel-leaf mutton — an Andhra signature.' },
      { id: 'n5', name: 'Paneer Butter Masala', price: 260, veg: true, img: P.paneer, desc: 'Creamy, mildly sweet, crowd-pleasing.' },
    ],
  },
  {
    id: 'toit', name: 'Toit Brewpub', cuisine: 'Pizza · Continental', area: 'Indiranagar',
    rating: 4.5, time: '35-40 min', costForTwo: 1200, cover: C.toit, rank: 10,
    tags: ['Pizza', 'Brewpub', 'Continental'], since: 2010,
    blurb: 'Indiranagar\'s iconic brewpub — wood-fired pizzas and comfort classics.',
    menu: [
      { id: 'o1', name: 'Tipsy Pizza', price: 520, veg: false, popular: true, img: P.pizza, desc: 'House signature, wood-fired, loaded with toppings.' },
      { id: 'o2', name: 'Margherita Pizza', price: 450, veg: true, img: P.pizza2, desc: 'San Marzano, fresh basil, molten mozzarella.' },
      { id: 'o3', name: 'Toit Bangers & Mash', price: 480, veg: false, popular: true, img: P.breakfast, desc: 'Sausages, buttery mash, rich onion gravy.' },
      { id: 'o4', name: 'Beer Battered Onion Rings', price: 290, veg: true, img: P.burger2, desc: 'Crunchy golden rings — the perfect starter.' },
      { id: 'o5', name: 'Pesto Pasta', price: 420, veg: true, img: P.pasta, desc: 'Basil pesto tossed through al-dente penne.' },
    ],
  },
  {
    id: 'koshys', name: "Koshy's", cuisine: 'Continental · Cafe', area: 'St. Marks Road',
    rating: 4.2, time: '30-35 min', costForTwo: 600, cover: C.koshys, rank: 11,
    tags: ['Cafe', 'Continental', 'Since 1940'], since: 1940,
    blurb: 'A timeless Bengaluru cafe — all-day breakfast, cutlets and unhurried conversation.',
    menu: [
      { id: 'k1', name: 'Mutton Cutlet', price: 240, veg: false, popular: true, img: P.kebab, desc: 'Crisp-crumbed, old-school, served with salad.' },
      { id: 'k2', name: 'Chicken Stew & Appam', price: 290, veg: false, img: P.coastal, desc: 'Gentle Kerala stew with lacy appams.' },
      { id: 'k3', name: 'English Breakfast', price: 350, veg: false, popular: true, img: P.breakfast, desc: 'Eggs, sausage, toast — the full plate.' },
      { id: 'k4', name: 'Masala Omelette', price: 160, veg: false, img: P.breakfast, desc: 'Fluffy, spiced, café-style.' },
      { id: 'k5', name: 'Cold Coffee', price: 150, veg: true, img: P.coffee2, desc: 'Creamy and refreshing.' },
    ],
  },
  {
    id: 'karavalli', name: 'Karavalli', cuisine: 'Coastal · Fine Dining', area: 'The Gateway Hotel',
    rating: 4.7, time: '40-45 min', costForTwo: 2500, cover: C.karavalli, rank: 12,
    tags: ['Coastal', 'Fine dining', 'Award-winning'], since: 1990,
    blurb: 'Award-winning coastal cuisine from Karnataka, Kerala, Goa and Mangalore.',
    menu: [
      { id: 'a1', name: 'Meen Pollichathu', price: 890, veg: false, popular: true, img: P.fish, desc: 'Fish grilled in banana leaf with Kerala spices.' },
      { id: 'a2', name: 'Mangalorean Ghee Roast Chicken', price: 820, veg: false, popular: true, img: P.curry, desc: 'Fiery, glossy, ghee-laden coastal classic.' },
      { id: 'a3', name: 'Appam with Stew', price: 560, veg: true, img: P.coastal, desc: 'Soft lacy appams with delicate vegetable stew.' },
      { id: 'a4', name: 'Coorg Pandi Curry', price: 780, veg: false, img: P.muttonCurry, desc: 'Smoky Kodava-style pork with kachampuli.' },
      { id: 'a5', name: 'Neer Dosa', price: 320, veg: true, img: P.dosa3, desc: 'Delicate rice crêpes, melt-in-mouth soft.' },
    ],
  },
]

// quick lookups
export const restaurantById = Object.fromEntries(restaurants.map((r) => [r.id, r]))

// flattened "popular dishes" for the homepage menu section
export const popularDishes = restaurants.flatMap((r) =>
  r.menu.filter((d) => d.popular).map((d) => ({ ...d, restId: r.id, restName: r.name, area: r.area }))
)

export const cuisineFilters = [
  { key: 'all', label: 'All' },
  { key: 'Biryani', label: 'Biryani' },
  { key: 'South Indian', label: 'South Indian' },
  { key: 'Andhra', label: 'Andhra' },
  { key: 'Pizza', label: 'Pizza' },
  { key: 'Desserts', label: 'Desserts' },
  { key: 'Coastal', label: 'Coastal' },
]

export const stats = [
  { num: '28', unit: 'min', label: 'Average delivery time' },
  { num: '2,400+', unit: '', label: 'Partner kitchens in Bengaluru' },
  { num: '60+', unit: '', label: 'Areas covered' },
  { num: '98', unit: '%', label: 'On-time deliveries' },
]

export const reviews = [
  {
    name: 'Aishwarya N.', tilt: 'quote--tl', area: 'Koramangala',
    avatar: img('1438761681033-6461ffad8d80', 80, 80),
    text: 'Meghana biryani at my door in 28 minutes, still piping hot. The live tracking is dangerously addictive.',
    stats: [{ num: '22', unit: 'min', label: 'Her avg wait' }, { num: '5×', unit: '', label: 'Orders / week' }],
  },
  {
    name: 'Rohit Menon', tilt: 'quote--tr', area: 'Indiranagar',
    avatar: img('1500648767791-00dcc994a43e', 80, 80),
    text: 'As a Toit regular, having it delivered without the wait-list is a dream. Packaging keeps the pizza perfect.',
    stats: [{ num: '+275', unit: '%', label: 'Takeaway orders' }, { num: '4.9', unit: '', label: 'Avg rating' }],
  },
  {
    name: 'Lakshmi R.', tilt: 'quote--tl2', area: 'Jayanagar',
    avatar: img('1494790108377-be9c29b29330', 80, 80),
    text: 'Sunday breakfast from Brahmin\'s and Vidyarthi Bhavan without the queue. ForkFleet basically runs my weekends.',
    stats: [{ num: '4.9', unit: '', label: 'Rating given' }, { num: '120+', unit: '', label: 'Orders this year' }],
  },
]

export const partners = ['Meghana', 'Empire', 'MTR', 'Truffles', 'Corner House', 'Toit']

// delivery / bill constants (₹)
export const DELIVERY_FEE = 39
export const PACKING_FEE = 20
export const GST_RATE = 0.05

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN')
