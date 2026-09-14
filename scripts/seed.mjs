import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_BRANCHES = [
  {
    id: 'dhanmondi',
    name: 'Dhanmondi Flagship Outlet',
    area: 'Dhanmondi',
    address: 'House 42, Satmasjid Road (Opposite Genetic Plaza), Dhanmondi, Dhaka',
    phone: '01711-223344',
    hours: '11:00 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=Dhanmondi+Satmasjid+Road+Dhaka'
  },
  {
    id: 'gulshan',
    name: 'Gulshan 2 - Heritage Bistro',
    area: 'Gulshan',
    address: 'Level 3, Pink City Shopping Arcade, Gulshan Avenue, Dhaka',
    phone: '01711-223345',
    hours: '11:00 AM - 11:30 PM',
    isOpen: true,
    deliveryFee: 70,
    mapLink: 'https://maps.google.com/?q=Pink+City+Gulshan+Dhaka'
  },
  {
    id: 'banani',
    name: 'Banani 11 - Flame Lounge',
    area: 'Banani',
    address: 'Road 11, Block D, House 68, Banani, Dhaka',
    phone: '01711-223346',
    hours: '11:00 AM - 11:30 PM',
    isOpen: true,
    deliveryFee: 70,
    mapLink: 'https://maps.google.com/?q=Road+11+Banani+Dhaka'
  },
  {
    id: 'uttara',
    name: 'Uttara Lake Drive Branch',
    area: 'Uttara',
    address: 'Plot 12, Sector 7, Rabindra Sarani, Uttara, Dhaka',
    phone: '01711-223347',
    hours: '11:00 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=Sector+7+Uttara+Dhaka'
  },
  {
    id: 'mirpur',
    name: 'Mirpur 10 Dine & Grill',
    area: 'Mirpur',
    address: 'Mirpur 10 Roundabout (Opposite Fire Service), Dhaka',
    phone: '01711-223348',
    hours: '11:00 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 50,
    mapLink: 'https://maps.google.com/?q=Mirpur+10+Dhaka'
  },
  {
    id: 'bailey-road',
    name: 'Bailey Road Heritage Outlet',
    area: 'Bailey Road',
    address: 'Navana Bailey Square, 1st Floor, Bailey Road, Dhaka',
    phone: '01711-223349',
    hours: '11:30 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=Bailey+Road+Dhaka'
  },
  {
    id: 'chittagong-gec',
    name: 'Chittagong GEC Circle Hub',
    area: 'Chittagong',
    address: 'GEC Circle, Nasirabad (Near Central Plaza), Chittagong',
    phone: '01711-223350',
    hours: '12:00 PM - 11:00 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=GEC+Circle+Chittagong'
  }
]

