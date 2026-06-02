import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useLanguage } from '../../contexts/LanguageContext'

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I'd like to make the world a better place, but they won't give me the source code.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "My code works, I don't know why. My code doesn't work, I don't know why.",
  "Hardware: The part of a computer that you can kick."
]

export default function RetroTV() {
  const { t } = useLanguage()
  const [isOn, setIsOn] = useState(false)
  const [channel, setChannel] = useState(1)
  const [isChanging, setIsChanging] = useState(false)
  const [isBooting, setIsBooting] = useState(false)
  const [joke, setJoke] = useState(JOKES[0])

  const changeChannel = () => {
    if (!isOn) return
    setIsChanging(true)
    setTimeout(() => {
      setChannel(prev => prev >= 3 ? 1 : prev + 1)
      if (channel === 1) { // next will be 2
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)])
      }
      setTimeout(() => setIsChanging(false), 200)
    }, 300)
  }

  const togglePower = () => {
    if (!isOn) {
      setIsOn(true)
      setIsBooting(true)
      // Intro sequence lasts ~3.5 seconds
      setTimeout(() => {
        setIsBooting(false)
        setIsChanging(true)
        setTimeout(() => setIsChanging(false), 300)
      }, 3500)
    } else {
      setIsOn(false)
      setIsBooting(false)
    }
  }

  return (
    <div className="bg-gray-400 border-[8px] border-brutal-black rounded-[3rem] p-6 shadow-[16px_16px_0px_#0A0A0A] w-full h-full flex flex-col md:flex-row relative gap-6">
      
      {/* Bunny Ears Antenna */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brutal-black rounded-full"></div>
        <div className="absolute bottom-2 left-1/2 w-1 h-24 bg-brutal-black origin-bottom -rotate-45"></div>
        <div className="absolute bottom-2 left-1/2 w-1 h-16 bg-brutal-black origin-bottom rotate-45"></div>
      </div>

      {/* Screen Area */}
      <div className="flex-grow border-[8px] border-brutal-black rounded-3xl bg-brutal-black p-2 relative overflow-hidden shadow-inner flex items-center justify-center min-h-[250px]">
        {/* Screen Glass Curve */}
        <div className="absolute inset-0 border-[6px] border-white/10 rounded-2xl pointer-events-none z-20"></div>
        
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-30 mix-blend-overlay"></div>
        
        {/* Screen Content */}
        {!isOn && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
          </div>
        )}

        {isOn && (
          <AnimatePresence mode="wait">
            {isBooting ? (
              <motion.div 
                key="boot"
                className="w-full h-full bg-blue-900 flex items-center justify-center p-6 text-center"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 1 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.4 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap justify-center gap-3 text-3xl font-black font-mono text-green-400 drop-shadow-[2px_2px_0px_#000]"
                >
                  {(t.retrotv?.intro || "Selamat datang di channel TV Angga!").split(" ").map((word, i) => (
                    <motion.span 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ) : isChanging ? (
              <motion.div 
                key="static"
                className="absolute inset-0 z-10 opacity-70"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
              ></motion.div>
            ) : (
              <motion.div 
                key={`ch-${channel}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full bg-blue-600 flex items-center justify-center text-brutal-white font-mono p-6 relative overflow-hidden text-center"
              >
                {/* Channel Indicator */}
                <div className="absolute top-4 right-6 text-2xl font-black text-green-400 drop-shadow-[2px_2px_0px_#000]">
                  CH {channel}
                </div>

                {channel === 1 && (
                  <div className="flex flex-col items-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="text-8xl mb-4"
                    >
                      🍩
                    </motion.div>
                    <p className="font-bold">Mmm... 3D CSS Donut</p>
                  </div>
                )}
                
                {channel === 2 && (
                  <div className="flex flex-col justify-center items-center h-full max-w-[80%]">
                    <p className="text-xl font-bold leading-relaxed">"{joke}"</p>
                  </div>
                )}

                {channel === 3 && (
                  <div className="w-full h-full bg-black flex items-center justify-center relative">
                    {/* Fake DVD bounce */}
                    <motion.div
                      animate={{ 
                        x: ['-40%', '40%', '-40%'], 
                        y: ['-30%', '30%', '-30%'] 
                      }}
                      transition={{ 
                        x: { duration: 4, ease: "linear", repeat: Infinity },
                        y: { duration: 3.1, ease: "linear", repeat: Infinity }
                      }}
                      className="text-4xl font-black text-primary-yellow drop-shadow-[2px_2px_0px_#0A0A0A]"
                    >
                      ANGGA
                    </motion.div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-24 bg-gray-300 border-[4px] border-brutal-black rounded-xl p-4 flex flex-row md:flex-col items-center justify-around gap-4 shadow-inner relative">
        
        {/* Power Button */}
        <motion.button 
          onClick={togglePower}
          animate={!isOn ? { scale: [1, 1.15, 1], boxShadow: ["2px 2px 0px #0A0A0A", "6px 6px 0px #ef4444", "2px 2px 0px #0A0A0A"] } : { scale: 1 }}
          transition={{ duration: 1.5, repeat: !isOn ? Infinity : 0 }}
          className={`w-12 h-12 rounded-full border-[3px] border-brutal-black flex items-center justify-center font-bold text-xl shadow-[2px_2px_0px_#0A0A0A] active:shadow-none active:translate-y-[2px] transition-colors ${isOn ? 'bg-red-500 text-white' : 'bg-brutal-white text-red-500'}`}
        >
          ⏻
        </motion.button>

        {/* Channel Dial */}
        <div className="flex flex-col items-center gap-2">
          <button 
            onClick={changeChannel}
            className="w-16 h-16 rounded-full bg-brutal-black flex items-center justify-center relative shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:rotate-12 transition-transform"
          >
            <div className="w-10 h-10 rounded-full border-[2px] border-gray-600 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-white"></div>
            </div>
          </button>
          <span className="font-bold text-xs uppercase">{t.retrotv?.tune || "TUNE"}</span>
        </div>

        {/* Speaker Grill */}
        <div className="hidden md:flex flex-col gap-2 w-full mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-1 bg-brutal-black rounded-full"></div>
          ))}
        </div>

      </div>
    </div>
  )
}
