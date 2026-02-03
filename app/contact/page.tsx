import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#f9abb9]/20">
      <Navbar />
      <ContactForm />
      <Footer />
    </main>
  )
}
