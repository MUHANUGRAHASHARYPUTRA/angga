import { motion } from "framer-motion"
import SectionLabel from "./ui/SectionLabel"
import photo from "../assets/photo.jpg"
import { useLanguage } from "../contexts/LanguageContext"

export default function About() {
  const { t } = useLanguage()
  const easeBounce = [0.34, 1.56, 0.64, 1]

  const funFacts = [
    { icon: "🎂", text: "16 April 2006", color: "bg-tertiary-pink", rotDegree: -2 },
    { icon: "🏛️", text: "UNHAS, Makassar", color: "bg-secondary-cyan", rotDegree: 2 },
    { icon: "💻", text: "Sistem Informasi", color: "bg-primary-yellow", rotDegree: -3 },
    { icon: "⚡", text: t.about.classOf, color: "bg-brutal-white", rotDegree: 3 }
  ]

  return (
    <section id="about" className="py-24 bg-base-cream relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ x: -60, scale: 0.8, opacity: 0 }}
          whileInView={{ x: 0, scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel color="bg-tertiary-pink text-brutal-white">{t.about.title}</SectionLabel>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* Left: Polaroid */}
          <motion.div 
            className="md:col-span-5 flex justify-center"
          >
            <motion.div 
              initial={{ y: -80, rotate: 12, opacity: 0 }}
              whileInView={{ y: 0, rotate: 3, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: easeBounce }}
              className="group bg-brutal-white border-[3px] border-brutal-black p-4 pb-12 w-full max-w-[340px] relative cursor-pointer"
              style={{
                boxShadow: "6px 6px 0px #0A0A0A"
              }}
              whileHover={{ 
                rotate: 0, 
                y: -10,
                scale: 1.05,
                boxShadow: "10px 10px 0px #0A0A0A",
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="border-[2px] border-brutal-black aspect-[4/5] overflow-hidden mb-4 bg-gray-100 relative">
                <img src={photo} alt="Angga" className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 active:grayscale-0 active:contrast-100 active:brightness-100 transition-all duration-500" />
              </div>
              <p className="font-sans italic text-xl text-center font-bold absolute bottom-4 w-full left-0">
                Angga, Makassar 📍
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Bio & Facts */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight flex flex-wrap gap-x-2 gap-y-2">
                {[t.about.headlinePre, t.about.headlineHighlight, t.about.headlinePost].map((text, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div 
                      variants={{
                        hidden: { y: "100%" },
                        visible: { y: 0, transition: { duration: 0.4 } }
                      }}
                      className={i === 1 ? "bg-primary-yellow px-2 inline-block -rotate-1 border-2 border-brutal-black shadow-[3px_3px_0px_#0A0A0A]" : "inline-block"}
                    >
                      {text}
                    </motion.div>
                  </div>
                ))}
              </h2>
              <div className="overflow-hidden">
                <motion.p 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } }
                  }}
                  className="text-lg md:text-xl font-sans leading-relaxed max-w-2xl"
                >
                  {t.about.bio}
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
              }}
            >
              {funFacts.map((fact, index) => (
                <motion.div 
                  key={index}
                  initial={{ rotate: fact.rotDegree }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } }
                  }}
                  whileHover={{ 
                    y: -3, 
                    x: -3, 
                    scale: 1, 
                    rotate: 0, 
                    boxShadow: "7px 7px 0px #0A0A0A",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                  className={`border-[3px] border-brutal-black p-4 flex items-center gap-4 ${fact.color} shadow-[4px_4px_0px_#0A0A0A] cursor-default relative`}
                >
                  <span className="text-2xl">{fact.icon}</span>
                  <span className="font-bold font-mono text-sm md:text-base">{fact.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
