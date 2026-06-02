import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'

import { useLanguage } from '../../contexts/LanguageContext'

export default function Minesweeper() {
  const { t } = useLanguage()
  const [grid, setGrid] = useState([])
  const [status, setStatus] = useState('playing') // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0)

  const TOTAL_BOMBS = 3
  const TOTAL_TILES = 16

  const initGame = () => {
    const newGrid = Array(TOTAL_TILES).fill(null).map(() => ({ isBomb: false, isRevealed: false }))
    let bombsPlaced = 0
    while (bombsPlaced < TOTAL_BOMBS) {
      const idx = Math.floor(Math.random() * TOTAL_TILES)
      if (!newGrid[idx].isBomb) {
        newGrid[idx].isBomb = true
        bombsPlaced++
      }
    }
    setGrid(newGrid)
    setStatus('playing')
    setScore(0)
  }

  useEffect(() => {
    initGame()
  }, [])

  const handleTileClick = (index) => {
    if (status !== 'playing' || grid[index].isRevealed) return

    const newGrid = [...grid]
    newGrid[index].isRevealed = true
    
    if (newGrid[index].isBomb) {
      setStatus('lost')
      // reveal all bombs
      newGrid.forEach((tile, i) => {
        if (tile.isBomb) newGrid[i].isRevealed = true
      })
    } else {
      const newScore = score + 1
      setScore(newScore)
      if (newScore === TOTAL_TILES - TOTAL_BOMBS) {
        setStatus('won')
      }
    }
    setGrid(newGrid)
  }

  return (
    <motion.div 
      animate={status === 'lost' ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="bg-primary-yellow border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative"
    >
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.minesweeper?.title || "Awas Ranjau Bug!"}</h3>
        <div className="font-mono font-bold bg-brutal-white px-3 py-1 border-[2px] border-brutal-black">
          {t.minesweeper?.score || "SKOR"}: {score}/{TOTAL_TILES - TOTAL_BOMBS}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="grid grid-cols-4 gap-2 md:gap-4 w-full aspect-square max-w-[300px]">
          {grid.map((tile, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              className={`
                w-full h-full rounded-xl border-[3px] border-brutal-black flex items-center justify-center text-3xl font-bold transition-all
                ${tile.isRevealed 
                  ? tile.isBomb ? 'bg-tertiary-pink shadow-none' : 'bg-brutal-white shadow-none' 
                  : 'bg-secondary-cyan shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A0A0A] cursor-pointer'
                }
              `}
              disabled={tile.isRevealed || status !== 'playing'}
            >
              {tile.isRevealed ? (tile.isBomb ? '🐛' : '✨') : '?'}
            </button>
          ))}
        </div>

        {/* Overlay for Win/Lose */}
        {status !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-brutal-black/80 flex flex-col items-center justify-center text-brutal-white rounded-xl backdrop-blur-sm p-4 text-center"
          >
            <h4 className="font-grotesk font-black text-4xl mb-2 text-primary-yellow">
              {status === 'won' ? (t.minesweeper?.winTitle || 'CLEAN CODE!') : (t.minesweeper?.loseTitle || 'SYSTEM CRASH!')}
            </h4>
            <p className="font-mono font-bold mb-6">
              {status === 'won' ? (t.minesweeper?.winDesc || 'You avoided all the bugs!') : (t.minesweeper?.loseDesc || 'You clicked a bug!')}
            </p>
            <BrutalButton variant="cyan" onClick={initGame}>
              {t.minesweeper?.retry || 'COBA LAGI ↻'}
            </BrutalButton>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
