"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateDesired: undefined as Date | undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    const limitedNumber = phoneNumber.slice(0, 10)
    if (limitedNumber.length === 0) return ""
    if (limitedNumber.length <= 3) return `(${limitedNumber}`
    if (limitedNumber.length <= 6) return `(${limitedNumber.slice(0, 3)}) ${limitedNumber.slice(3)}`
    return `(${limitedNumber.slice(0, 3)}) ${limitedNumber.slice(3, 6)}-${limitedNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }))
  }

  const getPhoneDigits = (phone: string) => phone.replace(/\D/g, "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.dateDesired) {
      setError("Please select a date.")
      return
    }

    const phoneDigits = getPhoneDigits(formData.phone)
    if (phoneDigits.length !== 10) {
      setError("Phone number must be 10 digits.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: phoneDigits,
          dateDesired: formData.dateDesired.toISOString(),
          productTitle: "General Contact Inquiry",
          productPrice: "",
        }),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json().catch(() => ({ error: "Failed to submit form." }))
        setError(data.error || data.details || "Failed to submit form.")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setFormData({ name: "", phone: "", dateDesired: undefined })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-white/60">Concierge Service</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            Tell us about your vision and we will tailor the perfect arrangement.
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Looking for a custom bouquet, a corporate installation, or weekly florals? Send us your details and a member of our concierge team will text you back within the hour to finalize your order.
          </p>
          <div className="space-y-4 text-white/70">
            <p>Concierge hours: 8AM – 8PM EST, 7 days a week.</p>
            <p>We currently deliver throughout Washington D.C., Maryland, and Northern Virginia.</p>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 bg-black/40">
          {success ? (
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif text-white">Thank you</h2>
              <p className="text-white/70">
                Our concierge team will reach out shortly to confirm the details of your order.
              </p>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 text-black rounded-full font-medium transition-colors"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Date Needed</label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all text-left font-normal",
                        !formData.dateDesired && "text-black/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {formData.dateDesired ? (
                            format(formData.dateDesired, "PPP")
                          ) : (
                            <span className="text-black/40">Pick a date</span>
                          )}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-black/40" />
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass bg-black/40 backdrop-blur-xl border border-[#f9abb9]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl">
                    <Calendar
                      mode="single"
                      selected={formData.dateDesired}
                      onSelect={(date) => {
                        setFormData({ ...formData, dateDesired: date })
                        if (date) setDatePickerOpen(false)
                      }}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                      className="glass bg-transparent text-white [&_.rdp-button_previous]:text-white/70 [&_.rdp-button_previous]:hover:text-white [&_.rdp-button_previous]:hover:bg-[#f9abb9]/20 [&_.rdp-button_next]:text-white/70 [&_.rdp-button_next]:hover:text-white [&_.rdp-button_next]:hover:bg-[#f9abb9]/20 [&_.rdp-caption_label]:text-white [&_.rdp-weekday]:text-white/60 [&_.rdp-day]:text-white/80 [&_.rdp-day:hover]:bg-[#f9abb9]/20 [&_.rdp-day:hover]:text-white [&_.rdp-day[data-selected=true]]:bg-[#f9abb9] [&_.rdp-day[data-selected=true]]:text-black [&_.rdp-day[data-selected=true]]:font-semibold [&_.rdp-day[data-disabled=true]]:text-white/20 [&_.rdp-day[data-disabled=true]]:opacity-50"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-full font-medium transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
