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
    name: 'Banani 11 - Lounge & Grill',
    area: 'Banani',
    address: 'House 68, Road 11, Block D, Banani, Dhaka',
    phone: '01711-223346',
    hours: '11:00 AM - 11:30 PM',
    isOpen: true,
    deliveryFee: 70,
    mapLink: 'https://maps.google.com/?q=Road+11+Banani+Dhaka'
  },
  {
    id: 'uttara',
    name: 'Uttara Sector 7 - Express Diner',
    area: 'Uttara',
    address: 'Plot 14, Sonargaon Janapath Road, Sector 7, Uttara, Dhaka',
    phone: '01711-223347',
    hours: '11:00 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 80,
    mapLink: 'https://maps.google.com/?q=Uttara+Sector+7+Dhaka'
  },
  {
    id: 'mirpur',
    name: 'Mirpur 10 - Family Dine-In',
    area: 'Mirpur',
    address: 'Mirpur 10 Roundabout (Opposite Fire Service), Mirpur, Dhaka',
    phone: '01711-223348',
    hours: '11:00 AM - 10:30 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=Mirpur+10+Dhaka'
  },
  {
    id: 'old-dhaka',
    name: 'Nazira Bazar - Heritage Degh',
    area: 'Old Dhaka',
    address: '47 Kazi Alauddin Road, Nazira Bazar, Old Dhaka',
    phone: '01711-223349',
    hours: '12:00 PM - 01:00 AM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=Nazira+Bazar+Dhaka'
  },
  {
    id: 'chittagong',
    name: 'GEC Circle - Port City Flagship',
    area: 'Chittagong',
    address: 'O.R. Nizam Road, GEC Circle, Chittagong',
    phone: '01711-223350',
    hours: '11:00 AM - 11:00 PM',
    isOpen: true,
    deliveryFee: 60,
    mapLink: 'https://maps.google.com/?q=GEC+Circle+Chittagong'
  }
];

