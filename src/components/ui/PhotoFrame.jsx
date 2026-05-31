import { motion } from "framer-motion"
import photo from "../../assets/photo.jpg"
import { cn } from "../../lib/utils"

export default function PhotoFrame({ className }) {
  return (
    <div className={cn("relative w-[240px] md:w-[320px] mx-auto", className)}>
      {/* Photo Container */}
      <motion.div
        className="group relative z-10 border-[3.5px] border-brutal-black overflow-hidden bg-brutal-white cursor-pointer"
        style={{ 
          height: "auto", 
          aspectRatio: "320/380",
          rotate: -2,
          boxShadow: "8px 8px 0px #FFE500"
        }}
        whileHover={{
          rotate: 0,
          scale: 1.02,
          boxShadow: "8px 8px 0px #FF2D78",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        {/* Overlay for stronger monochrome/duotone effect if desired, but here we use CSS filters */}
        <img 
          src={photo} 
          alt="Angga" 
          className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 active:grayscale-0 active:contrast-100 active:brightness-100 transition-all duration-500"
        />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -left-8 z-20 rotate-[-8deg] pointer-events-none">
        <div className="bg-primary-yellow border-[2px] border-brutal-black px-3 py-1 font-mono text-sm shadow-[3px_3px_0px_#0A0A0A]">
          ANGGA 🤙
        </div>
      </div>

      <div className="absolute -bottom-4 -right-6 z-20 rotate-[5deg] pointer-events-none">
        <div className="bg-secondary-cyan border-[2px] border-brutal-black px-3 py-1 font-mono text-sm font-bold shadow-[3px_3px_0px_#0A0A0A]">
          OPEN TO WORK ✓
        </div>
      </div>

      <motion.div 
        className="absolute -top-10 -right-10 z-0 text-tertiary-pink text-6xl pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>

      <motion.div 
        className="absolute -bottom-8 -left-12 z-0 text-primary-yellow font-mono text-6xl pointer-events-none font-bold"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {`{ }`}
      </motion.div>
    </div>
  )
}
