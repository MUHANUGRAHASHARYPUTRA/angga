import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionLabel from "./ui/SectionLabel"
import { useLanguage } from "../contexts/LanguageContext"

export default function Skills() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(null)

  const skillMonsters = [
    {
      title: t.skills.frontend,
      color: "bg-primary-yellow",
      face: "😋",
      skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind"]
    },
    {
      title: t.skills.backend,
      color: "bg-secondary-cyan",
      face: "🤓",
      skills: ["Node.js", "Supabase", "REST API", "PostgreSQL", "Express"]
    },
    {
      title: t.skills.tools,
      color: "bg-tertiary-pink",
      face: "👾",
      skills: ["Git", "GitHub", "Figma", "VS Code", "Vercel"]
    }
  ]

  return (
    <section id="skills" className="py-24 bg-brutal-white relative overflow-hidden border-y-[3px] border-brutal-black">
      {/* Decorative background dots */}
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-start">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-16 flex flex-col items-start text-left w-full"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
          >
            <SectionLabel color="bg-secondary-cyan">{t.skills.title}</SectionLabel>
          </motion.div>
          <p className="mt-4 font-grotesk font-black text-xl md:text-3xl text-brutal-black uppercase tracking-widest">
            {t.skills.sub}
          </p>
        </motion.div>

        {/* Monsters Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-5xl">
          {skillMonsters.map((monster, index) => {
            const isActive = activeIndex === index

            return (
              <motion.div
                key={monster.title}
                className="relative flex flex-col items-center"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 200, damping: 15 }}
              >
                
                {/* Speech Bubble / Skills Reveal */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute bottom-full mb-6 w-64 bg-brutal-black p-4 rounded-3xl rounded-br-none border-[4px] border-brutal-white shadow-[8px_8px_0px_#FF2D78] z-30"
                    >
                      <h4 className="text-brutal-white font-grotesk font-black mb-3 border-b-2 border-dashed border-gray-600 pb-2 text-center uppercase tracking-wider">
                        {monster.title}
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {monster.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-brutal-white text-brutal-black text-xs font-mono font-bold px-3 py-1 rounded-full border-2 border-brutal-black"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      {/* Triangle for speech bubble */}
                      <div className="absolute -bottom-4 right-4 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-t-brutal-black border-r-[0px] border-r-transparent"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Monster */}
                <motion.button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-[6px] border-brutal-black shadow-[8px_8px_0px_#0A0A0A] flex flex-col items-center justify-center cursor-pointer transition-colors ${monster.color} hover:bg-white z-20`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: index % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-6xl md:text-7xl drop-shadow-[2px_2px_0px_#0A0A0A]">
                    {monster.face}
                  </span>
                  <span className="mt-2 font-mono font-bold text-sm bg-brutal-white px-2 py-0.5 border-2 border-brutal-black -rotate-3">
                    {monster.title.split(" ")[0]}
                  </span>
                </motion.button>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
