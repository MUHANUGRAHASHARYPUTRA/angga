import { motion } from "framer-motion"
import PhotoFrame from "./ui/PhotoFrame"
import BrutalButton from "./ui/BrutalButton"
import { useLanguage } from "../contexts/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()
  const easeBounce = [0.34, 1.56, 0.64, 1]

  const title = "ANGGA"
  const letterVariants = {
    hidden: { opacity: 0, y: -50, rotate: -8 },
    visible: (i) => ({
      opacity: 1, y: 0, rotate: 0,
      transition: { delay: 0.1 + (i * 0.06), duration: 0.35, ease: easeBounce }
    })
  }

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 md:pt-24 md:pb-12 pattern-dots flex flex-col justify-start md:justify-center overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-grow">
        
        {/* Left Side Content */}
        <motion.div className="flex flex-col items-start gap-6 z-10 order-last md:order-none">
          {/* Tag badge - Delay 0 */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.4, ease: easeBounce, delay: 0.1 }}
            className="bg-secondary-cyan border-[2px] border-brutal-black px-4 py-2 font-mono text-xs font-bold shadow-[3px_3px_0px_#0A0A0A] flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-brutal-black"></div>
            {t.hero.open}
          </motion.div>

          {/* ANGGA Title */}
          <h1 
            className="text-7xl md:text-[96px] font-black leading-[0.9] tracking-tighter flex"
            style={{ textShadow: "4px 4px 0px #FFE500" }}
          >
            {[...title].map((char, i) => (
              <motion.span 
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.12 }}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle - Delay 380ms after letters */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
            className="text-3xl md:text-5xl font-black font-grotesk flex flex-wrap gap-3 items-center"
          >
            <span>{t.hero.role1}</span>
            <span className="bg-primary-yellow px-3 py-1 border-[3px] border-brutal-black shadow-[4px_4px_0px_#0A0A0A] rotate-2">
              {t.hero.role2}
            </span>
          </motion.div>

          {/* Description - Delay 500ms */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-lg md:text-xl max-w-md font-sans font-medium leading-relaxed"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA Buttons - Stagger */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.12 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 1.0 } }
            }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } } }}>
              <BrutalButton variant="primary" href="#projects">
                {t.hero.work}
              </BrutalButton>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } } }}>
              <BrutalButton variant="white" href="/cv.pdf" target="_blank">
                {t.hero.cv}
              </BrutalButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side Photo */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: -2 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeBounce }}
          className="flex justify-center z-10 mb-12 md:mb-0 mt-8 md:mt-0 order-first md:order-none"
        >
          <PhotoFrame />
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-brutal-black py-3 border-y-[3px] border-brutal-black overflow-hidden z-20 flex group">
        <div className="whitespace-nowrap flex w-max font-mono font-bold text-xl md:text-2xl tracking-widest animate-[marquee_15s_linear_infinite] group-hover:marquee-slow">
          {[...Array(4)].map((_, i) => (
            <span key={`a-${i}`} className="mx-4 text-primary-yellow hover:text-tertiary-pink hover:scale-110 transition-all duration-200 inline-block">
              WEB DEV · REACT · JAVASCRIPT · UI DESIGN · SISTEM INFORMASI · UNHAS · MAKASSAR ·
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  )
}
