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

  const logoText = "ANGGA."
  
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
        <div className="font-grotesk font-black text-2xl tracking-widest text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex">
            {[...logoText].map((char, i) => (
              <motion.span 
                key={i}
                initial={{ color: "#0A0A0A" }}
                whileInView={{ color: ["#0A0A0A", "#FFE500", "#00E5FF", "#FF2D78", "#FFE500"] }}
                viewport={{ once: false }}
                transition={{ duration: 1.2, delay: i * 0.1, times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <span className="text-sm font-mono text-brutal-white tracking-normal font-normal mt-1">© 2026</span>
        </div>

        {/* Center */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 font-mono text-sm uppercase"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {navKeys.map((key) => (
            <motion.a 
              key={key} 
              href={`#${key === "home" ? "" : key}`}
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="hover:text-primary-yellow transition-colors hover:underline decoration-[2px] underline-offset-4"
            >
              {t.nav[key]}
            </motion.a>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div 
          className="flex gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
        >
          {socials.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { scale: 0, opacity: 0, rotate: -45 }, visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
                whileHover={{ scale: 1.1, y: -4, rotate: 5, transition: { type: "spring" } }}
                className="w-10 h-10 border-[2px] border-brutal-white flex items-center justify-center hover:bg-brutal-white hover:text-brutal-black transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </footer>
  )
}
