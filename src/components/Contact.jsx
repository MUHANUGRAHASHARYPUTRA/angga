import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa"
import SectionLabel from "./ui/SectionLabel"
import SocialButton from "./ui/SocialButton"
import BrutalButton from "./ui/BrutalButton"
import BrutalCard from "./ui/BrutalCard"
import { useLanguage } from "../contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // WhatsApp direct link formulation
    const whatsappNumber = "6285398009506"
    const textMessage = `Halo Angga, nama saya ${formData.name}. ${formData.message}`
    const encodedMessage = encodeURIComponent(textMessage)
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
    
    // Reset form optionally
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 bg-primary-yellow relative border-y-[3px] border-brutal-black">
      <div className="container mx-auto px-6">
        
        <div className="mb-12">
          <SectionLabel color="bg-tertiary-pink text-brutal-white">{t.contact.title}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight max-w-2xl font-grotesk">
            {t.contact.sub}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Contact Info & Socials */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <BrutalCard className="flex-1 bg-brutal-white border-[2px] p-4 text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-bold font-mono">Makassar, Indonesia</div>
              </BrutalCard>
              <BrutalCard className="flex-1 bg-brutal-white border-[2px] p-4 text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-bold font-mono" style={{wordBreak: "break-all"}}>anugrahasharyabubakar@gmail.com</div>
              </BrutalCard>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SocialButton 
                icon={FaWhatsapp} 
                label="WhatsApp" 
                href="https://wa.me/6285398009506" 
                colorClass="bg-[#25D366] text-brutal-white" 
              />
              <SocialButton 
                icon={FaInstagram} 
                label="Instagram" 
                href="https://instagram.com/anggaashry" 
                colorClass="bg-tertiary-pink text-brutal-white" 
              />
              <SocialButton 
                icon={FaEnvelope} 
                label="Email Me" 
                href="mailto:anugrahasharyabubakar@gmail.com" 
                colorClass="bg-base-cream text-brutal-black" 
              />
              <SocialButton 
                icon={FaGithub} 
                label="GitHub" 
                href="https://github.com/MUHANUGRAHASHARYPUTRA" 
                colorClass="bg-brutal-black text-brutal-white" 
                shadowColor="#FFE500"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <BrutalCard className="bg-brutal-white">
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono font-bold uppercase text-sm">{t.contact.name}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-[3px] border-brutal-black p-3 font-sans outline-none focus:ring-[4px] ring-primary-yellow transition-shadow rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono font-bold uppercase text-sm">{t.contact.email}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-[3px] border-brutal-black p-3 font-sans outline-none focus:ring-[4px] ring-primary-yellow transition-shadow rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono font-bold uppercase text-sm">{t.contact.message}</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="border-[3px] border-brutal-black p-3 font-sans outline-none focus:ring-[4px] ring-primary-yellow transition-shadow rounded-none resize-none"
                ></textarea>
              </div>

              <BrutalButton 
                type="submit" 
                variant="black" 
                className="w-full mt-2"
              >
                {t.contact.send}
              </BrutalButton>
            </motion.form>
          </BrutalCard>

        </div>
      </div>
    </section>
  )
}