export const INITIAL_MENU_ITEMS: MenuItemData[] = [
  {
    id: 'basmati-kacchi',
    name: 'Royal Basmati Kacchi Biryani',
    nameBn: '\u09B0\u09DF\u09C7\u09B2 \u09AC\u09BE\u09B8\u09AE\u09A4\u09C0 \u0995\u09BE\u099A\u09CD\u099A\u09BF \u09AC\u09BF\u09B0\u09BF\u09DF\u09BE\u09A8\u09BF',
    description: 'Traditional royal long-grain Basmati rice slow-dum cooked with melt-in-mouth tender marinated mutton chunks, whole baby potatoes, and fragrant saffron ghee.',
    descriptionBn: '\u0996\u09BE\u09B8\u09BF \u09AE\u09BE\u0982\u09B8\u09C7\u09B0 \u09A8\u09B0\u09AE \u099F\u09C1\u0995\u09B0\u09CB, \u0986\u09B2\u09C1 \u0993 \u099C\u09BE\u09AB\u09B0\u09BE\u09A8\u09BF \u0998\u09BF\u09DF\u09C7 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE \u0995\u09B0\u09BE \u0990\u09A4\u09BF\u098F\u09CD\u09AF\u09AC\u09BE\u09B9\u09C0 \u09A6\u09AE \u09AC\u09BE\u09B8\u09AE\u09A4\u09C0 \u0995\u09BE\u099A\u09CD\u099A\u09BF\u0964',
    category: 'kacchi',
    image: '/images/dishes/kacchi.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Bestseller',
    addons: [
      { name: 'Extra Boiled Egg (\u09A1\u09BF\u09AE)', price: 30 },
      { name: 'Extra Kacchi Potato (\u0986\u09B2\u09C1)', price: 40 },
      { name: 'Cold Borhani Bottle (\u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF)', price: 70 },
      { name: 'Shahi Firni Cup (\u09AB\u09BF\u09B0\u09A8\u09BF)', price: 60 }
    ],
    portions: [
      { label: '1:1', serves: '1 Person', price: 330, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 980, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 1930, isDefault: false }
    ]
  },
  {
    id: 'flame-peri-whole-chicken',
    name: 'Flame-Grilled Peri-Peri Chicken',
    nameBn: '\u09AB\u09CD\u09B2\u09C7\u09AE-\u0997\u09CD\u09B0\u09BF\u09B2\u09CD\u09A1 \u09AA\u09C7\u09B0\u09BF-\u09AA\u09C7\u09B0\u09BF \u099A\u09BF\u0995\u09C7\u09A8',
    description: '24-hour marinated whole chicken flame-seared over lava rocks. Crispy skin, succulent interior, brushed with your choice of artisan fiery sauce.',
    descriptionBn: '\u09E8\u09EE \u0998\u09A3\u09CD\u099F\u09BE \u09AE\u09C7\u09B0\u09BF\u09A8\u09C7\u099F \u0995\u09B0\u09BE \u09B2\u09BE\u09AD\u09BE\u09B0\u0995\u09C7 \u09B8\u09C7\u0981\u0995\u09BE \u099C\u09C1\u09B8\u09BF \u0993 \u0995\u09CD\u09B0\u09BF\u09B8\u09CD\u09AA\u09BF \u0997\u09CD\u09B0\u09BF\u09B2\u09CD\u09A1 \u099A\u09BF\u0995\u09C7\u09A8\u0964',
    category: 'grilled',
    image: '/images/dishes/chicken.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Lava Seared',
    spiceOptions: ['Lemon & Herb', 'Mild Mildness', 'Hot Peri-Peri', 'Extra Fiery Volcano'],
    addons: [
      { name: 'Extra Peri Fries (\u09AA\u09C7\u09B0\u09BF \u09AB\u09CD\u09B0\u09BE\u0987\u09B8)', price: 120 },
      { name: 'Toasted Garlic Bun (\u0997\u09BE\u09B0\u09CD\u09B2\u09BF\u0995 \u09AC\u09BE\u09A8)', price: 60 },
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
    id: 'special-mutton-tehari',
    name: 'Special Mustard Mutton Tehari',
    nameBn: '\u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u09B8\u09B0\u09BF\u09B7\u09BE\u09B0 \u0996\u09BE\u0981\u099F\u09BF \u0996\u09BE\u09B8\u09BF\u09B0 \u09A4\u09C7\u09B9\u09BE\u09B0\u09BF',
    description: 'Pungent pure cold-pressed mustard oil infused Chinigura rice tossed with spicy bite-sized tender mutton cuts, whole green chilies, and special garam masala blend.',
    descriptionBn: '\u0998\u09BE\u09A8\u09BF\u09A4\u09C7 \u09AD\u09BE\u0999\u09BE \u0996\u09BE\u0981\u099F\u09BF \u09B8\u09B0\u09BF\u09B7\u09BE\u09B0 \u09A4\u09C7\u09B2\u09C7 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE \u0995\u09B0\u09BE \u09B8\u09C1\u09B8\u09CD\u09AC\u09BE\u09A6\u0915\u09C1 \u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u0996\u09BE\u09B8\u09BF\u09B0 \u09A4\u09C7\u09B9\u09BE\u09B0\u09BF\u0964',
    category: 'tehari',
    image: '/images/dishes/tehari.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Mustard Infused',
    addons: [
      { name: 'Extra Boiled Egg (\u09A1\u09BF\u09AE)', price: 30 },
      { name: 'Borhani Glass (\u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF)', price: 70 },
      { name: 'Mint Salad Raita', price: 40 }
    ],
    portions: [
      { label: '1:1', serves: '1 Person', price: 270, isDefault: false },
      { label: '1:2', serves: '2 Persons', price: 790, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 1320, isDefault: false }
    ]
  },
  {
    id: 'kacchi-khadok',
    name: 'Kacchi Khadok Platter',
    nameBn: '\u0995\u09BE\u099A\u09CD\u099A\u09BF \u0996\u09BE\u09A6\u0995 \u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09BE\u09B0',
    description: 'Specially crafted for meat lovers! Double mutton portion with caramelized saffron Basmati, 2 eggs, 2 golden spiced potatoes, and rich meat gravy.',
    descriptionBn: '\u09AE\u09BE\u0982\u09B8\u09AA\u09CD\u09B0\u09C7\u09AE\u09C0\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09BF\u09B6\u09C7\u09B7 \u09A1\u09BE\u09AC\u09B2 \u0996\u09BE\u09B8\u09BF\u09B0 \u09AE\u09BE\u0982\u09B8\u09C7\u09B0 \u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u0995\u09BE\u099A\u09CD\u099A\u09BF \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09BE\u09B0\u0964',
    category: 'kacchi',
    image: '/images/dishes/kacchi.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Extra Meat',
    addons: [
      { name: 'Extra Boiled Egg (\u09A1\u09BF\u09AE)', price: 30 },
      { name: 'Cold Borhani Bottle (\u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF)', price: 70 },
      { name: 'Extra Potato (\u0986\u09B2\u09C1)', price: 40 }
    ],
    portions: [
      { label: '1 Person (Heavy)', serves: '1 Person', price: 599, isDefault: true },
      { label: '2 Persons Platter', serves: '2 Persons', price: 1150, isDefault: false }
    ]
  },
  {
    id: 'flame-mega-feast',
    name: 'Flame & Dum 4-in-1 Mega Feast',
    nameBn: '\u09AB\u09CD\u09B2\u09C7\u09AE \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u09AB\u09BF\u09B8\u09CD\u099F \u09EA-\u0987\u09A8-\u09E7 \u09AE\u09C7\u0997\u09BE \u09AB\u09BF\u09B8\u09CD\u099F',
    description: 'Our signature group sharing platter: 2x Quarter Peri Chicken, 2x Mini Basmati Kacchi bowls, 4x Peri Fries, and 2x chilled Borhani bottles.',
    descriptionBn: '\u09EA \u099C\u09A8\u09C7\u09B0 \u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u0995\u09AE\u09CD\u09AC\u09CB: \u09E8\u099F\u09BF \u09AB\u09CD\u09B2\u09C7\u09AE \u099A\u09BF\u0995\u09C7\u09A8 \u0995\u09CB\u09DF\u09BE\u09B0\u09CD\u099F\u09BE\u09B0, \u09E8\u099F\u09BF \u09AE\u09BF\u09A8\u09BF \u09AC\u09BE\u09B8\u09AE\u09A4\u09C0 \u0995\u09BE\u099A\u09CD\u099A\u09BF, \u09EA\u099F\u09BF \u09AA\u09C7\u09B0\u09BF \u09AB\u09CD\u09B0\u09BE\u0987\u09B8 \u0993 \u09E8\u099F\u09BF \u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF\u0964',
    category: 'platters',
    image: '/images/dishes/feast.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Special Platter',
    addons: [
      { name: 'Extra Borhani (\u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF)', price: 70 },
      { name: 'Garlic Dip Bottle', price: 50 },
      { name: 'Extra Shahi Firni', price: 60 }
    ],
    portions: [
      { label: '4-REG Platter', serves: '4 Persons', price: 999, isDefault: true }
    ]
  },
  {
    id: 'peri-peri-fries',
    name: 'Artisan Peri-Peri Loaded Fries',
    nameBn: '\u09AA\u09C7\u09B0\u09BF-\u09AA\u09C7\u09B0\u09BF \u09B8\u09CD\u09AA\u09BE\u0987\u09B8\u09A1 \u0995\u09CD\u09B0\u09BF\u09B8\u09CD\u09AA\u09BF \u09AB\u09CD\u09B0\u09BE\u0987\u09B8',
    description: 'Hand-cut skin-on golden potato fries tossed in our proprietary 12-spice African bird\'s eye peri seasoning.',
    descriptionBn: '\u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u0986\u09AB\u09CD\u09B0\u09BF\u0995\u09BE\u09A8 \u09AA\u09C7\u09B0\u09BF \u09AE\u09B6\u09B2\u09BE\u09DF \u09AE\u09BE\u0996\u09BE\u09A8\u09CB \u09AE\u09C1\u099A\u09AE\u09C1\u099A\u09C7 \u0997\u09CB\u09B2\u09CD\u09A1\u09C7\u09A8 \u09AA\u099F\u09C7\u099F\u09CB \u09AB\u09CD\u09B0\u09BE\u0987\u09B8\u0964',
    category: 'sides',
    image: '/images/dishes/fries.png',
    isBestseller: false,
    isAvailable: true,
    tag: 'Crispy Snack',
    portions: [
      { label: 'Regular', serves: '1 Person', price: 140, isDefault: true },
      { label: 'Large Platter', serves: '2-3 Persons', price: 240, isDefault: false }
    ]
  },
  {
    id: 'royal-borhani',
    name: 'Heritage Spiced Shahi Borhani',
    nameBn: '\u0990\u09A4\u09BF\u098F\u09CD\u09AF\u09AC\u09BE\u09B9\u09C0 \u09B6\u09BE\u09B9\u09C0 \u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF',
    description: 'Old Dhaka\'s prized digestive yogurt beverage blended with fresh mint, coriander, roasted cumin, black salt, and green chili.',
    descriptionBn: '\u09AA\u09C1\u09A6\u09BF\u09A8\u09BE \u09AA\u09BE\u09A4\u09BE, \u09AD\u09BE\u099C\u09BE \u099C\u09BF\u09B0\u09BE \u0993 \u0996\u09BE\u0981\u099F\u09BF \u099F\u0995\u09A6\u0987\u09DF\u09C7\u09B0 \u0990\u09A4\u09BF\u098F\u09CD\u09AF\u09AC\u09BE\u09B9\u09C0 \u09B6\u09BE\u09B9\u09C0 \u09AC\u09CB\u09B0\u09B9\u09BE\u09A8\u09BF\u0964',
    category: 'drinks',
    image: '/images/dishes/borhani.png',
    isBestseller: false,
    isAvailable: true,
    tag: 'Traditional Cold',
    portions: [
      { label: '250ml Glass', serves: '1 Person', price: 70, isDefault: true },
      { label: '1 Litre Family Pitcher', serves: '4-5 Persons', price: 250, isDefault: false }
    ]
  }
];

export const MEGA_DEAL_DATA = {
  id: 'flame-mega-feast',
  title: '4 REG PLATTER MEGA DEAL',
  subtitle: '2x Flame Chicken + 2x Dum Kacchi + 4x Peri Fries + 2x Borhani',
  dealPrice: 999,
  originalPrice: 1480,
  savings: 481,
  discountPct: 33,
  badge: '33% OFF - Special Platter',
  image: '/images/dishes/feast.png',
  description: 'Limited-time culinary collaboration! Experience our two crowning glories together: 2x Lava-Seared Flame-Grilled Chicken Quarters, 2x Royal Basmati Dum Kacchi portions, 4x Crisp Peri-Peri Fries, and 2x chilled Shahi Borhani bottles.'
};
