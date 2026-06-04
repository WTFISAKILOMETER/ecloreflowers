export interface CarSpecs {
  engine: string
  seats: string
  zeroToSixty: string
  transmission: string
}

export interface CarPricing {
  label?: string
  original?: string
  amount: string
  unit?: string
}

export interface Car {
  id: string
  title: string
  subtitle?: string
  description: string
  image: string
  category: "luxury" | "suv" | "sports" | "experience"
  specs: CarSpecs
  pricing: CarPricing
  featured?: boolean
  /** Kept for modal/API compatibility */
  price: string
}

export const cars: Car[] = [
  {
    id: "brabus-g63",
    title: "Brabus G63 AMG",
    subtitle: "G-Wagon G63 Special Edition",
    price: "$1,100 /day",
    description:
      "Arrive in unmistakable style with our Brabus G63 AMG — the G-Wagon G63 Special Edition — finished in signature matte black with a bespoke floral welcome package upon delivery.",
    image: "/brabus-g63.png",
    category: "suv",
    featured: true,
    specs: {
      engine: "700+ hp",
      seats: "5",
      zeroToSixty: "4.1 sec",
      transmission: "Automatic",
    },
    pricing: {
      label: "Start from",
      original: "$1,300",
      amount: "$1,100",
      unit: "/day",
    },
  },
  {
    id: "lamborghini-huracan-yellow",
    title: "Lamborghini Huracan - Yellow",
    price: "$1,400 /day",
    description:
      "Make a bold entrance in this yellow Lamborghini Huracan — sharp lines, 610 hp, and an unforgettable drive for celebrations and special evenings.",
    image: "/lamborghini-huracan-yellow.png",
    category: "sports",
    featured: true,
    specs: {
      engine: "610 hp",
      seats: "2",
      zeroToSixty: "3.5 sec",
      transmission: "Automatic",
    },
    pricing: {
      label: "Start from",
      original: "$1,700",
      amount: "$1,400",
      unit: "/day",
    },
  },
  {
    id: "lamborghini-urus-ruby",
    title: "Lamborghini Urus Ruby",
    price: "$1,300 /day",
    description:
      "Command attention in this ruby pink Lamborghini Urus — widebody presence, 641 hp, and five-seat versatility for celebrations that demand something extraordinary.",
    image: "/lamborghini-urus-ruby.png",
    category: "suv",
    featured: true,
    specs: {
      engine: "641 hp",
      seats: "5",
      zeroToSixty: "3.5 sec",
      transmission: "Automatic",
    },
    pricing: {
      label: "Start from",
      original: "$1,500",
      amount: "$1,300",
      unit: "/day",
    },
  },
  {
    id: "mercedes-maybach-special-edition",
    title: "Mercedes-Benz Maybach Special Edition",
    price: "$1,100 /day",
    description:
      "Experience two-tone elegance in our Mercedes-Benz Maybach Special Edition — silver and forest green coachwork, 550 hp, and a refined cabin for weddings, galas, and private celebrations.",
    image: "/mercedes-maybach-special-edition.png",
    category: "luxury",
    featured: true,
    specs: {
      engine: "550 hp",
      seats: "5",
      zeroToSixty: "4.8 sec",
      transmission: "Automatic",
    },
    pricing: {
      label: "Start from",
      original: "$1,300",
      amount: "$1,100",
      unit: "/day",
    },
  },
]

export function getCarsByCategory(category: string): Car[] {
  if (category === "shop-all") return cars
  return cars.filter((c) => c.category === category)
}

export function getFeaturedCars(): Car[] {
  return cars.filter((c) => c.featured)
}

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id)
}
