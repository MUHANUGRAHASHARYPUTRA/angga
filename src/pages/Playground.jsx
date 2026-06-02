import { useState, useLayoutEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { useNavigate } from "react-router-dom"
import BrutalButton from "../components/ui/BrutalButton"
import MiniGame from "../components/MiniGame"
import Minesweeper from "../components/playground/Minesweeper"
import WhackABug from "../components/playground/WhackABug"
import KeyboardSmash from "../components/playground/KeyboardSmash"
import RetroTV from "../components/playground/RetroTV"
import MemoryMatch from "../components/playground/MemoryMatch"
import TicTacToe from "../components/playground/TicTacToe"
import ScreenSmasher from "../components/playground/ScreenSmasher"
import PolaroidTable from "../components/playground/PolaroidTable"

export default function Playground() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState('chill') // 'chill' or 'game'

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  return (
    <div className="min-h-screen pt-32 pb-24 bg-tertiary-pink pattern-dots relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header / Back Button */}
        <div className="w-full flex justify-between items-center mb-12">
          <BrutalButton variant="white" onClick={() => navigate('/')}>
            {t.playground.back}
          </BrutalButton>
          <h1 className="text-3xl md:text-5xl font-black font-grotesk text-brutal-white drop-shadow-[4px_4px_0px_#0A0A0A] uppercase tracking-widest text-center flex-1">
            {t.playground.title}
          </h1>
          <div className="w-[120px] hidden md:block"></div> {/* Spacer for centering */}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-16 relative z-20">
          <button 
            onClick={() => setActiveTab('chill')}
            className={`px-8 py-3 font-grotesk font-black text-xl uppercase tracking-wider border-[4px] border-brutal-black transition-all ${
              activeTab === 'chill' 
                ? 'bg-primary-yellow shadow-[4px_4px_0px_#0A0A0A] translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-brutal-white shadow-none hover:bg-gray-100'
            }`}
          >
            {t.playground.tabChill}
          </button>
          <button 
            onClick={() => setActiveTab('game')}
            className={`px-8 py-3 font-grotesk font-black text-xl uppercase tracking-wider border-[4px] border-brutal-black transition-all ${
              activeTab === 'game' 
                ? 'bg-secondary-cyan shadow-[4px_4px_0px_#0A0A0A] translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-brutal-white shadow-none hover:bg-gray-100'
            }`}
          >
            {t.playground.tabGame}
          </button>
        </div>

        {/* CHILL ZONE */}
        {activeTab === 'chill' && (
          <div className="w-full flex flex-col items-center gap-16">
            {/* Boombox Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-4xl bg-primary-yellow border-[8px] border-brutal-black rounded-3xl p-6 md:p-10 shadow-[16px_16px_0px_#0A0A0A] relative mb-24 flex flex-col items-center"
        >
          {/* Boombox Handle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2/3 h-16 border-t-[12px] border-x-[12px] border-brutal-black rounded-t-3xl bg-transparent -z-10"></div>
          
          <h2 className="text-2xl font-black font-mono mb-8 border-b-4 border-dashed border-brutal-black pb-2 w-full text-center uppercase tracking-widest">
            {t.playground.boombox}
          </h2>

          <div className="flex flex-col md:flex-row w-full gap-8 items-center justify-between">
            {/* Left Speaker */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[8px] border-brutal-black bg-brutal-white flex items-center justify-center shadow-inner relative overflow-hidden flex-shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[6px] border-brutal-black bg-secondary-cyan"></div>
              {/* Speaker Grille Pattern */}
              <div className="absolute inset-0 pattern-grid-lg opacity-30 rounded-full"></div>
            </div>

            {/* Center Cassette Deck (Spotify Iframe) */}
            <div className="w-full md:w-96 h-[352px] bg-brutal-black rounded-xl shadow-inner relative group border-[4px] border-brutal-black overflow-hidden flex items-center justify-center">
              
              {/* Spotify Embed - Angga's Playlist */}
              <iframe 
                style={{ borderRadius: '0px' }} 
                src="https://open.spotify.com/embed/playlist/4dWDoT3WBviqWbXK2aX8Rr?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                onLoad={() => setIsPlaying(true)}
              ></iframe>
            </div>

            {/* Right Speaker */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[8px] border-brutal-black bg-brutal-white flex items-center justify-center shadow-inner relative overflow-hidden flex-shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[6px] border-brutal-black bg-tertiary-pink"></div>
              {/* Speaker Grille Pattern */}
              <div className="absolute inset-0 pattern-grid-lg opacity-30 rounded-full"></div>
            </div>
          </div>
          
          {/* Boombox Controls */}
          <div className="mt-8 flex gap-4 bg-brutal-white p-4 border-[4px] border-brutal-black shadow-[4px_4px_0px_#0A0A0A]">
            <button className="w-12 h-8 bg-brutal-black text-brutal-white font-bold hover:-translate-y-1 transition-transform">⏪</button>
            <button className="w-16 h-8 bg-tertiary-pink border-[2px] border-brutal-black font-bold hover:-translate-y-1 transition-transform active:bg-red-500 shadow-[2px_2px_0px_#0A0A0A]">▶ / ⏸</button>
            <button className="w-12 h-8 bg-brutal-black text-brutal-white font-bold hover:-translate-y-1 transition-transform">⏩</button>
            <button className="w-12 h-8 bg-brutal-black text-brutal-white font-bold hover:-translate-y-1 transition-transform ml-4">⏏</button>
          </div>
        </motion.div>

          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="w-full min-h-[400px] md:min-h-[500px]"
            >
              <RetroTV />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2 }}
              className="w-full min-h-[400px] md:min-h-[500px]"
            >
              <PolaroidTable />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="w-full min-h-[400px] md:min-h-[500px] lg:col-span-2 lg:max-w-4xl lg:mx-auto"
            >
              <ScreenSmasher />
            </motion.div>
          </div>
        </div>
      )}

      {/* GAME ZONE */}
      {activeTab === 'game' && (
        <div className="w-full flex flex-col items-center gap-16">
          {/* Arcade Game Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-4xl font-black font-grotesk text-center text-brutal-white drop-shadow-[4px_4px_0px_#0A0A0A] mb-8 uppercase">
            {t.playground.arcade}
          </h2>
          
          <div className="bg-secondary-cyan border-[8px] border-brutal-black rounded-3xl p-6 shadow-[16px_16px_0px_#0A0A0A] relative flex flex-col items-center min-h-[500px]">
            {/* Embedded Game */}
            <div className="w-full h-full bg-brutal-black rounded-xl overflow-hidden border-[4px] border-brutal-white/20 relative">
              <MiniGame embedded={true} />
            </div>
            
            {/* Arcade Controls Deco */}
            <div className="mt-6 flex gap-12 text-5xl">
              <span className="opacity-50">🕹️</span>
              <span className="opacity-50 text-tertiary-pink">🔴</span>
              <span className="opacity-50 text-primary-yellow">🔵</span>
            </div>
          </div>
        </motion.div>

        {/* 3 New Game Modules Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full min-h-[500px]"
          >
            <Minesweeper />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="w-full min-h-[500px]"
          >
            <WhackABug />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full min-h-[500px]"
          >
            <KeyboardSmash />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="w-full min-h-[500px]"
          >
            <MemoryMatch />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full min-h-[500px]"
          >
            <TicTacToe />
          </motion.div>

        </div>
      </div>
      )}

      </div>
    </div>
  )
}
