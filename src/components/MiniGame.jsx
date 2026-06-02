import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import heroImg from '../assets/photo.jpg'

export default function MiniGame({ onClose, embedded = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  
  const [playerY, setPlayerY] = useState(0)
  const [obstacleX, setObstacleX] = useState(100)
  
  const playerRef = useRef(null)
  const obstacleRef = useRef(null)
  const requestRef = useRef()
  const scoreRef = useRef(0)
  const velocityY = useRef(0)
  const isJumping = useRef(false)
  
  const gravity = 0.6
  const jumpStrength = -10
  
  const startGame = () => {
    setIsPlaying(true)
    setIsGameOver(false)
    setScore(0)
    scoreRef.current = 0
    setPlayerY(0)
    setObstacleX(100)
    velocityY.current = 0
    isJumping.current = false
  }

  const jump = () => {
    if (!isJumping.current && !isGameOver) {
      velocityY.current = jumpStrength
      isJumping.current = true
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGameOver])

  const gameLoop = () => {
    if (isGameOver || !isPlaying) return

    // Update Player Y
    velocityY.current += gravity
    setPlayerY(prev => {
      let nextY = prev + velocityY.current
      if (nextY >= 0) {
        nextY = 0
        isJumping.current = false
      }
      return nextY
    })

    // Update Obstacle X
    setObstacleX(prev => {
      let nextX = prev - 1.5 // obstacle speed
      if (nextX < -10) {
        scoreRef.current += 1
        setScore(scoreRef.current)
        return 100 // reset to right side
      }
      return nextX
    })

    // Collision Detection
    if (playerRef.current && obstacleRef.current) {
      const pRect = playerRef.current.getBoundingClientRect()
      const oRect = obstacleRef.current.getBoundingClientRect()

      if (
        pRect.right > oRect.left + 10 &&
        pRect.left < oRect.right - 10 &&
        pRect.bottom > oRect.top + 10 &&
        pRect.top < oRect.bottom - 10
      ) {
        setIsGameOver(true)
        setIsPlaying(false)
      }
    }

    requestRef.current = requestAnimationFrame(gameLoop)
  }

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      requestRef.current = requestAnimationFrame(gameLoop)
    }
    return () => cancelAnimationFrame(requestRef.current)
  }, [isPlaying, isGameOver])

  const gameContent = (
    <div className={`w-full max-w-2xl bg-base-cream border-[4px] border-brutal-black p-6 relative overflow-hidden shadow-[16px_16px_0px_#FF2D78] ${embedded ? 'h-full flex flex-col justify-center shadow-none border-none' : ''}`}>
      <div className="flex justify-between items-center mb-4 border-b-[4px] border-brutal-black pb-4">
        <h2 className="font-grotesk font-black text-3xl uppercase tracking-widest">Angga Run</h2>
        <div className="font-mono font-bold text-2xl bg-brutal-black text-primary-yellow px-4 py-1">
          SCORE: {score}
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="w-full h-64 border-[3px] border-brutal-black bg-white relative overflow-hidden cursor-pointer"
        onClick={jump}
      >
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-2 bg-brutal-black"></div>

        {/* Player */}
        <div 
          ref={playerRef}
          className="absolute bottom-2 left-[10%] w-12 h-12 bg-primary-yellow border-[3px] border-brutal-black overflow-hidden flex items-center justify-center"
          style={{ transform: `translateY(${playerY}px)` }}
        >
          <img src={heroImg} alt="Player" className="w-full h-full object-cover" />
        </div>

        {/* Obstacle */}
        <div 
          ref={obstacleRef}
          className="absolute bottom-2 w-10 h-10 bg-tertiary-pink border-[3px] border-brutal-black flex items-center justify-center text-xl"
          style={{ left: `${obstacleX}%` }}
        >
          🐛
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {!isPlaying && !isGameOver && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center"
            >
              <p className="font-mono font-bold text-lg mb-4 text-center px-4">PRESS SPACE OR TAP TO JUMP OVER BUGS</p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame() }}
                className="bg-secondary-cyan border-[3px] border-brutal-black px-6 py-2 font-bold font-grotesk text-xl shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A]"
              >
                START GAME
              </button>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-brutal-black/90 flex flex-col items-center justify-center text-brutal-white"
            >
              <h3 className="font-grotesk font-black text-5xl mb-2 text-tertiary-pink">GAME OVER</h3>
              <p className="font-mono font-bold mb-6">YOU SURVIVED {score} BUGS</p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame() }}
                className="bg-primary-yellow text-brutal-black border-[3px] border-brutal-black px-6 py-2 font-bold font-grotesk text-xl shadow-[4px_4px_0px_#FFE500] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FFE500]"
              >
                TRY AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {score > 10 && (
        <div className="mt-4 p-3 bg-green-400 border-[3px] border-brutal-black font-mono font-bold text-sm">
          🏆 Achievement Unlocked: Bug Squasher!
        </div>
      )}
    </div>
  )

  if (embedded) {
    return gameContent
  }

  return (
    <div className="fixed inset-0 z-[100] bg-brutal-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-brutal-white border-[3px] border-brutal-black shadow-[4px_4px_0px_#FFE500] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FFE500] flex items-center justify-center transition-all z-10"
      >
        <FiX size={24} strokeWidth={4} />
      </button>
      {gameContent}
    </div>
  )
}
