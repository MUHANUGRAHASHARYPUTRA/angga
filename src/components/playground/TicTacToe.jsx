import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'
import { useLanguage } from '../../contexts/LanguageContext'

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
]

export default function TicTacToe() {
  const { t } = useLanguage()
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [status, setStatus] = useState('playing') // 'playing', 'won_player', 'won_bot', 'draw'

  useEffect(() => {
    if (status === 'playing' && !isPlayerTurn) {
      const timer = setTimeout(() => {
        makeBotMove()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, status])

  const checkWinner = (squares) => {
    for (let i = 0; i < WIN_LINES.length; i++) {
      const [a, b, c] = WIN_LINES[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    if (!squares.includes(null)) return 'draw'
    return null
  }

  const handleSquareClick = (index) => {
    if (status !== 'playing' || !isPlayerTurn || board[index]) return

    const newBoard = [...board]
    newBoard[index] = 'X' // Player is always X
    setBoard(newBoard)
    
    const winner = checkWinner(newBoard)
    if (winner) {
      if (winner === 'X') setStatus('won_player')
      else if (winner === 'draw') setStatus('draw')
    } else {
      setIsPlayerTurn(false)
    }
  }

  const makeBotMove = () => {
    const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null)
    if (emptyIndices.length === 0) return

    // Dumb AI: random move, but let's make it slightly smart by blocking if needed
    let moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]

    // Simple block logic
    for (let i = 0; i < WIN_LINES.length; i++) {
      const [a, b, c] = WIN_LINES[i]
      const line = [board[a], board[b], board[c]]
      if (line.filter(v => v === 'X').length === 2 && line.filter(v => v === null).length === 1) {
        moveIndex = [a, b, c].find(idx => board[idx] === null)
        break
      }
    }

    const newBoard = [...board]
    newBoard[moveIndex] = 'O' // Bot is always O
    setBoard(newBoard)

    const winner = checkWinner(newBoard)
    if (winner) {
      if (winner === 'O') setStatus('won_bot')
      else if (winner === 'draw') setStatus('draw')
    } else {
      setIsPlayerTurn(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setStatus('playing')
  }

  return (
    <div className="bg-primary-yellow border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative">
      
      <div className="flex justify-between items-center mb-6 border-b-[4px] border-brutal-black pb-4">
        <h3 className="font-grotesk font-black text-2xl uppercase tracking-widest">{t.tictactoe?.title || "TIC-TAC-TOE BRUTAL"}</h3>
        <div className="font-mono font-bold flex gap-2">
          <span className={`px-2 py-1 border-[2px] border-brutal-black ${isPlayerTurn ? 'bg-secondary-cyan' : 'bg-brutal-white'}`}>{t.tictactoe?.player || "KAMU"} (X)</span>
          <span className={`px-2 py-1 border-[2px] border-brutal-black ${!isPlayerTurn ? 'bg-tertiary-pink text-white' : 'bg-brutal-white'}`}>{t.tictactoe?.bot || "BOT"} (O)</span>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[300px]">
          {board.map((val, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: val === null ? 0.95 : 1 }}
              onClick={() => handleSquareClick(idx)}
              className="aspect-square bg-brutal-white border-[4px] border-brutal-black shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-center text-5xl md:text-6xl font-black disabled:cursor-not-allowed"
              disabled={val !== null || status !== 'playing'}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: val ? 1 : 0 }}
                className={val === 'X' ? 'text-secondary-cyan drop-shadow-[2px_2px_0px_#0A0A0A]' : 'text-tertiary-pink drop-shadow-[2px_2px_0px_#0A0A0A]'}
              >
                {val}
              </motion.span>
            </motion.button>
          ))}
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {status !== 'playing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brutal-black/90 flex flex-col items-center justify-center text-brutal-white rounded-xl backdrop-blur-sm p-4 text-center z-30"
            >
              <h4 className={`font-grotesk font-black text-3xl md:text-4xl mb-2 ${status === 'won_player' ? 'text-secondary-cyan' : status === 'won_bot' ? 'text-tertiary-pink' : 'text-primary-yellow'}`}>
                {status === 'won_player' ? (t.tictactoe?.win || "Mustahil. Lu menang.") :
                 status === 'won_bot' ? (t.tictactoe?.lose || "Yah! Kalah sama bot HTML!") :
                 (t.tictactoe?.draw || "Cuma seri doang.")}
              </h4>
              <p className="font-mono font-bold mb-6">
                {status === 'won_player' ? "Gimana bisa..." : status === 'won_bot' ? "Malu-maluin sumpah." : "Mending main lagi deh."}
              </p>
              <BrutalButton variant="pink" onClick={resetGame}>
                {t.tictactoe?.retry || "TANTANG LAGI ↻"}
              </BrutalButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
