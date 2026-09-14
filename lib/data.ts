export interface PortionData {
  id?: string
  label: string
  serves: string
  price: number
  isDefault?: boolean
}

export interface MenuItemData {
  id: string
  name: string
  nameBn: string
  description: string
  descriptionBn: string
  category: 'popular' | 'kacchi' | 'tehari' | 'grilled' | 'platters' | 'sides' | 'drinks'
  image: string
  isBestseller: boolean
  isAvailable: boolean
  tag?: string
  spiceOptions?: string[]
  addons?: { name: string; price: number }[]
  portions: PortionData[]
}

export interface BranchData {
  id: string
  name: string
  area: string
  address: string
  phone: string
  hours: string
  isOpen: boolean
  deliveryFee: number
  mapLink?: string
}

export const INITIAL_BRANCHES: BranchData[] = [
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

export const INITIAL_MENU_ITEMS: MenuItemData[] = [
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
    addons: [
      { name: 'Extra Fried Egg (ডিম)', price: 30 },
      { name: 'Extra Kacchi Potato (আলু)', price: 40 },
      { name: 'Cold Borhani Bottle (বোরহানী)', price: 70 },
      { name: 'Shahi Firni Cup (ফিরনি)', price: 60 }
    ],
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
    addons: [
      { name: 'Extra Fried Egg (ডিম)', price: 30 },
      { name: 'Cold Borhani Bottle (বোরহানী)', price: 70 },
      { name: 'Shahi Firni Cup (ফিরনি)', price: 60 }
    ],
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
    addons: [
      { name: 'Extra Mutton Piece (খাসির মাংস)', price: 180 },
      { name: 'Extra Potato (আলু)', price: 40 }
    ],
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
    addons: [
      { name: 'Extra Boiled Egg (ডিম)', price: 30 },
      { name: 'Borhani Glass (বোরহানী)', price: 70 },
      { name: 'Mint Salad Raita', price: 40 }
    ],
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
    spiceOptions: ['Lemon & Herb', 'Mild Mildness', 'Hot Peri-Peri', 'Extra Fiery Volcano'],
    addons: [
      { name: 'Extra Peri-Peri Chips (ফ্রাইজ)', price: 120 },
      { name: 'Toasted Herb Garlic Roll (গার্লিক রোল)', price: 60 },
      { name: 'Garlic Mayo Dip Bottle', price: 50 },
      { name: 'Fiery Reserve Chilli Dip', price: 50 }
    ],
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
    addons: [
      { name: 'Extra Chui Jhal Twig Portion', price: 60 },
      { name: 'Shahi Firni Cup', price: 60 },
      { name: 'Lime & Onion Salad', price: 30 }
    ],
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
    spiceOptions: ['Mild', 'Spicy Fire', 'Extra Fiery Dragon'],
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

export const MEGA_DEAL_DATA = {
  id: 'mega-deal-4-reg',
  title: '4 REG PLATTER',
  tagline: 'ALL DAY, EVERYDAY VALUE',
  originalPrice: 1480,
  dealPrice: 999,
  savings: 481,
  description: 'Includes 2 Flame Quarter Chickens, 2 Mini Kacchi Bowls, 4 Golden Peri Fries & 2 Borhani Bottles.',
  dishes: [
    {
      name: 'Flame Peri Quarter',
      subtitle: '+ Peri Fries',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaFcWgUyzXsyZpSenL1y1Xzr9z35zekz3B_8yaHtOpTVeMWYftNR6r2Jbu1LNJ8aNQQSSpk5HfJ-higkTKAt6hZL6lwxeJGPTaVg7gZdmPlfjTKExkb0ofFoVkfekxfgxr0HRZ0mfWbloVJds4fg3i2qBb-zDeRPo0m2XkFgkP7Fy7FYT5WhyIvDJXCNK9h1Xo2WW0kOBpBVmnxo_eZVG0n96vJheUhnjfeGOAr5X7TaRKdoroMDi6Sw'
    },
    {
      name: 'Mini Dum Kacchi',
      subtitle: '+ Boiled Egg & Potato',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNh6WcDIb9e8mO6oO1p-dnXfuo7z8QY8D8Z8FQRLeeds9zEMN_clP1fxUr9fsRL-bpcug1n-9JINkOG6SQ5bK57ihbDx4ROkp31P00MFLZi7_uhtXb8pGKucoz-XgwQF00LKZbODGuGMEwtEDcxfHHRbnu8v3yf3yu_b24Gmzk35yKIo0TW8KLNwj7aguTgNilnnKJJL54L8miWozcT4WI_dHCCudmtbufks0xn3aCKDAS07bfbLZznw'
    },
    {
      name: '6x Fiery Wings',
      subtitle: '+ Herb Garlic Dip',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvgQOg17MZfDQHRj_H0ZNtBK-9YLkYQq6AEdk4hhqZ7L7GlouFo18Pko4a3n_Fx7loHOnaCWrWZ9cc4XZMiGse6K9FwK16SoJ2jIJiJa1ROzoeFeLDQ1QwflfRidfKL4pCQFj_p9XTsqGaT_QwB-TK8Jiro6o11FLAdNBp0wNH0tq0CveJzWFulhS9tLawP7TZiaLF8Q_TS_-NBgL6ebEpnUxngRBpoLc5iOlmRv3QwnHNpigUZR5dA'
    },
    {
      name: 'Chui Ghost Rice Bowl',
      subtitle: '+ Firni Dessert',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPnp49ZmjhhdUWE82QV48naGVyDkzJaeUY6uw2z9veQJxkfDL7W8CKYmh9rezJiXdwrWDWC4YdENJFo_uUJOU8rDwhlmpV6iXvbm3awfWd2Wp6NwZQtX4h4-gYCrcvvqzCHSiQnchWs0pETPu0qGAJQuzIv-nP7SZgnz0kGH5mL562Nq156a5srEEHrFe3z9KRZUsmzmce8If0AXMjmTXHXLR_Ce2_cpeHEFNpPHoj_UTLpTd9GfWWIA'
    }
  ]
}

export const INITIAL_COUPONS = [
  { code: 'FEAST100', discount: 100, type: 'fixed', minOrder: 800, isActive: true },
  { code: 'WELCOME50', discount: 50, type: 'fixed', minOrder: 400, isActive: true },
  { code: 'FLAME15', discount: 15, type: 'percent', minOrder: 1200, isActive: true }
]

export const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Rafid Al-Mamun',
    role: 'Food Enthusiast & Vlogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    comment: 'The Basmati Kacchi is legitimately one of the best in Dhaka. Tender mutton that melts effortlessly, and the flame-grilled peri chicken has that authentic open-flame smokiness you rarely find!'
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Banani Resident',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered the 4-REG Platter for family dinner. The delivery arrived in just 32 mins, piping hot! The Borhani and spicy wings were 10/10.'
  },
  {
    id: 3,
    name: 'Tanzir Ahmed',
    role: 'Software Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The online reservation system was buttery smooth and our table at Gulshan 2 was beautifully prepared with chef complimentary appetizers.'
  }
]
