import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'
import { useLanguage } from '../../contexts/LanguageContext'

const SYMBOLS = ['⚛️', '🟨', '🟧', '🟦', '🐛', '☕']
// Create pairs
const INITIAL_CARDS = [...SYMBOLS, ...SYMBOLS]

export default function MemoryMatch() {
  const { t } = useLanguage()
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [status, setStatus] = useState('idle') // idle, playing, won

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setStatus('playing')
  }

  const handleCardClick = (index) => {
    if (status !== 'playing') return
    if (flipped.length === 2) return // Prevent clicking more than 2
    if (flipped.includes(index) || matched.includes(index)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        // Match!
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === cards.length) {
          setStatus('won')
        }
      } else {
        // No match
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  return (
    <div className="bg-tertiary-pink border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative">
      
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.memorymatch?.title || "TEBAK KARTU"}</h3>
        <div className="font-mono font-bold bg-brutal-white px-3 py-1 border-[2px] border-brutal-black">
          {t.memorymatch?.moves || "LANGKAH"}: {moves}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-[400px]">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index)
            const isMatched = matched.includes(index)
            
            return (
              <div 
                key={index} 
                className="aspect-square relative perspective-1000 cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* Card Back (Unflipped) */}
                  <div className="absolute inset-0 backface-hidden bg-primary-yellow border-[3px] border-brutal-black shadow-[2px_2px_0px_#0A0A0A] rounded-lg flex items-center justify-center">
                    <span className="font-black text-2xl opacity-20">?</span>
                  </div>
                  
                  {/* Card Front (Flipped) */}
                  <div className="absolute inset-0 backface-hidden bg-brutal-white border-[3px] border-brutal-black shadow-[2px_2px_0px_#0A0A0A] rounded-lg flex items-center justify-center [transform:rotateY(180deg)]">
                    <span className={`text-3xl md:text-4xl ${isMatched ? 'opacity-50' : ''}`}>{card}</span>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {status === 'won' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brutal-black/80 flex flex-col items-center justify-center text-brutal-white rounded-xl backdrop-blur-sm p-4 text-center z-30"
            >
              <h4 className="font-grotesk font-black text-4xl mb-2 text-primary-yellow">
                {t.memorymatch?.win || "KAMU MENEBAK SEMUANYA!"}
              </h4>
              <p className="font-mono font-bold mb-6">
                Selesai dalam {moves} {t.memorymatch?.moves || "langkah"}.
              </p>
              <BrutalButton variant="cyan" onClick={initGame}>
                {t.memorymatch?.retry || "MAIN LAGI ↻"}
              </BrutalButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
