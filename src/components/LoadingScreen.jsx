import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsReady(true)
          setTimeout(onComplete, 800) // Wait for exit animation
          return 100
        }
        return prev + 2
      })
    }, 20)
    return () => clearInterval(timer)
  }, [onComplete])

  const letters = [
    { char: 'A', color: 'text-primary-yellow' },
    { char: 'N', color: 'text-brutal-white' },
    { char: 'G', color: 'text-secondary-cyan' },
    { char: 'G', color: 'text-brutal-white' },
    { char: 'A', color: 'text-tertiary-pink' },
  ]

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
    exit: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  }

  const letterVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 200, damping: 15 } 
    }
  }

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.8 } }
  }

  const progressVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.4 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-brutal-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top right status */}
      <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-sm text-brutal-white z-10">
        <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500' : 'bg-primary-yellow animate-pulse'}`}></div>
        <span>{isReady ? 'READY ✓' : 'INITIALIZING...'}</span>
      </div>

      {/* Decorative stars */}
      <motion.div 
        className="absolute top-20 left-20 text-secondary-cyan text-4xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute bottom-40 right-20 text-tertiary-pink text-5xl"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>

      {/* Name Letters */}
      <div className="flex gap-2 md:gap-6 z-10">
        {letters.map((item, index) => (
          <motion.div
            key={index}
            variants={letterVariants}
            className={`font-grotesk font-black text-6xl md:text-9xl tracking-tighter ${item.color}`}
            style={{
              textShadow: "4px 4px 0px #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF"
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <motion.div variants={taglineVariants} className="mt-8 flex flex-col items-center gap-2 z-10">
        <div className="h-1 w-full bg-primary-yellow"></div>
        <p className="font-mono text-brutal-white tracking-[0.3em] text-xs md:text-sm text-center">
          WEB DEVELOPER · UNHAS · 2006
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={progressVariants} className="absolute bottom-12 w-11/12 max-w-3xl z-10">
        <div className="flex justify-between items-end mb-2 font-mono">
          <span className="text-brutal-white text-sm">LOADING...</span>
          <span className="text-brutal-white text-xl font-bold">{progress}%</span>
        </div>
        <div className="h-6 w-full border-[3px] border-brutal-white p-0.5">
          <div 
            className="h-full bg-primary-yellow transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </motion.div>

      {/* Bottom left tag */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-secondary-cyan border-[2px] border-brutal-white px-2 py-1 font-mono text-xs font-bold text-brutal-black">
          v1.0 · 2025
        </div>
      </div>
    </motion.div>
  )
}
