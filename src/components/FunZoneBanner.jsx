import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { useNavigate } from "react-router-dom"
import BrutalButton from "./ui/BrutalButton"

export default function FunZoneBanner() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <section className="py-16 bg-tertiary-pink border-y-[3px] border-brutal-black relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-40 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-5xl font-black font-grotesk uppercase tracking-tight mb-4 drop-shadow-[3px_3px_0px_#0A0A0A] text-brutal-white"
          >
            {t.funzone.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold max-w-xl"
          >
            {t.funzone.desc}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <button 
            onClick={() => navigate('/playground')}
            className="bg-secondary-cyan border-[4px] border-brutal-black px-8 py-5 text-xl font-black uppercase tracking-widest shadow-[8px_8px_0px_#0A0A0A] hover:shadow-[12px_12px_0px_#0A0A0A] hover:-translate-y-1 hover:-translate-x-1 transition-all active:translate-y-2 active:translate-x-2 active:shadow-none flex items-center gap-3 group"
          >
            {t.funzone.btn}
          </button>
        </motion.div>
      </div>

      {/* Decorative Stickers */}
      <div className="absolute top-4 right-1/4 text-4xl opacity-50 rotate-12 pointer-events-none">🎵</div>
      <div className="absolute bottom-4 left-1/3 text-4xl opacity-50 -rotate-12 pointer-events-none">🎮</div>
      <div className="absolute top-1/2 left-10 text-5xl opacity-50 rotate-45 pointer-events-none">👾</div>
    </section>
  )
}
