import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { FiMenu, FiX, FiGlobe } from "react-icons/fi"
import BrutalButton from "./ui/BrutalButton"
import { useLanguage } from "../contexts/LanguageContext"
import { cn } from "../lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { lang, toggleLang, t } = useLanguage()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > 100 && latest > previous) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    
    if (latest > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  const navKeys = ["home", "about", "skills", "projects", "contact"]

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full bg-base-cream z-40 px-6 py-4 flex items-center justify-between transition-all duration-300",
          isScrolled ? "border-b-[3px] border-brutal-black" : "border-b-0 border-transparent"
        )}
      >
        <div className="font-grotesk font-black text-3xl">
          ANGGA<span className="text-primary-yellow">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-grotesk font-bold uppercase text-sm">
          {navKeys.map((key) => (
            <a 
              key={key} 
              href={`#${key === "home" ? "" : key}`}
              className="nav-link-hover py-2"
            >
              {t.nav[key]}
            </a>
          ))}
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 border-[2px] border-brutal-black px-3 py-1 bg-brutal-white shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0A0A0A] transition-all ml-2"
          >
            <FiGlobe size={16} />
            <span>{lang === 'id' ? 'ID' : 'EN'}</span>
          </button>

          <BrutalButton 
            variant="primary" 
            className="py-2 px-4 text-xs ml-2 relative overflow-hidden group"
            href="https://wa.me/6285398009506"
            target="_blank"
          >
            {t.nav.hire}
            {/* Particle placeholder - handled globally by physics now or customized later */}
          </BrutalButton>
        </div>

        {/* Mobile Toggle & Lang */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 border-[2px] border-brutal-black px-2 py-1 bg-brutal-white shadow-[2px_2px_0px_#0A0A0A] text-xs font-bold font-mono"
          >
            <FiGlobe size={14} />
            {lang.toUpperCase()}
          </button>
          <button 
            className="border-[2px] border-brutal-black p-2 bg-primary-yellow shadow-[2px_2px_0px_#0A0A0A]"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-primary-yellow z-50 flex flex-col justify-center px-8 border-l-[4px] border-brutal-black"
          >
            <button 
              className="absolute top-6 right-6 border-[3px] border-brutal-black p-2 bg-brutal-white shadow-[4px_4px_0px_#0A0A0A]"
              onClick={() => setIsOpen(false)}
            >
              <FiX size={32} />
            </button>
            
            <div className="flex flex-col gap-8 text-4xl font-grotesk font-black uppercase">
              {navKeys.map((key) => (
                <a 
                  key={key}
                  href={`#${key === "home" ? "" : key}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:translate-x-2 transition-transform hover:text-brutal-white"
                  style={{ textShadow: "2px 2px 0px #0A0A0A" }}
                >
                  {t.nav[key]}
                </a>
              ))}
              <div className="mt-8">
                <BrutalButton 
                  variant="white" 
                  className="w-full text-xl py-4"
                  href="https://wa.me/6285398009506"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.hire}
                </BrutalButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
