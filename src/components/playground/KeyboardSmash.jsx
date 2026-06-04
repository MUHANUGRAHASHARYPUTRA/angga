import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import BrutalButton from '../ui/BrutalButton'
import { useLanguage } from '../../contexts/LanguageContext'

const GIBBERISH = [
  "sudo rm -rf /",
  "function hackMainframe() {",
  "  bypassSecurity();",
  "  injectPayload();",
  "}",
  "git push origin master --force",
  "while(true) { spawn(virus); }",
  "const db = connect('classified');",
  "db.dropDatabase();",
  "console.log('I am in.');",
  "fetch('http://localhost/exploit')",
  "// TODO: remove evidence"
]

export default function KeyboardSmash() {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [codeLines, setCodeLines] = useState([])
  const [timeLeft, setTimeLeft] = useState(10)
  const [status, setStatus] = useState('idle')
  
  const timerRef = useRef(null)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const startGame = () => {
    setProgress(0)
    setCodeLines([])
    setTimeLeft(10)
    setStatus('playing')

    // Focus hidden input for mobile keyboard without scrolling the page
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }, 10)

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setStatus('lost')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const addProgress = useCallback(() => {
    if (status !== 'playing') return
    
    setProgress(p => {
      const newP = p + 3
      if (newP >= 100) {
        clearInterval(timerRef.current)
        setStatus('won')
        return 100
      }
      return newP
    })

    setCodeLines(lines => {
      const newLines = [...lines, GIBBERISH[Math.floor(Math.random() * GIBBERISH.length)]]
      if (newLines.length > 20) return newLines.slice(newLines.length - 20)
      return newLines
    })
  }, [status])

  const handleKeyDown = useCallback((e) => {
    if (status !== 'playing') return
    
    // Prevent scrolling when mashing space or arrows
    if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
      e.preventDefault()
    }
    
    addProgress()
  }, [addProgress, status])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [codeLines])

  const handlePointerDown = (e) => {
    e.preventDefault()
    addProgress()
    if (status === 'playing' && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <div className="bg-brutal-black border-[8px] border-tertiary-pink rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col relative text-green-500 font-mono">
      
      {/* Hidden input to bring up mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        className="absolute top-0 left-0 opacity-0 w-[1px] h-[1px] pointer-events-none z-[-1]"
        onChange={(e) => {
          addProgress()
          e.target.value = ''
        }}
        autoCapitalize="none"
        autoComplete="off"
        spellCheck="false"
      />

      <div className="flex justify-between items-center mb-4 border-b-[2px] border-green-500 pb-2">
        <h3 className="font-bold text-xl uppercase tracking-widest">root@ayya:~# HACKER_MODE</h3>
        <div className="flex gap-4 font-bold">
          <div>{t.keyboardsmash?.time || "TIME"}: {timeLeft}s</div>
        </div>
      </div>

      <div className="w-full h-6 border-[2px] border-green-500 mb-4 p-1">
        <div 
          className="h-full bg-green-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div 
        ref={containerRef}
        className="flex-grow bg-black/50 border-[2px] border-green-500/50 p-4 overflow-hidden relative cursor-pointer select-none touch-none"
        onPointerDown={handlePointerDown}
      >
        <div className="flex flex-col justify-end min-h-full">
          {codeLines.map((line, i) => (
            <div key={i} className="whitespace-pre">{line}</div>
          ))}
          {status === 'playing' && (
            <div className="animate-pulse">_</div>
          )}
        </div>

        {/* Overlays */}
        {status === 'idle' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4 z-30">
            <h4 className="font-bold text-2xl mb-4 text-green-400">{t.keyboardsmash?.title || "SEBERAPA CEPAT LU NGODING?"}</h4>
            <p className="mb-6 max-w-sm">{t.keyboardsmash?.desc || "Pencet sembarang tombol di keyboard secepat mungkin, ATAU tap layar berkali-kali untuk meretas sistem!"}</p>
            <BrutalButton variant="white" onClick={startGame}>
              {t.keyboardsmash?.start || "START HACKING"}
            </BrutalButton>
          </div>
        )}

        {status === 'lost' && (
          <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center text-center p-4 z-30 text-white">
            <h4 className="font-bold text-3xl mb-2">{t.keyboardsmash?.loseTitle || "ACCESS DENIED"}</h4>
            <p className="mb-6">{t.keyboardsmash?.loseDesc || "Jari lo kurang gesit bro."}</p>
            <BrutalButton variant="white" onClick={startGame}>
              {t.keyboardsmash?.retry || "RETRY"}
            </BrutalButton>
          </div>
        )}

        {status === 'won' && (
          <div className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center text-center p-4 z-30 text-white">
            <h4 className="font-bold text-3xl mb-2">{t.keyboardsmash?.winTitle || "ACCESS GRANTED"}</h4>
            <p className="mb-6">{t.keyboardsmash?.winDesc || "I'm in. Lu resmi jadi hacker."}</p>
            <BrutalButton variant="white" onClick={startGame}>
              {t.keyboardsmash?.retry || "RETRY"}
            </BrutalButton>
          </div>
        )}
      </div>
    </div>
  )
}
