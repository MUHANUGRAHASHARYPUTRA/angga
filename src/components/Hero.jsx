import { motion } from "framer-motion"
import PhotoFrame from "./ui/PhotoFrame"
import BrutalButton from "./ui/BrutalButton"
import { useLanguage } from "../contexts/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } }
  }

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 md:pt-24 md:pb-12 pattern-dots flex flex-col justify-start md:justify-center">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-grow">
        
        {/* Left Side Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6 z-10 order-last md:order-none"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-secondary-cyan border-[2px] border-brutal-black px-4 py-2 font-mono text-xs font-bold shadow-[3px_3px_0px_#0A0A0A] flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-brutal-black"></div>
            {t.hero.open}
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-[96px] font-black leading-[0.9] tracking-tighter"
            style={{ textShadow: "4px 4px 0px #FFE500" }}
          >
            ANGGA
          </motion.h1>

          <motion.div variants={itemVariants} className="text-3xl md:text-5xl font-black font-grotesk flex flex-wrap gap-3 items-center">
            <span>{t.hero.role1}</span>
            <span className="bg-primary-yellow px-3 py-1 border-[3px] border-brutal-black shadow-[4px_4px_0px_#0A0A0A] rotate-2">
              {t.hero.role2}
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-md font-sans font-medium leading-relaxed">
            {t.hero.sub}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <BrutalButton variant="primary" onClick={() => window.location.href = '#projects'}>
              {t.hero.work}
            </BrutalButton>
            <BrutalButton variant="white" onClick={() => window.open('/cv.pdf', '_blank')}>
              {t.hero.cv}
            </BrutalButton>
          </motion.div>
        </motion.div>

        {/* Right Side Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", damping: 20 }}
          className="flex justify-center z-10 mb-12 md:mb-0 mt-8 md:mt-0 order-first md:order-none"
        >
          <PhotoFrame />
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-brutal-black py-3 border-y-[3px] border-brutal-black overflow-hidden z-20 flex">
        <motion.div 
          className="whitespace-nowrap flex font-mono text-primary-yellow font-bold text-xl md:text-2xl tracking-widest"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span className="mx-4">WEB DEV · REACT · JAVASCRIPT · UI DESIGN · SISTEM INFORMASI · UNHAS · MAKASSAR ·</span>
          <span className="mx-4">WEB DEV · REACT · JAVASCRIPT · UI DESIGN · SISTEM INFORMASI · UNHAS · MAKASSAR ·</span>
          <span className="mx-4">WEB DEV · REACT · JAVASCRIPT · UI DESIGN · SISTEM INFORMASI · UNHAS · MAKASSAR ·</span>
          <span className="mx-4">WEB DEV · REACT · JAVASCRIPT · UI DESIGN · SISTEM INFORMASI · UNHAS · MAKASSAR ·</span>
        </motion.div>
      </div>
    </section>
  )
}
