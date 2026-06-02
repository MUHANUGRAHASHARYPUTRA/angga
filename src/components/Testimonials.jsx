import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import SectionLabel from "./ui/SectionLabel"
import BrutalCard from "./ui/BrutalCard"

export default function Testimonials() {
  const { t } = useLanguage()
  
  const noteColors = ["bg-primary-yellow", "bg-tertiary-pink", "bg-secondary-cyan"]
  const stickers = ["⭐", "✨", "🔥"]
  const rotations = [-4, 3, -2]

  return (
    <section id="testimonials" className="py-24 bg-brutal-white relative border-y-[3px] border-brutal-black pattern-dots">
      <div className="container mx-auto px-6 relative z-10">
        
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
            <SectionLabel color="bg-primary-yellow">{t.testimonials.title}</SectionLabel>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight max-w-2xl font-grotesk uppercase">
            {t.testimonials.sub}
          </h2>
        </motion.div>

        {/* Board / Wall of Love */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0, rotate: 0 }}
              whileInView={{ y: 0, opacity: 1, rotate: rotations[i] }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05, 
                zIndex: 20,
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
              className="relative cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
            >
              {/* Tape Effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 border-[2px] border-brutal-black z-20 shadow-[2px_2px_0px_#0A0A0A] backdrop-blur-sm transform rotate-[-3deg]"></div>
              
              {/* Cute Pushpin */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 text-3xl drop-shadow-[2px_2px_0px_#0A0A0A]">
                📌
              </div>

              {/* Cute Sticker */}
              <div className="absolute -bottom-4 -right-4 z-30 text-4xl drop-shadow-[4px_4px_0px_#0A0A0A] hover:scale-125 transition-transform">
                {stickers[i]}
              </div>
              
              <BrutalCard 
                className={`h-full flex flex-col p-8 ${noteColors[i]} transition-colors duration-300 shadow-[8px_8px_0px_#0A0A0A] hover:shadow-[12px_12px_0px_#0A0A0A]`}
              >
                <div className="text-4xl font-serif font-black mb-4 opacity-50">"</div>
                <p className="font-sans font-bold text-lg leading-relaxed flex-grow">
                  {item.text}
                </p>
                <div className="mt-6 pt-4 border-t-[3px] border-brutal-black flex items-center justify-between">
                  <span className="font-grotesk font-black uppercase tracking-widest text-sm">
                    {item.name}
                  </span>
                  <div className="w-8 h-8 rounded-full border-[2px] border-brutal-black bg-brutal-white flex items-center justify-center font-bold font-mono text-xs">
                    {item.name.charAt(0)}
                  </div>
                </div>
              </BrutalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
