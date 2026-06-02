import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import SectionLabel from "./ui/SectionLabel"

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Bouncy answer colors
  const answerColors = [
    "bg-primary-yellow",
    "bg-tertiary-pink",
    "bg-secondary-cyan"
  ]

  return (
    <section id="faq" className="py-24 bg-base-cream relative border-y-[3px] border-brutal-black overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pattern-grid-lg opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-start w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 text-left flex flex-col items-start"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
          >
            <SectionLabel color="bg-tertiary-pink text-brutal-white">{t.faq.title}</SectionLabel>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight font-grotesk uppercase">
            {t.faq.sub}
          </h2>
        </motion.div>

        {/* FAQ Chat Layout */}
        <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            const answerColor = answerColors[i % answerColors.length];
            
            return (
              <div key={i} className="flex flex-col gap-4">
                
                {/* Question Bubble (Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                  className="self-start max-w-[85%] flex items-end gap-3 group cursor-pointer"
                  onClick={() => toggleOpen(i)}
                >
                  <div className="text-3xl hidden md:block">🤔</div>
                  <div className="relative bg-white border-[4px] border-brutal-black rounded-[2rem] rounded-bl-sm p-4 md:p-6 shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#FF2D78] hover:-translate-y-1 transition-all">
                    <p className="font-sans font-bold text-lg md:text-xl text-brutal-black">
                      {item.q}
                    </p>
                    <div className="text-xs font-mono text-gray-500 mt-2 font-bold uppercase">
                      {t.faq.tapToView} {isOpen ? '⬆' : '⬇'}
                    </div>
                  </div>
                </motion.div>

                {/* Answer Bubble (Right) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: 100, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="self-end max-w-[85%] flex items-end gap-3 flex-row-reverse"
                    >
                      <div className="text-3xl hidden md:block">😎</div>
                      <div className={`relative ${answerColor} border-[4px] border-brutal-black rounded-[2rem] rounded-br-sm p-4 md:p-6 shadow-[6px_6px_0px_#0A0A0A]`}>
                        <p className="font-mono font-bold text-base md:text-lg text-brutal-black leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
