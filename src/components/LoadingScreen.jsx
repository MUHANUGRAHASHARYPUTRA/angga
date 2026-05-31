import { useEffect, useState, useMemo } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0) // Tracks sequence timing
  const [progress, setProgress] = useState(0)
  const [exitPhase, setExitPhase] = useState(-1)
  
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Generate random squiggles once
  const squiggles = useMemo(() => {
    const symbols = ['~', '∿', '(', '⌒', 'ʃ', '◠', '◡']
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 12 + Math.random() * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 1.2
    }))
  }, [])

  // Generate random explosion trajectories for stickers
  const explosionData = useMemo(() => {
    return Array.from({ length: 6 }).map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      rot: (Math.random() < 0.5 ? 1 : -1) * (360 + Math.random() * 360)
    }))
  }, [])

  // Master sequence
  useEffect(() => {
    // 0ms -> squiggles fade in (handled by css animation delay)
    // 100ms -> Bars appear
    const t1 = setTimeout(() => setStage(1), 100)
    // 300ms -> Sticker 1
    const t2 = setTimeout(() => setStage(2), 300)
    // 450ms -> Sticker 2
    const t3 = setTimeout(() => setStage(3), 450)
    // 580ms -> Sticker 3
    const t4 = setTimeout(() => setStage(4), 580)
    // 700ms -> Sticker 4
    const t5 = setTimeout(() => setStage(5), 700)
    // 800ms -> Hai text
    const t6 = setTimeout(() => setStage(6), 800)
    // 820ms -> Sticker 5
    const t7 = setTimeout(() => setStage(7), 820)
    // 940ms -> Sticker 6
    const t8 = setTimeout(() => setStage(8), 940)
    // 980ms -> Welcome text
    const t9 = setTimeout(() => setStage(9), 980)
    // 1260ms -> Emoji wave
    const t10 = setTimeout(() => setStage(10), 1260)
    // 1500ms -> Progress bar
    const t11 = setTimeout(() => setStage(11), 1500)

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11].forEach(clearTimeout)
    }
  }, [])

  // Progress bar logic
  useEffect(() => {
    if (stage >= 11 && progress < 100 && exitPhase === -1) {
      const timer = setInterval(() => {
        setProgress(p => {
          const inc = 1.5 + Math.random() * 4
          const next = p + inc
          if (next >= 100) {
            clearInterval(timer)
            // Trigger exit sequence after 500ms pause
            setTimeout(() => {
              startExitSequence()
            }, 500)
            return 100
          }
          return next
        })
      }, 50)
      return () => clearInterval(timer)
    }
  }, [stage, progress, exitPhase])

  const startExitSequence = () => {
    setExitPhase(1) // Phase 1 & 2: Stickers explode, bars fade out
    
    setTimeout(() => {
      setExitPhase(3) // Phase 3: Center text exits
    }, 250)
    
    setTimeout(() => {
      setExitPhase(4) // Phase 4: Yellow wipe IN
    }, 420)
    
    setTimeout(() => {
      setExitPhase(5) // Phase 5: Yellow wipe OUT
    }, 420 + 560)
    
    setTimeout(() => {
      onComplete()
    }, 420 + 560 + 500)
  }

  // Helper for Sticker entrance & exit
  const getStickerTransform = (index, restingRot) => {
    if (exitPhase >= 1) {
      const ex = explosionData[index - 1]
      return `translate(${ex.x}px, ${ex.y}px) rotate(${ex.rot}deg) scale(0)`
    }
    const isEntered = stage >= (index === 1 ? 2 : index === 2 ? 3 : index === 3 ? 4 : index === 4 ? 5 : index === 5 ? 7 : 8)
    return isEntered ? `scale(1) rotate(${restingRot}deg)` : `scale(0) rotate(-20deg)`
  }

  const getStickerOpacity = (index) => {
    if (exitPhase >= 1) return 0
    return stage >= (index === 1 ? 2 : index === 2 ? 3 : index === 3 ? 4 : index === 4 ? 5 : index === 5 ? 7 : 8) ? 1 : 0
  }

  // Emoji wave state for click
  const [waveState, setWaveState] = useState(false)
  const triggerWave = () => {
    if (!waveState) {
      setWaveState(true)
      setTimeout(() => setWaveState(false), 500)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Space+Mono:wght@700&family=Syne:wght@800&display=swap');
        
        .sticker-bg {
          position: fixed;
          inset: 0;
          background-color: #0DC8A4;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .squiggle {
          position: absolute;
          color: #00B090;
          font-weight: bold;
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .y-bar {
          position: absolute;
          background: #FFE500;
          border: 2.5px solid #0A0A0A;
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }
        .y-bar.entered { opacity: 1; }
        .y-bar.exited { opacity: 0; transform: scale(0) !important; }

        .sticker-wrap {
          position: absolute;
          will-change: transform, opacity;
          transition: transform 400ms cubic-bezier(.34,1.56,.64,1), opacity 400ms;
        }
        .sticker-wrap.exploding {
          transition: transform 400ms cubic-bezier(.76,0,.24,1), opacity 400ms cubic-bezier(.76,0,.24,1);
        }

        .sticker-inner {
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), filter 0.2s;
        }
        .sticker-inner:hover {
          transform: scale(1.15);
          filter: drop-shadow(4px 4px 0 #0A0A0A);
          z-index: 10;
        }
        .sticker-inner:active {
          transform: scale(0.85);
        }

        /* Idle Animations */
        .idle-wobble { animation: wobble 3s ease-in-out infinite; }
        .idle-float-1 { animation: float1 2.8s ease-in-out infinite; }
        .idle-float-2 { animation: float2 3.2s ease-in-out infinite; }
        .idle-float-3 { animation: float3 2.5s ease-in-out infinite; }
        .idle-float-4 { animation: float4 3s ease-in-out infinite; }
        .idle-float-h { animation: floatH 2.8s ease-in-out infinite; }

        @keyframes wobble { 0%, 100% { transform: rotate(-5deg) scale(0.96); } 50% { transform: rotate(5deg) scale(1.05); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes float3 { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes floatH { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-10px); } }

        .spin-ring { animation: spin 8s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .wave-emoji {
          display: inline-block;
          cursor: pointer;
          transform-origin: bottom center;
        }
        .wave-anim {
          animation: waveAction 500ms ease-in-out;
        }
        @keyframes waveAction {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-20deg) scale(1.1); }
          50% { transform: rotate(15deg) scale(1.1); }
          75% { transform: rotate(-10deg) scale(1.05); }
          100% { transform: rotate(0deg) scale(1); }
        }

        .center-text-exit {
          transition: transform 400ms cubic-bezier(.76,0,.24,1), opacity 400ms;
          opacity: 0 !important;
        }
        .welcome-exit {
          transform: scale(2) skewY(-5deg) !important;
        }

        .welcome-text {
          font-size: clamp(48px, 10vw, 90px);
          -webkit-text-stroke: 2.5px #0A0A0A;
          text-shadow: 4px 4px 0 #0A0A0A;
        }

        .wipe-overlay {
          position: fixed;
          inset: 0;
          background-color: #FFE500;
          z-index: 2000;
          transform: scaleX(0);
          transition: transform 550ms cubic-bezier(.76,0,.24,1);
        }
        .wipe-in { transform: scaleX(1); transform-origin: left; }
        .wipe-out { transform: scaleX(0); transform-origin: right; }

        @media (max-width: 768px) {
          .mobile-scale {
            transform: scale(0.65);
          }
          .welcome-text {
            font-size: clamp(28px, 8vw, 42px) !important;
            -webkit-text-stroke: 1.5px #0A0A0A !important;
            text-shadow: 3px 3px 0 #0A0A0A !important;
          }
        }
        @media (max-width: 480px) {
          .welcome-text {
            font-size: clamp(24px, 10vw, 32px) !important;
            -webkit-text-stroke: 1px #0A0A0A !important;
            text-shadow: 2px 2px 0 #0A0A0A !important;
          }
        }
      `}} />

      <div className="sticker-bg">
        {/* Squiggles */}
        {squiggles.map(sq => (
          <div key={sq.id} className="squiggle" style={{
            left: `${sq.left}%`, top: `${sq.top}%`, 
            fontSize: `${sq.size}px`, transform: `rotate(${sq.rotate}deg)`,
            animationDelay: `${sq.delay}s`
          }}>
            {sq.char}
          </div>
        ))}

        {/* Yellow Bars */}
        <div className={`y-bar ${stage >= 1 ? 'entered' : ''} ${exitPhase >= 1 ? 'exited' : ''}`} style={{ width: '4px', height: '120px', top: '18%', left: '48%', transform: 'rotate(-15deg)', transitionDelay: '0ms' }} />
        <div className={`y-bar ${stage >= 1 ? 'entered' : ''} ${exitPhase >= 1 ? 'exited' : ''}`} style={{ width: '4px', height: '80px', top: '55%', left: '52%', transform: 'rotate(20deg)', transitionDelay: '120ms' }} />
        <div className={`y-bar ${stage >= 1 ? 'entered' : ''} ${exitPhase >= 1 ? 'exited' : ''}`} style={{ width: '80px', height: '4px', top: '65%', left: '42%', transform: 'rotate(-10deg)', transitionDelay: '240ms' }} />
        <div className={`y-bar ${stage >= 1 ? 'entered' : ''} ${exitPhase >= 1 ? 'exited' : ''}`} style={{ width: '60px', height: '4px', top: '75%', left: '55%', transform: 'rotate(8deg)', transitionDelay: '360ms' }} />

        {/* STICKERS */}
        
        {/* Sticker 1: WOW */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ top: '8%', left: '6%', opacity: getStickerOpacity(1), transform: getStickerTransform(1, -8), transitionDelay: exitPhase >= 1 ? '0ms' : '0ms' }}>
          <div className="idle-wobble" style={{ animationPlayState: stage >= 2 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ background: '#FFE500', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', borderRadius: '18px', padding: '10px 16px', fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '22px', color: '#0057FF', letterSpacing: '1px' }}>
                WOW
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 2: Smiley Orange */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ top: '6%', right: '4%', opacity: getStickerOpacity(2), transform: getStickerTransform(2, 10), transitionDelay: exitPhase >= 1 ? '30ms' : '0ms' }}>
          <div className="idle-float-1" style={{ animationPlayState: stage >= 3 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FF6B35', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', position: 'relative' }}>
                😊
                <div className="spin-ring" style={{ position: 'absolute', inset: '-6px', border: '2.5px dashed #0A0A0A', borderRadius: '50%', pointerEvents: 'none' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 3: Planet */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ top: '30%', left: '3%', opacity: getStickerOpacity(3), transform: getStickerTransform(3, -6), transitionDelay: exitPhase >= 1 ? '60ms' : '0ms' }}>
          <div className="idle-float-2" style={{ animationPlayState: stage >= 4 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ width: '90px', height: '60px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: '#A855F7', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', zIndex: 2 }}>👀</div>
                <div style={{ position: 'absolute', width: '90px', height: '20px', background: '#EC4899', border: '2.5px solid #0A0A0A', borderRadius: '50%', transform: 'rotate(-15deg)', boxShadow: '2px 2px 0 #0A0A0A', zIndex: 1 }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 4: HELLO */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ bottom: '14%', right: '5%', opacity: getStickerOpacity(4), transform: getStickerTransform(4, 6), transitionDelay: exitPhase >= 1 ? '90ms' : '0ms' }}>
          <div className="idle-float-3" style={{ animationPlayState: stage >= 5 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ background: '#FF85C2', border: '3px solid #6B21A8', boxShadow: '4px 4px 0 #6B21A8', borderRadius: '12px', padding: '8px 14px', fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '20px', color: '#6B21A8' }}>
                HELLO
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 5: Smiley Blue */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ bottom: '10%', left: '6%', opacity: getStickerOpacity(5), transform: getStickerTransform(5, -5), transitionDelay: exitPhase >= 1 ? '120ms' : '0ms' }}>
          <div className="idle-float-4" style={{ animationPlayState: stage >= 7 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#3B82F6', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px' }}>
                😄
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 6: Eyes Box */}
        <div className={`sticker-wrap ${exitPhase >= 1 ? 'exploding' : ''}`} style={{ bottom: '28%', right: '6%', opacity: getStickerOpacity(6), transform: getStickerTransform(6, 8), transitionDelay: exitPhase >= 1 ? '150ms' : '0ms' }}>
          <div className="idle-float-h" style={{ animationPlayState: stage >= 8 && exitPhase === -1 ? 'running' : 'paused' }}>
            <div className="mobile-scale">
              <div className="sticker-inner" style={{ background: '#FFFFFF', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', borderRadius: '12px', padding: '8px 12px', fontSize: '32px' }}>
                👀
              </div>
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="flex flex-col items-center justify-center relative z-50">
          
          <div 
            className={`font-['DM_Sans'] font-bold text-[16px] text-[#007A62] tracking-[6px] uppercase ${exitPhase >= 3 ? 'center-text-exit' : ''}`}
            style={{
              opacity: stage >= 6 ? 1 : 0,
              transform: stage >= 6 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 400ms, opacity 400ms'
            }}
          >
            Hai
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-2 mb-8">
            <div 
              className={`font-['Syne'] font-extrabold text-[#FFFFFF] welcome-text ${exitPhase >= 3 ? 'center-text-exit welcome-exit' : ''}`}
              style={{
                opacity: stage >= 9 ? 1 : 0,
                transform: stage >= 9 ? 'translateY(0) skewY(0deg)' : 'translateY(70px) skewY(5deg)',
                transition: 'transform 600ms cubic-bezier(.34,1.56,.64,1), opacity 600ms'
              }}
            >
              Welcome
            </div>
            
            <div 
              className={`wave-emoji ${waveState ? 'wave-anim' : ''} ${exitPhase >= 3 ? 'center-text-exit' : ''}`}
              onClick={triggerWave}
              style={{
                fontSize: 'clamp(38px, 9vw, 72px)',
                filter: 'drop-shadow(3px 3px 0 #0A0A0A)',
                opacity: stage >= 10 ? 1 : 0,
                transform: stage >= 10 ? 'rotate(0deg) scale(1)' : 'rotate(-40deg) scale(0.5)',
                transition: 'transform 500ms cubic-bezier(.34,1.56,.64,1), opacity 500ms'
              }}
            >
              👋🏻
            </div>
          </div>

          {/* Progress Bar */}
          <div 
            className={`w-[180px] ${exitPhase >= 3 ? 'center-text-exit' : ''}`}
            style={{
              opacity: stage >= 11 ? 1 : 0,
              transition: 'opacity 300ms'
            }}
          >
            <div className="h-[4px] bg-[#007A6244] border-[1.5px] border-[#007A62] w-full relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[#FFE500] border-r-[1.5px] border-[#0A0A0A] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 font-['Space_Mono'] font-bold text-[9px]">
              <span className="text-[#007A62] tracking-[3px]">LOADING...</span>
              <span className="text-[#FFE500]">{Math.floor(progress)}%</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* WIPE EXIT */}
      <div className={`wipe-overlay ${exitPhase >= 4 ? (exitPhase === 5 ? 'wipe-out' : 'wipe-in') : ''}`} />
    </>
  )
}
