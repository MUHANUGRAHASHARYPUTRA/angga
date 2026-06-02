import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import SectionLabel from "./ui/SectionLabel"

export default function DailySetup() {
  const { t } = useLanguage()
  const [activeItem, setActiveItem] = useState(null)

  // We map the items from translations to their visual properties
  const deskItems = [
    {
      id: "laptop",
      label: t.setup.items.laptop,
      style: "w-48 h-32 md:w-64 md:h-40 bg-gray-200 border-[4px] border-brutal-black rounded-lg relative flex items-center justify-center top-10 left-10 md:top-20 md:left-24",
      emoji: "💻"
    },
    {
      id: "keyboard",
      label: t.setup.items.keyboard,
      style: "w-40 h-16 md:w-56 md:h-20 bg-primary-yellow border-[4px] border-brutal-black grid grid-cols-5 gap-1 p-2 absolute bottom-10 left-16 md:bottom-16 md:left-32",
      emoji: "⌨️"
    },
    {
      id: "coffee",
      label: t.setup.items.coffee,
      style: "w-12 h-12 md:w-16 md:h-16 bg-tertiary-pink border-[4px] border-brutal-black rounded-full absolute top-16 right-12 md:top-32 md:right-32 flex items-center justify-center",
      emoji: "☕"
    }
  ]

  return (
    <section id="setup" className="py-24 bg-secondary-cyan relative border-y-[3px] border-brutal-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 w-full text-left flex flex-col items-start"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
          >
            <SectionLabel color="bg-brutal-white">{t.setup.title}</SectionLabel>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight max-w-2xl font-grotesk uppercase text-brutal-black">
            {t.setup.sub}
          </h2>
        </motion.div>

        {/* Desk Area */}
        <motion.div 
          className="w-full max-w-4xl h-80 md:h-96 bg-[#D8BA8E] border-[8px] border-brutal-black relative shadow-[16px_16px_0px_#0A0A0A] mx-auto mt-8 cursor-crosshair"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", damping: 15 }}
        >
          {/* Wood Grain Lines (Decorative) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #000 20px, #000 22px)' }}></div>

          {deskItems.map((item, index) => {
            const isActive = activeItem === item.id;
            
            return (
            <motion.div
              key={item.id}
              className={`absolute group ${item.style} cursor-pointer`}
              onClick={() => setActiveItem(isActive ? null : item.id)}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 300, damping: 15 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: index % 2 === 0 ? 5 : -5,
                y: -10,
                boxShadow: "8px 8px 0px #0A0A0A",
                zIndex: 40
              }}
              animate={isActive ? {
                scale: 1.1, 
                rotate: index % 2 === 0 ? 5 : -5,
                y: -10,
                boxShadow: "8px 8px 0px #0A0A0A",
                zIndex: 40
              } : {}}
            >
              <span className="text-3xl md:text-4xl opacity-50 select-none pointer-events-none">{item.emoji}</span>
              
              {/* Tooltip */}
              <div className={`absolute -top-12 left-1/2 -translate-x-1/2 ${isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity pointer-events-none bg-brutal-black text-primary-yellow font-mono text-xs md:text-sm font-bold px-3 py-1 whitespace-nowrap z-50`}>
                {item.label}
                {/* Tooltip triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-t-[4px] border-t-brutal-black border-r-[4px] border-r-transparent"></div>
              </div>

              {/* Keyboard Keys (only for keyboard item) */}
              {item.id === "keyboard" && (
                <div className="absolute inset-0 grid grid-cols-5 gap-1 p-2 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-brutal-white border-2 border-brutal-black"></div>
                  ))}
                </div>
              )}
            </motion.div>
            )
          })}
          
        </motion.div>
      </div>
    </section>
  )
}
