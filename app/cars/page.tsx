"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { ProductModal } from "@/components/product-modal"
import { CarCard } from "@/components/car-card"
import { cars, type Car } from "@/data/cars"

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInquire = (car: Car) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <ProductModal
        product={selectedCar}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        variant="cars"
      />

      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/g63background.png"
          alt="Cars"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif text-white uppercase"
          >
            Cars
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <CarCard car={car} onInquire={handleInquire} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
