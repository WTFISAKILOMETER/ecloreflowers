"use client"

import Image from "next/image"
import { Cog, Gauge, Grid3x3, Users } from "lucide-react"
import type { Car } from "@/data/cars"
import { cn } from "@/lib/utils"

interface CarCardProps {
  car: Car
  onInquire: (car: Car) => void
  className?: string
}

const specIcons = {
  engine: Cog,
  seats: Users,
  zeroToSixty: Gauge,
  transmission: Grid3x3,
} as const

export function CarCard({ car, onInquire, className }: CarCardProps) {
  const hasDiscount = Boolean(car.pricing.original)

  return (
    <article
      className={cn(
        "glass bg-black/60 border border-[#f9abb9]/10 rounded-3xl overflow-hidden flex flex-col h-full",
        className,
      )}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={car.image}
          alt={car.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1 gap-5">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
            {car.title}
          </h3>
          {car.subtitle && (
            <p className="mt-1 text-base text-white/70">{car.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {(
            [
              { key: "engine" as const, label: "Engine", value: car.specs.engine },
              { key: "seats" as const, label: "Seats", value: car.specs.seats },
              { key: "zeroToSixty" as const, label: "0-60 mph", value: car.specs.zeroToSixty },
              { key: "transmission" as const, label: "Transmission", value: car.specs.transmission },
            ] as const
          ).map(({ key, label, value }) => {
            const Icon = specIcons[key]
            return (
              <div key={key} className="flex items-start gap-3 min-w-0">
                <Icon className="w-5 h-5 text-[#f9abb9] shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-sm text-white/90 leading-snug">
                  <span className="font-semibold text-white">{label}:</span>{" "}
                  <span className="text-white/80">{value}</span>
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-auto pt-1">
          {car.pricing.label && (
            <p className="text-sm text-white/60 mb-1">{car.pricing.label}</p>
          )}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {hasDiscount && (
              <span className="text-lg text-[#f9abb9]/70 line-through decoration-[#f9abb9]/50">
                {car.pricing.original}
              </span>
            )}
            <span className="text-2xl md:text-3xl font-semibold text-white">
              {car.pricing.amount}
            </span>
            {car.pricing.unit && (
              <span className="text-base text-white/70">{car.pricing.unit}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onInquire(car)}
          className="w-full px-6 py-3.5 bg-[#f9abb9] hover:bg-[#f9abb9]/90 text-black rounded-full text-sm font-semibold uppercase tracking-wide transition-colors"
        >
          Inquire
        </button>
      </div>
    </article>
  )
}
