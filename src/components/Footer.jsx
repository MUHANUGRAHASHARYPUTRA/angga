import { motion } from "framer-motion"
import { FaWhatsapp, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa"
import { useLanguage } from "../contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  const navKeys = ["home", "about", "skills", "projects", "contact"]
  
  const socials = [
    { icon: FaWhatsapp, href: "https://wa.me/6285398009506" },
    { icon: FaInstagram, href: "https://instagram.com/anggaashry" },
    { icon: FaEnvelope, href: "mailto:anugrahasharyabubakar@gmail.com" },
    { icon: FaGithub, href: "https://github.com/MUHANUGRAHASHARYPUTRA" }
  ]

  return (
    <footer className="bg-brutal-black border-t-[8px] border-primary-yellow relative overflow-hidden text-brutal-white pt-16 pb-8">
      {/* Decorative Stars */}
      <motion.div 
        className="absolute top-10 left-10 text-tertiary-pink text-3xl opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-primary-yellow text-4xl opacity-50"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Left */}
        <div className="text-primary-yellow font-grotesk font-black text-2xl tracking-widest text-center md:text-left">
          ANGGA. <br/>
          <span className="text-sm font-mono text-brutal-white tracking-normal font-normal">© 2025</span>
        </div>

        {/* Center */}
        <div className="flex flex-wrap justify-center gap-6 font-mono text-sm uppercase">
          {navKeys.map((key) => (
            <a 
              key={key} 
              href={`#${key === "home" ? "" : key}`}
              className="hover:text-primary-yellow transition-colors hover:underline decoration-[2px] underline-offset-4"
            >
              {t.nav[key]}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-[2px] border-brutal-white flex items-center justify-center hover:bg-brutal-white hover:text-brutal-black transition-all hover:-translate-y-1"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
