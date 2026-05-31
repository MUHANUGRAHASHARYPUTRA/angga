import { useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { FaWhatsapp, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa"
import SectionLabel from "./ui/SectionLabel"
import SocialButton from "./ui/SocialButton"
import BrutalButton from "./ui/BrutalButton"
import BrutalCard from "./ui/BrutalCard"
import { useLanguage } from "../contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [focusedField, setFocusedField] = useState(null)
  const buttonControls = useAnimation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Animate button bounce
    await buttonControls.start({
      scale: [1, 0.9, 1.1, 1],
      transition: { duration: 0.4 }
    })
    
    // WhatsApp direct link formulation
    const whatsappNumber = "6285398009506"
    const textMessage = `Halo Angga, nama saya ${formData.name}. ${formData.message}`
    const encodedMessage = encodeURIComponent(textMessage)
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
    
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 bg-primary-yellow relative border-y-[3px] border-brutal-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-12"
        >
          <SectionLabel color="bg-tertiary-pink text-brutal-white">{t.contact.title}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight max-w-2xl font-grotesk">
            {t.contact.sub}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Contact Info & Socials */}
          <motion.div 
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div variants={{ hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: "spring" } } }} className="flex-1">
                <BrutalCard className="bg-brutal-white border-[2px] p-4 text-center h-full">
                  <div className="text-2xl mb-2">📍</div>
                  <div className="font-bold font-mono">Makassar, Indonesia</div>
                </BrutalCard>
              </motion.div>
              <motion.div variants={{ hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: "spring" } } }} className="flex-1">
                <BrutalCard className="bg-brutal-white border-[2px] p-4 text-center h-full">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-bold font-mono text-sm md:text-base break-all">anugrahasharyabubakar<br/>@gmail.com</div>
                </BrutalCard>
              </motion.div>
            </div>

            <motion.div className="grid grid-cols-2 gap-4">
              {[
                { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/6285398009506", colorClass: "bg-[#25D366] text-brutal-white" },
                { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/anggaashry", colorClass: "bg-tertiary-pink text-brutal-white" },
                { icon: FaEnvelope, label: "Email Me", href: "mailto:anugrahasharyabubakar@gmail.com", colorClass: "bg-base-cream text-brutal-black" },
                { icon: FaGithub, label: "GitHub", href: "https://github.com/MUHANUGRAHASHARYPUTRA", colorClass: "bg-brutal-black text-brutal-white", shadowColor: "#FFE500" }
              ].map((btn, i) => (
                <motion.div key={i} variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.5 } } }}>
                  <SocialButton {...btn} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <BrutalCard className="bg-brutal-white">
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {['name', 'email', 'message'].map((field, i) => (
                  <motion.div 
                    key={field}
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex flex-col gap-2"
                  >
                    <label 
                      htmlFor={field} 
                      className={`font-mono font-bold uppercase text-sm transition-all duration-200 inline-block w-max ${focusedField === field ? 'translate-y-[-4px] bg-primary-yellow px-2 border-2 border-brutal-black' : 'translate-y-0'}`}
                    >
                      {t.contact[field]}
                    </label>
                    {field === 'message' ? (
                      <textarea 
                        id={field} 
                        name={field}
                        rows="4"
                        required
                        value={formData[field]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        className="border-[3px] border-brutal-black p-3 font-sans outline-none focus:ring-[4px] ring-primary-yellow transition-shadow rounded-none resize-none bg-base-cream"
                      ></textarea>
                    ) : (
                      <input 
                        type={field === 'email' ? 'email' : 'text'} 
                        id={field} 
                        name={field}
                        required
                        value={formData[field]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        className="border-[3px] border-brutal-black p-3 font-sans outline-none focus:ring-[4px] ring-primary-yellow transition-shadow rounded-none bg-base-cream"
                      />
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.8, type: "spring" }}
                  animate={buttonControls}
                >
                  <BrutalButton 
                    type="submit" 
                    variant="black" 
                    className="w-full mt-2"
                  >
                    {t.contact.send}
                  </BrutalButton>
                </motion.div>
              </form>
            </BrutalCard>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
