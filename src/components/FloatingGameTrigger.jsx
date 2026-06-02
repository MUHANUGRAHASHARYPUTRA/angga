import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function FloatingGameTrigger() {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()

  if (location.pathname === '/playground') return null

  return (
    <>
      <motion.div 
        className="fixed bottom-12 left-0 z-40 flex items-center"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      >
        <button
          onClick={() => navigate('/playground')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 bg-tertiary-pink border-y-[3px] border-r-[3px] border-brutal-black py-3 px-4 shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all group rounded-r-2xl cursor-pointer"
        >
          <motion.div
            animate={
              isHovered 
                ? { rotate: [0, -20, 20, -20, 0], scale: 1.1 } 
                : { 
                    rotate: [0, -15, 15, -10, 10, 0, 0, 0, 0, 0],
                    scale: [1, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1] 
                  }
            }
            transition={
              isHovered 
                ? { duration: 0.5 } 
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="text-brutal-white drop-shadow-[2px_2px_0px_#0A0A0A]"
          >
            <FaGamepad size={28} />
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ width: 0, opacity: 0, overflow: 'hidden' }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="font-grotesk font-black text-brutal-white whitespace-nowrap text-sm"
              >
                {t.funzone?.title || "Yuk main game!"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </>
  )
}
