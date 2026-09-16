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
    address: 'Road 11, Block D, Banani Commercial Area, Dhaka',
    phone: '01711-223346',
    hours: '11:30 AM - 12:00 AM',
    isOpen: true,
    deliveryFee: 70,
    mapLink: 'https://maps.google.com/?q=Banani+11+Dhaka'
  },
  {
    id: 'uttara',
    name: 'Uttara Sector 7 - Cloud Hub',
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
    nameBn: 'বাসমতি কাচ্চি (Basmati Kacchi)',
    description: 'Traditional royal long-grain Basmati rice slow-dum cooked with melt-in-mouth tender marinated mutton chunks, whole baby potatoes, and fragrant saffron ghee.',
    descriptionBn: 'সুগন্ধি বাসমতি চাল ও খাঁটি ঘিয়ে রান্না করা রসালো খাসির মাংসের ঐতিহ্যবাহী দম কাচ্চি। সাথে পাবেন স্পেশাল আলু ও ডিম।',
    category: 'kacchi',
    image: '/images/dishes/kacchi.png',
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
    id: 'flame-peri-whole-chicken',
    name: 'Flame-Grilled Peri-Peri Chicken',
    nameBn: 'ফ্লেম-গ্রিলড পেরি-পেরি চিকেন (Flame Chicken)',
    description: '24-hour marinated whole chicken flame-seared over lava rocks. Crispy skin, succulent interior, brushed with your choice of artisan fiery sauce.',
    descriptionBn: '২৪ ঘণ্টার সিক্রেট মসলায় মেরিনেট করা লাভা রকে ফ্লেম-গ্রিলড আস্ত মুরগি। সাথে গোল্ডেন ফ্রাইজ ও রসুনের সস।',
    category: 'grilled',
    image: '/images/dishes/chicken.png',
    isBestseller: true,
    isAvailable: true,
    tag: '450°C Lava Seared',
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
    id: 'special-mutton-tehari',
    name: 'Special Mustard Mutton Tehari',
    nameBn: 'স্পেশাল মাটন তেহারি (Special Tehari)',
    description: 'Pungent pure cold-pressed mustard oil infused Chinigura rice tossed with spicy bite-sized tender mutton cuts, whole green chilies, and special garam masala blend.',
    descriptionBn: 'ঘানিভাঙা খাঁটি সরিষার তেলে রান্না করা ছোট সাইজের খাসির মাংসের সুস্বাদু পুরান ঢাকার তেহারি। কাঁচা মরিচের ঝাঁজালো স্বাদ।',
    category: 'tehari',
    image: '/images/dishes/tehari.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Mustard Infused',
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
    id: 'kacchi-khadok',
    name: 'Kacchi Khadok Platter',
    nameBn: 'কাচ্চি খাদক (Kacchi Khadok)',
    description: 'Specially crafted for meat lovers! Double mutton portion with caramelized saffron Basmati, 2 eggs, 2 golden spiced potatoes, and rich meat gravy.',
    descriptionBn: 'মাংসপ্রেমীদের জন্য বিশেষ কাচ্চি! ডাবল মাটন পিস, জাফরানি পোলাও, ২টি স্পেশাল আলু ও ২টি সেদ্ধ ডিম।',
    category: 'kacchi',
    image: '/images/dishes/kacchi.png',
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
      { label: '1:2', serves: '2 Persons', price: 1480, isDefault: true },
      { label: '1:4', serves: '4 Persons', price: 2890, isDefault: false }
    ]
  },
  {
    id: 'mega-chicken-feast',
    name: 'Mega Feast Platter Bucket',
    nameBn: 'মেগা ফিস্ট প্লাটার (Mega Feast)',
    description: 'The supreme commercial crowd pleaser! 8 pcs crispy flame chicken, 4 fiery wings, 2 loaded fries carton, and 2 chilled Borhani bottles.',
    descriptionBn: 'পারিবারিক বা বন্ধুদের আড্ডার সেরা কম্বো! ৮ পিস ক্রিস্পি চিকেন, ৪টি উইংস, ২টি ফ্রাইজ ও ২টি বোরহানী।',
    category: 'platters',
    image: '/images/dishes/feast.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Mega Platter',
    addons: [
      { name: 'Extra 4 Pcs Flame Wings', price: 180 },
      { name: 'Extra Garlic Mayo Dip', price: 50 },
      { name: 'Extra Shahi Firni', price: 60 }
    ],
    portions: [
      { label: 'Feast for 2', serves: '2 Persons', price: 699, isDefault: false },
      { label: 'Feast for 4', serves: '4 Persons', price: 1299, isDefault: true },
      { label: 'Jumbo 8', serves: '6-8 Persons', price: 2399, isDefault: false }
    ]
  },
  {
    id: 'chui-jhal-beef-bowl',
    name: 'Khulna Special Chui Jhal Beef Bowl',
    nameBn: 'চুই ঝাল গরুর গোস্ত ও ভাত (Chui Jhal Beef)',
    description: 'Authentic southern Bengal delicacy: Tender beef shank slow-simmered with aromatic wild Piper Chaba (Chui twig bark), served with fragrant hot steamed rice.',
    descriptionBn: 'খুলনার ঐতিহ্যবাহী সুগন্ধি চুইঝাল দিয়ে রান্না করা তুলতুলে নরম গরুর মাংস। ঝাঁজালো ও অতুলনীয় স্বাদ।',
    category: 'popular',
    image: '/images/dishes/chui_jhal.png',
    isBestseller: true,
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
    image: '/images/dishes/fiery_wings.png',
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
    id: 'peri-peri-fries',
    name: 'Crispy Peri-Peri Golden Fries',
    nameBn: 'পেরি-পেরি গোল্ডেন ফ্রাইজ (Peri Fries)',
    description: 'Fresh russet potatoes cut thick, fried to golden perfection and seasoned with signature secret spicy Peri-Peri blend.',
    descriptionBn: 'মুচমুচে ফ্রেশ গোল্ডেন আলু ভাজা, উপরে ছিটানো স্পাইসি পেরি-পেরি স্পেশাল মসলা।',
    category: 'sides',
    image: '/images/dishes/fries.png',
    isBestseller: false,
    isAvailable: true,
    tag: 'Hot & Crispy',
    addons: [
      { name: 'Melted Cheddar Cheese Dip', price: 60 },
      { name: 'Garlic Mayo Dip', price: 40 }
    ],
    portions: [
      { label: 'Regular', serves: '1 Person', price: 130, isDefault: true },
      { label: 'Large', serves: '2 Persons', price: 220, isDefault: false }
    ]
  },
  {
    id: 'royal-borhani-bottle',
    name: 'Traditional Shahi Borhani (Chilled)',
    nameBn: 'ঐতিহ্যবাহী শাহী বোরহানী (Borhani)',
    description: 'Rich thick yogurt blended with fresh mint leaves, coriander, roasted cumin, black salt, and green chili essence.',
    descriptionBn: 'খাঁটি মিষ্টি ও টক দই, পুদিনা, বিট লবণ ও ভাজা জিরার মিশ্রণে তৈরি রাজকীয় ঠাণ্ডা বোরহানী।',
    category: 'drinks',
    image: '/images/dishes/borhani.png',
    isBestseller: true,
    isAvailable: true,
    tag: 'Digestive Elixir',
    portions: [
      { label: '250ml', serves: '1 Person', price: 70, isDefault: true },
      { label: '500ml', serves: '2-3 Persons', price: 130, isDefault: false },
      { label: '1 Litre', serves: '4-6 Persons', price: 240, isDefault: false }
    ]
  },
  {
    id: 'shahi-firni-cup',
    name: 'Clay Pot Shahi Firni (Chilled)',
    nameBn: 'মাটির পাত্রের শাহী ফিরনি (Shahi Firni)',
    description: 'Slow-simmered rich condensed milk and crushed aromatic Chinigura rice infused with saffron, green cardamom, pistachios, and silver leaf.',
    descriptionBn: 'গাঢ় ঘন দুধ ও সুগন্ধি চালের মিশ্রণে তৈরি ঐতিহ্যবাহী জাফরানি শাহী ফিরনি। উপরে পেস্তাবাদাম ও কাজুবাদামের কুচি।',
    category: 'drinks',
    image: '/images/dishes/shahi_firni.png',
    isBestseller: false,
    isAvailable: true,
    tag: 'Royal Dessert',
    portions: [
      { label: '1 Clay Cup', serves: '1 Person', price: 80, isDefault: true },
      { label: 'Family Pack (4 Cups)', serves: '4 Persons', price: 300, isDefault: false }
    ]
  }
];

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
      name: '2x Flame Peri Quarters',
      subtitle: '+ Golden Peri Fries',
      image: '/images/dishes/chicken.png'
    },
    {
      name: '2x Mini Dum Kacchi',
      subtitle: '+ Boiled Egg & Potato',
      image: '/images/dishes/kacchi.png'
    },
    {
      name: '4x Peri-Peri Fries',
      subtitle: '+ Herb Garlic Dip',
      image: '/images/dishes/fries.png'
    },
    {
      name: '2x Chilled Borhani',
      subtitle: '+ Digest Elixir',
      image: '/images/dishes/borhani.png'
    }
  ]
};

export const INITIAL_COUPONS = [
  { code: 'FEAST100', discount: 100, type: 'fixed', minOrder: 800, isActive: true },
  { code: 'WELCOME50', discount: 50, type: 'fixed', minOrder: 400, isActive: true },
  { code: 'FLAME15', discount: 15, type: 'percent', minOrder: 1200, isActive: true }
];

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
];