const INITIAL_MENU_ITEMS = [
  {
    id: 'basmati-kacchi',
    name: 'Basmati Kacchi Biryani',
    nameBn: 'বাসমতি কাচ্চি (Basmati Kacchi)',
    description: 'Traditional royal long-grain Basmati rice slow-dum cooked with melt-in-mouth tender marinated mutton chunks, whole baby potatoes, and fragrant saffron ghee.',
    descriptionBn: 'সুগন্ধি বাসমতি চাল ও খাঁটি ঘিয়ে রান্না করা রসালো খাসির মাংসের ঐতিহ্যবাহী দম কাচ্চি। সাথে পাবেন স্পেশাল আলু ও ডিম।',
    category: 'popular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzPuivaEYvs8ZE0qblW61GpT51qCeNqyfccoQNT1eaiVs6jC_Om5Dtxn7zxnR0951Y0sxU1bfdTW7DpqHYGI3TS0McJlOaBX6HEA4Vv29zyDdq60QoTsYHvWrL-ZbiTF4tyXj8OKQnAL_7ubJbvDyDHbsDVuSxI0o90COdgV1QXC-XgAqAdAgwS_S8cIMWxMaJHiDm9QRTaXQ0VAtSsdugUX3RVeUJlWCzmb5lf4p5DYJ1pzFqWE2zQ',
    isBestseller: true,
    isAvailable: true,
    tag: 'Bestseller',
    addonsJson: JSON.stringify([
      { name: 'Extra Fried Egg (ডিম)', price: 30 },
      { name: 'Extra Kacchi Potato (আলু)', price: 40 },
      { name: 'Cold Borhani Bottle (বোরহানী)', price: 70 },
      { name: 'Shahi Firni Cup (ফিরনি)', price: 60 }
    ]),
    portions: [
      { label: '1:1', serves: '1 Person', price: 330, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 980, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 1930, isDefault: false }
    ]
  },
  {
    id: 'kacchi-khadok',
    name: 'Kacchi Khadok Platter',
    nameBn: 'কাচ্চি খাদক (Kacchi Khadok)',
    description: 'Specially crafted for meat lovers! Double mutton portion with caramelized saffron Basmati, 2 eggs, 2 golden spiced potatoes, and rich meat gravy.',
    descriptionBn: 'মাংসপ্রেমীদের জন্য বিশেষ কাচ্চি! ডাবল মাটন পিস, জাফরানি পোলাও, ২টি স্পেশাল আলু ও ২টি সেদ্ধ ডিম।',
    category: 'kacchi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK8MV-07ehksDJ2l42WzbGTPV1EQ6q-n2rJeGS_7nnFqYh_YFX8FB59jFo6ZoTXNppaNpOa7olVu6gFxGNu1ATpX4jjcuXbsWRuaMMEXiFh5ms1KeWi9LSGr8KEVIt3dk-lxTzQd3TUsitZFrdaE0hH7sqYAjlDML7HW0qnBdj-fz5Mp8Ovd76OZp9NB76VLmr96bYowS_OoLwiQCPyyIKk-tD931LuncbXrT_ENEXaC4U9Gp0eM8GAQ',
    isBestseller: true,
    isAvailable: true,
    tag: 'Extra Meat',
    addonsJson: JSON.stringify([
      { name: 'Extra Fried Egg (ডিম)', price: 30 },
      { name: 'Cold Borhani Bottle (বোরহানী)', price: 70 },
      { name: 'Shahi Firni Cup (ফিরনি)', price: 60 }
    ]),
    portions: [
      { label: '1:1', serves: '1 Person', price: 530, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 1480, isDefault: false },
      { label: '1:4', serves: '4 Persons', price: 2480, isDefault: true }
    ]
  },
  {
    id: 'basmati-kacchi-combo',
    name: 'Basmati Kacchi, Borhani & Firni Treat',
    nameBn: 'বাসমতি কাচ্চি, বোরহানী ও ফিরনি',
    description: 'The ultimate royal combo: Basmati Kacchi Biryani served with refreshing chilled sour curd Borhani and clay-cup Shahi Firni dessert.',
    descriptionBn: 'সম্পূর্ণ শাহী আয়োজন! বাসমতি কাচ্চি, সাথে খাঁটি টক দইয়ের স্পাইসি বোরহানী এবং জাফরানি মাটির কাপের ফিরনি।',
    category: 'popular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8DN9Nk3QVijW7xIY-9WREnb9i9oWNV5AsTQ04iGFzL4eIaIJ4I67lNeXGBuhB3BoRTNAOA0ffO7QJ_Uofykv9exZgWRE4DemFDpinPuCBDeBN_QnGg-XnuUUlNC46xP0jmvvr58swYBl7EHyUNyY3TeVlc8We4Ws_kabTT88NnjmblmZPVG5RcSL3Gxd5jofD5BkDQQoS732m3p0vgKWneqZiCrGpbD1I3w6QuB9dNZPzNxVnAZd3Ig',
    isBestseller: true,
    isAvailable: true,
    tag: 'Combo Treat',
    addonsJson: JSON.stringify([
      { name: 'Extra Mutton Piece (খাসির মাংস)', price: 180 },
      { name: 'Extra Potato (আলু)', price: 40 }
    ]),
    portions: [
      { label: '1:1', serves: '1 Person', price: 460, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 1370, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 2280, isDefault: false }
    ]
  },
  {
    id: 'special-mutton-tehari',
    name: 'Special Mustard Mutton Tehari',
    nameBn: 'স্পেশাল মাটন তেহারি (Special Tehari)',
    description: 'Pungent pure cold-pressed mustard oil infused Chinigura rice tossed with spicy bite-sized tender mutton cuts, whole green chilies, and special garam masala blend.',
    descriptionBn: 'ঘানিভাঙা খাঁটি সরিষার তেলে রান্না করা ছোট সাইজের খাসির মাংসের সুস্বাদু পুরান ঢাকার তেহারি। কাঁচা মরিচের ঝাঁজালো স্বাদ।',
    category: 'tehari',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx6AWIr9aTHyUS9mw4A3EITgb0-qBSQR8cYpeArFGMUDOdmbarnVOhQI-8tN1l9kHDYGy7wgJKsdQieBF2UttMjNtSMpKfWH0ZSoZaH88qSkNBe6Pmg6jzmdNIVPjyvJF2cV-LXFrGoiicl4phOr0C04TJAR75oqNl4X6r3OVsagdbujEFjCY9NN2df_tIN5qc-ySnCyx6MJ47rD5yMq6Iohy_yP4K_FOZkavnw_V10yTpxXtkxqOKhw',
    isBestseller: true,
    isAvailable: true,
    tag: 'Mustard Oil Infused',
    addonsJson: JSON.stringify([
      { name: 'Extra Boiled Egg (ডিম)', price: 30 },
      { name: 'Borhani Glass (বোরহানী)', price: 70 },
      { name: 'Mint Salad Raita', price: 40 }
    ]),
    portions: [
      { label: '1:1', serves: '1 Person', price: 270, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 790, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 1320, isDefault: false }
    ]
  },
  {
    id: 'flame-peri-whole-chicken',
    name: 'Flame-Grilled Peri-Peri Chicken (Whole)',
    nameBn: 'ফ্লেম-গ্রিলড পেরি-পেরি চিকেন (আস্ত)',
    description: '24-hour marinated whole chicken flame-seared over lava rocks. Crispy skin, succulent interior, brushed with your choice of artisan fiery sauce.',
    descriptionBn: '২৪ ঘণ্টার সিক্রেট মসলায় মেরিনেট করা লাভা রকে ফ্লেম-গ্রিলড আস্ত মুরগি। সাথে গোল্ডেন ফ্রাইজ ও রসুনের সস।',
    category: 'grilled',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg',
    isBestseller: true,
    isAvailable: true,
    tag: 'Chef Special',
    spiceOptions: JSON.stringify(['Lemon & Herb', 'Mild Mildness', 'Hot Peri-Peri', 'Extra Fiery Volcano']),
    addonsJson: JSON.stringify([
      { name: 'Extra Peri-Peri Chips (ফ্রাইজ)', price: 120 },
      { name: 'Toasted Herb Garlic Roll (গার্লিক রোল)', price: 60 },
      { name: 'Garlic Mayo Dip Bottle', price: 50 },
      { name: 'Fiery Reserve Chilli Dip', price: 50 }
    ]),
    portions: [
      { label: '1/4 Bird', serves: '1 Person', price: 299, isDefault: false },
      { label: '1/2 Bird', serves: '2 Persons', price: 560, isDefault: false },
      { label: 'Full Bird', serves: '3-4 Persons', price: 1050, isDefault: true }
    ]
  },
  {
    id: 'chui-jhal-beef-bowl',
    name: 'Khulna Special Chui Jhal Beef Bowl',
    nameBn: 'চুই ঝাল গরুর গোস্ত ও ভাত (Chui Jhal Beef)',
    description: 'Authentic southern Bengal delicacy: Tender beef shank slow-simmered with aromatic wild Piper Chaba (Chui twig bark), served with fragrant hot steamed rice.',
    descriptionBn: 'খুলনার ঐতিহ্যবাহী সুগন্ধি চুইঝাল দিয়ে রান্না করা তুলতুলে নরম গরুর মাংস। ঝাঁজালো ও অতুলনীয় স্বাদ।',
    category: 'popular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPnp49ZmjhhdUWE82QV48naGVyDkzJaeUY6uw2z9veQJxkfDL7W8CKYmh9rezJiXdwrWDWC4YdENJFo_uUJOU8rDwhlmpV6iXvbm3awfWd2Wp6NwZQtX4h4-gYCrcvvqzCHSiQnchWs0pETPu0qGAJQuzIv-nP7SZgnz0kGH5mL562Nq156a5srEEHrFe3z9KRZUsmzmce8If0AXMjmTXHXLR_Ce2_cpeHEFNpPHoj_UTLpTd9GfWWIA',
    isBestseller: false,
    isAvailable: true,
    tag: 'Authentic Heritage',
    addonsJson: JSON.stringify([
      { name: 'Extra Chui Jhal Twig Portion', price: 60 },
      { name: 'Shahi Firni Cup', price: 60 }
    ]),
    portions: [
      { label: '1:1', serves: '1 Person', price: 380, isDefault: true },
      { label: '1:2', serves: '2 Persons', price: 740, isDefault: false },
      { label: '1:4', serves: '4 Persons', price: 1420, isDefault: false }
    ]
  },
  {
    id: 'fiery-wings-platter',
    name: 'Fiery Flame Wings & Peri Dip',
    nameBn: 'ফ্লেম উইংস ও স্পাইসি ডিপ (Fiery Wings)',
    description: 'Crisp char-grilled jumbo wings tossed in flaming African bird’s eye peri-peri glaze with fresh herb dipping cream.',
    descriptionBn: 'আগুনে ঝলসানো স্পাইসি উইংস, সাথে পেরি-পেরি গার্লিক সস ও লেমন হার্ব ডিপ।',
    category: 'sides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvgQOg17MZfDQHRj_H0ZNtBK-9YLkYQq6AEdk4hhqZ7L7GlouFo18Pko4a3n_Fx7loHOnaCWrWZ9cc4XZMiGse6K9FwK16SoJ2jIJiJa1ROzoeFeLDQ1QwflfRidfKL4pCQFj_p9XTsqGaT_QwB-TK8Jiro6o11FLAdNBp0wNH0tq0CveJzWFulhS9tLawP7TZiaLF8Q_TS_-NBgL6ebEpnUxngRBpoLc5iOlmRv3QwnHNpigUZR5dA',
    isBestseller: false,
    isAvailable: true,
    tag: 'Crispy & Fiery',
    spiceOptions: JSON.stringify(['Mild', 'Spicy Fire', 'Extra Fiery Dragon']),
    addonsJson: JSON.stringify([
      { name: 'Extra Garlic Dip', price: 50 }
    ]),
    portions: [
      { label: '6 Pcs', serves: '1-2 Persons', price: 280, isDefault: true },
      { label: '12 Pcs', serves: '3-4 Persons', price: 520, isDefault: false }
    ]
  },
  {
    id: 'royal-borhani-bottle',
    name: 'Traditional Shahi Borhani (Chilled)',
    nameBn: 'ঐতিহ্যবাহী শাহী বোরহানী (Borhani)',
    description: 'Rich thick yogurt blended with mint leaves, coriander, roasted cumin, black salt, and green chili essence.',
    descriptionBn: 'খাঁটি মিষ্টি ও টক দই, পুদিনা, বিট লবণ ও ভাজা জিরার মিশ্রণে তৈরি রাজকীয় ঠাণ্ডা বোরহানী।',
    category: 'drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhCunxzsxjPSvtu3oGgxpF0zW_QEzOfGqdGz3FlK7FFGhcCN6kMzMN5Qrykz_9l5t0Go9UxBPAaQtiefGvrRPCMK6eSlt2D4FJ2gbA7V-1rP1KreGrNMlTKHUqtgHUFEza8Ou82WeDnOmOd49nwmnCkDfDTbtcv6i9YGh0AqdALoFbUIUBjb4A74yTTCI61QxQE0-DeiFVIhVjsLdv1hwmnSR-0stNIWXj1SG9i-V2rE0UDZoWkCv4vQ',
    isBestseller: true,
    isAvailable: true,
    tag: 'Digestive Elixir',
    portions: [
      { label: '250ml', serves: '1 Person', price: 70, isDefault: true },
      { label: '500ml', serves: '2-3 Persons', price: 130, isDefault: false },
      { label: '1 Litre', serves: '4-6 Persons', price: 240, isDefault: false }
    ]
  }
]

