export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  available: boolean;
};

const products = [
  {
    id: "ethiopian-sunrise",
    name: "Ethiopian Sunrise Blend",
    price: 18.5,
    category: "Coffee Beans",
    image: "/images/ethiopian-sunrise.svg",
    description: "Bright, floral, and citrus-forward beans from Yirgacheffe, roasted for a smooth morning cup.",
    available: true,
  },
  {
    id: "sidama-mocha",
    name: "Sidama Mocha Roast",
    price: 21,
    category: "Coffee Beans",
    image: "/images/sidama-mocha.svg",
    description: "A balanced roast with honey sweetness and notes of cocoa, ripe berries, and caramel.",
    available: true,
  },
  {
    id: "manual-brew-kit",
    name: "Manual Brew Kit",
    price: 42,
    category: "Brewing Gear",
    image: "/images/manual-brew-kit.svg",
    description: "A starter kit with a pour-over dripper, filter papers, and a small measuring scoop.",
    available: true,
  },
  {
    id: "ceramic-cup-set",
    name: "Ceramic Cup Set",
    price: 29,
    category: "Home Essentials",
    image: "/images/ceramic-cup-set.svg",
    description: "Hand-finished ceramic cups designed for slow sipping and rich espresso-style pours.",
    available: true,
  },
  {
    id: "travel-mug",
    name: "Travel Mug",
    price: 24.5,
    category: "Accessories",
    image: "/images/travel-mug.svg",
    description: "Insulated stainless-steel tumbler with a leak-resistant lid for daily commutes.",
    available: true,
  },
  {
    id: "espresso-grinder",
    name: "Espresso Grinder",
    price: 88,
    category: "Brewing Gear",
    image: "/images/espresso-grinder.svg",
    description: "A compact burr grinder with consistent grind control for espresso and pour-over recipes.",
    available: false,
  },
  {
    id: "honey-processed",
    name: "Honey Processed Lot",
    price: 19.75,
    category: "Coffee Beans",
    image: "/images/honey-processed.svg",
    description: "Sweet and syrupy cup profile with layered notes of mango, citrus zest, and brown sugar.",
    available: true,
  },
  {
    id: "brew-scale",
    name: "Precision Brew Scale",
    price: 34,
    category: "Accessories",
    image: "/images/brew-scale.svg",
    description: "A high-precision scale for consistent brewing ratios and repeatable cafe-style results.",
    available: true,
  },
  {
    id: "coffee-tasting-set",
    name: "Coffee Tasting Set",
    price: 36,
    category: "Bundles",
    image: "/images/coffee-tasting-set.svg",
    description: "Three small-lot coffees carefully selected for tasting, comparison, and discovery.",
    available: true,
  },
  {
    id: "milk-frother",
    name: "Barista Milk Frother",
    price: 26.5,
    category: "Accessories",
    image: "/images/milk-frother.svg",
    description: "Easy-to-use frother for smooth lattes, cappuccinos, and cafe-style drinks at home.",
    available: true,
  },
] satisfies Product[];

export default products;
