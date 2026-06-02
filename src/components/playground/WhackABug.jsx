import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'

import { useLanguage } from '../../contexts/LanguageContext'

export default function WhackABug() {
  const { t } = useLanguage()
  const [activeBug, setActiveBug] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [status, setStatus] = useState('idle') // 'idle', 'playing', 'finished'
  
  const timerRef = useRef(null)
  const bugTimerRef = useRef(null)

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setStatus('playing')
    scheduleNextBug()
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const endGame = () => {
    setStatus('finished')
    setActiveBug(null)
    clearInterval(timerRef.current)
    clearTimeout(bugTimerRef.current)
  }

  const scheduleNextBug = () => {
    setActiveBug(null)
    const delay = Math.random() * 500 + 300 // 0.3s to 0.8s
    
    bugTimerRef.current = setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * 6)
      setActiveBug(randomIdx)
      
      // Auto hide bug after short time
      const stayTime = Math.random() * 600 + 600 // 0.6s to 1.2s
      bugTimerRef.current = setTimeout(() => {
        scheduleNextBug()
      }, stayTime)
      
    }, delay)
  }

  const whack = (idx) => {
    if (status !== 'playing') return
    if (idx === activeBug) {
      setScore(s => s + 1)
      clearTimeout(bugTimerRef.current)
      setActiveBug(null)
      // schedule next immediately
      bugTimerRef.current = setTimeout(() => scheduleNextBug(), 200)
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      clearTimeout(bugTimerRef.current)
    }
  }, [])

  return (
    <div className="bg-secondary-cyan border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative" style={{ cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'48\' viewport=\'0 0 100 100\' style=\'fill:black;font-size:24px;\'><text y=\'50%\'>🔨</text></svg>") 16 16, auto' }}>
      
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.whackabug?.title || "Pukul Bug!"}</h3>
        <div className="flex gap-2 font-mono font-bold">
          <div className="bg-brutal-white px-3 py-1 border-[2px] border-brutal-black">
            ⏳ {timeLeft}s
          </div>
          <div className="bg-primary-yellow px-3 py-1 border-[2px] border-brutal-black">
            {t.whackabug?.score || "SKOR"}: {score}
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="grid grid-cols-3 gap-4 w-full max-w-[400px]">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="relative w-full aspect-[4/3] flex flex-col justify-end items-center">
              {/* Laptop screen back */}
              <div className="absolute inset-0 bg-brutal-black rounded-t-xl z-0"></div>
              <div className="absolute inset-2 bottom-4 bg-brutal-white/20 rounded-t-lg z-0"></div>
              
              {/* The Bug */}
              <AnimatePresence>
                {activeBug === idx && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="absolute bottom-6 text-5xl z-10 drop-shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
                    onMouseDown={() => whack(idx)}
                  >
                    🐛
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Laptop Keyboard (covers the bug when it hides) */}
              <div className="w-[120%] h-6 bg-brutal-black border-t-[2px] border-white/30 rounded-b-md z-20 flex justify-center pt-1">
                <div className="w-1/2 h-2 bg-brutal-white/20 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Overlays */}
        {status === 'idle' && (
          <div className="absolute inset-0 bg-brutal-black/80 flex flex-col items-center justify-center text-brutal-white rounded-xl backdrop-blur-sm p-4 text-center z-30">
            <h4 className="font-grotesk font-black text-3xl mb-4 text-primary-yellow">{t.whackabug?.title || "WHACK-A-BUG"}</h4>
            <BrutalButton variant="pink" onClick={startGame}>
              {t.whackabug?.start || "MULAI MAIN ▶"}
            </BrutalButton>
          </div>
        )}

        {status === 'finished' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-brutal-black/80 flex flex-col items-center justify-center text-brutal-white rounded-xl backdrop-blur-sm p-4 text-center z-30"
          >
            <h4 className="font-grotesk font-black text-4xl mb-2 text-primary-yellow">{t.whackabug?.timesUp || "TIME'S UP!"}</h4>
            <p className="font-mono font-bold mb-6">{t.whackabug?.result || "Kamu berhasil mukul"} {score} bug!</p>
            <BrutalButton variant="cyan" onClick={startGame}>
              {t.whackabug?.retry || "MAIN LAGI ↻"}
            </BrutalButton>
          </motion.div>
        )}
      </div>
    </div>
  )
}
