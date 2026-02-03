export interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
  category: "roses" | "peonies" | "hydrangeas" | "mixed"
  featured?: boolean // For best sellers section
}

export const products: Product[] = [
  {
    id: "1",
    title: "Signature Bouquet",
    price: "$249.99",
    description: "Florist's special! This large hand-crafted bouquet is made with professionally curated in-season blooms, wrapped in premium heavyweight paper and finished with a ribbon of your choice.",
    image: "/1.png",
    category: "mixed",
    featured: true,
  },
  {
    id: "2",
    title: "Large Rose Round Box",
    price: "$499.99",
    description: "A stunning arrangement of 150 premium roses arranged in a beautiful velvet lined round box with 24kt Eclore branding. Perfect for grand gestures and special celebrations.",
    image: "/2.png",
    category: "roses",
    featured: true,
  },
  {
    id: "3",
    title: "Classic 100 Roses",
    price: "$399.99",
    description: "A hundred flawless long-stem Ecuadorian roses chosen for their size, shape, and texture wrapped in heavy paper with your choice of ribbon and color.",
    image: "/3.png",
    category: "roses",
    featured: true,
  },
  {
    id: "4",
    title: "Mixed Color Hydrangeas",
    price: "$199.99",
    description: "A lush, full arrangement of mixed-color hydrangeas, showcasing layered hues and cloud-like blooms for a soft, elegant statement. ",
    image: "/4.png",
    category: "hydrangeas",
    featured: true,
  },
  {
    id: "5",
    title: "150 Powder Pink Roses",
    price: "$549",
    description: "A cloud-like presentation of 150 powder pink roses, meticulously hand-arranged for maximum volume, depth, and romance.",
    image: "/IMG_1344.png",
    category: "roses",
  },
  {
    id: "6",
    title: "Mixed Hydrangea Box",
    price: "$299",
    description: "Elegant powder pink and alabaster hydrangeas overflowing from a round blush hat box, finished with cascading satin ribbons.",
    image: "/IMG_1329.png",
    category: "hydrangeas",
  },
  {
    id: "7",
    title: "Pink & White Peonies Bouquet",
    price: "$250",
    description: "A lush hand-tied bouquet of alternating powder pink and soft white peonies, wrapped in blush paper with trailing ribbons.",
    image: "/IMG_1351.png",
    category: "peonies",
  },
  {
    id: "8",
    title: "Baby Pink & White Roses",
    price: "$199",
    description: "A romantic cluster of baby pink and creamy white roses gathered in a modern wrap for effortless gifting.",
    image: "/IMG_4705.png",
    category: "roses",
  },
  {
    id: "9",
    title: "White Hydrangeas",
    price: "$199",
    description: "A voluminous arrangement of pristine white hydrangeas presented in an oversized blush hat box with cascading ribbons.",
    image: "/IMG_1323.jpg",
    category: "hydrangeas",
  },
  {
    id: "10",
    title: "Mixed White Bouquet",
    price: "$199",
    description: "Pure white roses, peonies, and hydrangeas gathered into an abundant bouquet wrapped in layers of blush tissue.",
    image: "/IMG_1350.jpg",
    category: "hydrangeas",
  },
  {
    id: "11",
    title: "Mixed White Bouquet",
    price: "$199",
    description: "Pure white roses, peonies, and hydrangeas gathered into an abundant bouquet wrapped in layers of blush tissue.",
    image: "/IMG_1350.jpg",
    category: "roses",
  },
  {
    id: "12",
    title: "Mixed White Bouquet",
    price: "$199",
    description: "Pure white roses, peonies, and hydrangeas gathered into an abundant bouquet wrapped in layers of blush tissue.",
    image: "/IMG_1350.jpg",
    category: "peonies",
  },
  {
    id: "13",
    title: "Small Blue and Pink Hydrangeas",
    price: "$89.99",
    description: "A petite hat box overflowing with soft blue and pastel pink hydrangea blooms for an effortless gift.",
    image: "/IMG_4734.jpeg",
    category: "hydrangeas",
  },
  {
    id: "14",
    title: "Blush Hydrangea & Rose Hat Box",
    price: "$199",
    description: "A round blush hat box filled with alternating blush hydrangeas and clustered roses for a grand, romantic gesture.",
    image: "/IMG_4736.png",
    category: "hydrangeas",
  },
  {
    id: "15",
    title: "Blush Hydrangea & Rose Hat Box",
    price: "$199",
    description: "A round blush hat box filled with alternating blush hydrangeas and clustered roses for a grand, romantic gesture.",
    image: "/IMG_4736.png",
    category: "roses",
  },
  {
    id: "16",
    title: "150 Rose Box",
    price: "$499.99",
    description: "A luxury velvet hat box packed with 150 hand-selected roses and wrapped with cascading satin ribbons.",
    image: "/IMG_1331.png",
    category: "roses",
  },
]

// Helper functions
export function getProductsByCategory(category: string): Product[] {
  if (category === "shop-all") return products
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}


