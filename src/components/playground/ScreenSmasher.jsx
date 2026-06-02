import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'
import { useLanguage } from '../../contexts/LanguageContext'

// Simple SVG for a crack
const CrackSVG = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[2px_2px_0px_#0A0A0A]" fill="none" stroke="white" strokeWidth="2">
    <path d="M50 50 L30 10 M50 50 L80 20 M50 50 L90 60 M50 50 L60 90 M50 50 L20 80 M50 50 L10 40 M30 10 L15 5 M80 20 L95 15 M90 60 L98 70 M60 90 L70 98" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 50 L40 30 L20 25 M50 50 L65 40 L85 35 M50 50 L55 70 L45 90 M50 50 L35 60 L15 65" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
  </svg>
)

export default function ScreenSmasher() {
  const { t } = useLanguage()
  const [cracks, setCracks] = useState([])
  const [isShaking, setIsShaking] = useState(false)

  const handleSmash = (e) => {
    // Get coordinates relative to the container
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newCrack = {
      id: Date.now(),
      x,
      y,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1.5
    }
    
    setCracks([...cracks, newCrack])
    
    // Shake effect
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 200)
  }

  const resetScreen = (e) => {
    e.stopPropagation()
    setCracks([])
  }

  return (
    <motion.div 
      animate={isShaking ? { x: [-10, 10, -10, 10, 0], y: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.2 }}
      className="bg-secondary-cyan border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative"
    >
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4 z-20">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.screensmasher?.title || "HANCURKAN LAYAR"}</h3>
        <BrutalButton variant="white" onClick={resetScreen} disabled={cracks.length === 0}>
          {t.screensmasher?.reset || "SAPU KACA 🧹"}
        </BrutalButton>
      </div>

      <div 
        className="flex-grow w-full bg-brutal-black rounded-xl border-[4px] border-gray-600 relative overflow-hidden cursor-crosshair"
        onClick={handleSmash}
      >
        <AnimatePresence>
          {cracks.length === 0 && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-brutal-white opacity-50 p-6 text-center pointer-events-none"
            >
              <span className="font-mono text-xl">{t.screensmasher?.desc || "Ketuk layar untuk memecahkan kaca dan melepaskan stresmu."}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {cracks.map((crack) => (
          <motion.div
            key={crack.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: crack.scale, opacity: 1 }}
            className="absolute pointer-events-none"
            style={{
              left: crack.x,
              top: crack.y,
              transform: `translate(-50%, -50%) rotate(${crack.rotation}deg)`
            }}
          >
            <CrackSVG />
          </motion.div>
        ))}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      </div>
    </motion.div>
  )
}
