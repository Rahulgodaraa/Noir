export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: number;
  quantity?: string;
  size?: string;
  bestFor?: string;
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
}

export const PRODUCTS: Product[] = [
  // ================= PERFUMES =================
  {
    id: 1,
    name: "Sabaya",
    category: "perfume",
    description: "Warm, graceful and timeless with rich yet soft elegance.",
    image: "/new/sabya.png",
    price: 699,
    size: "30ml",
    bestFor: "Evenings, parties, formal dinners",
    notes: { top: "Bergamot, Citrus", heart: "Rose, Jasmine", base: "Amber, Musk" }
  },
  {
    id: 2,
    name: "Seduction",
    category: "perfume",
    description: "Bold, intense and irresistibly magnetic.",
    image: "/new/4.png",
    price: 599,
    size: "30ml",
    bestFor: "Date nights, romantic evenings",
    notes: { top: "Spicy Pink Pepper", heart: "Orchid, Plum", base: "Vanilla, Patchouli" }
  },
  {
    id: 3,
    name: "Ehsaas",
    category: "perfume",
    description: "Delicate, soulful and emotionally captivating.",
    image: "/new/6.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Weddings, celebrations, special occasions",
    notes: { top: "White Flowers", heart: "Oud, Sandalwood", base: "Musk, Honey" }
  },
  {
    id: 4,
    name: "The Man",
    category: "perfume",
    description: "Strong, refined and commanding modern masculinity.",
    image: "/new/1.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Office, business meetings, leadership presence",
    notes: { top: "Cedarwood", heart: "Tobacco, Leather", base: "Vetiver, Oakmoss" }
  },
  {
    id: 5,
    name: "Boss",
    category: "perfume",
    description: "Sharp, bold and unapologetically powerful.",
    image: "/new/10.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Professional settings, confident personalities",
    notes: { top: "Ginger, Grapefruit", heart: "Sage, Cardamom", base: "Dry Woods, Incense" }
  },
  {
    id: 6,
    name: "Wanted",
    category: "perfume",
    description: "Mysterious, daring and addictive.",
    image: "/new/8.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Night outs, celebrations, bold statements",
    notes: { top: "Lemon, Mint", heart: "Tonka Bean, Ambroxan", base: "Cedar, Vanilla" }
  },
  {
    id: 7,
    name: "Cool Breeze",
    category: "perfume",
    description: "Fresh, calm and effortlessly soothing.",
    image: "/new/3.png",
    price: 699,
    size: "30ml",
    bestFor: "Daily wear, brunches, summer days",
    notes: { top: "Sea Salt, Ozone", heart: "Lavender, Sage", base: "White Musk" }
  },
  {
    id: 8,
    name: "Polo",
    category: "perfume",
    description: "Classic, confident and sophisticated.",
    image: "/new/7.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Afternoon gatherings, casual elegance",
    notes: { top: "Green Apple, Pine", heart: "Leather, Tobacco", base: "Patchouli" }
  },
  {
    id: 9,
    name: "Cool Wave",
    category: "perfume",
    description: "Crisp, elemental and refreshing.",
    image: "/new/2.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Daytime professional wear, summer evenings",
    notes: { top: "Cooling Mint", heart: "Geranium, Neroli", base: "Sandalwood, Amber" }
  },
  {
    id: 10,
    name: "Swag",
    category: "perfume",
    description: "Bold, charismatic and unapologetic.",
    image: "/new/12.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Nightlife, special events, strong presence",
    notes: { top: "Pepper, Bergamot", heart: "Lavender, Vetiver", base: "Ambrosia" }
  },

  // ================= CANDLES =================
  {
    id: 11,
    name: "Classic Glass Candle",
    category: "candle",
    description: "Simple • Elegant • Timeless. Crystal-clear premium glass jar.",
    image: "/images/candle-1.jpg",
    price: 599,
    quantity: "180 ml",
  },
  {
    id: 12,
    name: "Matte Luxe Candle",
    category: "candle",
    description: "Minimalist • Modern • Soft-touch finish in elegant colours.",
    image: "/images/candle-2.jpg",
    price: 649,
    quantity: "200 ml",
  },
  {
    id: 13,
    name: "Diamond Cut Crystal Candle",
    category: "candle",
    description: "Royal cut crystal jar with sculpted lid and premium detailing.",
    image: "/images/candle-3.jpg",
    price: 499,
    quantity: "120 ml",
  },
];