const INITIAL_COUPONS = [
  { code: 'FEAST100', discount: 100, type: 'fixed', minOrder: 800, isActive: true },
  { code: 'WELCOME50', discount: 50, type: 'fixed', minOrder: 400, isActive: true },
  { code: 'FLAME15', discount: 15, type: 'percent', minOrder: 1200, isActive: true }
]

async function main() {
  console.log('Seeding Flame & Feast Database...')

  // Clear existing
  await prisma.portion.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.branch.deleteMany()
  await prisma.coupon.deleteMany()

  // Seed Branches
  for (const branch of INITIAL_BRANCHES) {
    await prisma.branch.create({
      data: branch
    })
  }
  console.log(`Seeded ${INITIAL_BRANCHES.length} branches.`)

  // Seed Coupons
  for (const coupon of INITIAL_COUPONS) {
    await prisma.coupon.create({
      data: coupon
    })
  }
  console.log(`Seeded ${INITIAL_COUPONS.length} coupons.`)

  // Seed Menu Items and Portions
  for (const item of INITIAL_MENU_ITEMS) {
    const { portions, ...itemData } = item
    await prisma.menuItem.create({
      data: {
        ...itemData,
        portions: {
          create: portions
        }
      }
    })
  }
  console.log(`Seeded ${INITIAL_MENU_ITEMS.length} menu items with portions.`)

  // Seed Demo Initial Orders for Admin & Live Tracking testing
  const demoOrder = await prisma.order.create({
    data: {
      orderNumber: 'FF-84920',
      customerName: 'Tanvir Hossain',
      customerPhone: '01712-345678',
      customerEmail: 'tanvir@gmail.com',
      deliveryAddress: 'Flat 4B, House 18, Road 7, Dhanmondi, Dhaka',
      branchName: 'Dhanmondi Flagship Outlet',
      fulfillmentType: 'delivery',
      subtotal: 1370,
      deliveryFee: 60,
      discount: 100,
      total: 1330,
      status: 'ON_FLAME',
      paymentMethod: 'BKASH',
      paymentStatus: 'PAID',
      notes: 'Please add extra green salad and napkins.',
      riderName: 'Kamrul Islam',
      riderPhone: '01822-998877',
      items: {
        create: [
          {
            name: 'Basmati Kacchi, Borhani & Firni Treat',
            portion: '1:2',
            quantity: 1,
            unitPrice: 1370,
            totalPrice: 1370,
            spiceLevel: 'Regular',
            addons: 'Cold Borhani Bottle, Shahi Firni Cup'
          }
        ]
      }
    }
  })
  console.log(`Seeded demo order: ${demoOrder.orderNumber}`)

  // Seed Demo Reservation
  await prisma.reservation.create({
    data: {
      code: 'RES-7721',
      name: 'Dr. Farhana Yasmin',
      phone: '01911-554433',
      email: 'farhana@yahoo.com',
      branch: 'Gulshan 2 - Heritage Bistro',
      date: '2026-09-18',
      time: '08:00 PM',
      guests: 6,
      zone: 'Rooftop Terrace',
      occasion: 'Anniversary',
      specialNotes: 'Table near the floral garden view please.',
      status: 'CONFIRMED'
    }
  })
  console.log('Seeded demo reservation: RES-7721')

  console.log('Database seeding complete successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
