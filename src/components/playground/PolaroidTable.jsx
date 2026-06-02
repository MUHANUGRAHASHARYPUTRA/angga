import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export default function PolaroidTable() {
  const { t } = useLanguage()
  const constraintsRef = useRef(null)

  const polaroids = [
    {
      id: 1,
      image: "🐛",
      caption: t.polaroids?.c1 || "Bug? Bukan, ini fitur.",
      rotate: -12,
      x: -50,
      y: -20
    },
    {
      id: 2,
      image: "☕",
      caption: t.polaroids?.c2 || "Bahan bakar koding.",
      rotate: 8,
      x: 60,
      y: -40
    },
    {
      id: 3,
      image: "💻",
      caption: t.polaroids?.c3 || "Di laptop gue jalan kok.",
      rotate: -5,
      x: 0,
      y: 60
    },
    {
      id: 4,
      image: "🎯",
      caption: t.polaroids?.c4 || "Cuma nyenterin div aja susah.",
      rotate: 15,
      x: -80,
      y: 50
    }
  ]

  return (
    <div className="bg-primary-yellow border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative overflow-hidden">
      
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4 z-20 relative bg-primary-yellow">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.polaroids?.title || "MEJA BERANTAKAN"}</h3>
        <span className="font-mono font-bold px-3 py-1 bg-brutal-white border-[2px] border-brutal-black hidden md:block">
          {t.polaroids?.desc || "Geser-geser foto polaroid sesukamu."}
        </span>
      </div>

      <div 
        ref={constraintsRef}
        className="flex-grow w-full bg-orange-200/50 rounded-xl border-[4px] border-brutal-black relative overflow-hidden pattern-grid-lg"
      >
        {polaroids.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
            initial={{ rotate: item.rotate, x: item.x, y: item.y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brutal-white p-3 pb-8 md:p-4 md:pb-12 border-[4px] border-brutal-black shadow-[8px_8px_0px_#0A0A0A] cursor-grab flex flex-col items-center hover:z-40 transition-shadow"
            style={{ width: '160px' }}
          >
            <div className="w-full aspect-square bg-gray-200 border-[2px] border-brutal-black mb-3 flex items-center justify-center text-6xl">
              {item.image}
            </div>
            <p className="font-mono font-bold text-xs text-center w-full leading-tight">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
