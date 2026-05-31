import { motion } from "framer-motion"
import SectionLabel from "./ui/SectionLabel"
import photo from "../assets/photo.jpg"
import { useLanguage } from "../contexts/LanguageContext"

export default function About() {
  const { t } = useLanguage()

  const funFacts = [
    { icon: "🎂", text: "16 April 2006", color: "bg-tertiary-pink", rotate: "-rotate-2" },
    { icon: "🏛️", text: "UNHAS, Makassar", color: "bg-secondary-cyan", rotate: "rotate-2" },
    { icon: "💻", text: "Sistem Informasi", color: "bg-primary-yellow", rotate: "-rotate-3" },
    { icon: "⚡", text: t.about.classOf, color: "bg-brutal-white", rotate: "rotate-3" }
  ]

  return (
    <section id="about" className="py-24 bg-base-cream relative">
      <div className="container mx-auto px-6">
        <SectionLabel color="bg-tertiary-pink text-brutal-white">{t.about.title}</SectionLabel>

        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* Left: Polaroid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 flex justify-center"
          >
            <motion.div 
              className="group bg-brutal-white border-[3px] border-brutal-black p-4 pb-12 w-full max-w-[340px] relative cursor-pointer"
              style={{
                rotate: 3,
                boxShadow: "6px 6px 0px #0A0A0A"
              }}
              whileHover={{ 
                rotate: 0, 
                y: -10,
                scale: 1.05,
                boxShadow: "12px 12px 0px #0A0A0A",
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                {t.about.headlinePre}<span className="bg-primary-yellow px-2 inline-block -rotate-1 border-2 border-brutal-black shadow-[3px_3px_0px_#0A0A0A]">{t.about.headlineHighlight}</span>{t.about.headlinePost}
              </h2>
              <p className="text-lg md:text-xl font-sans leading-relaxed max-w-2xl">
                {t.about.bio}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {funFacts.map((fact, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`border-[3px] border-brutal-black p-4 flex items-center gap-4 ${fact.color} ${fact.rotate} shadow-[4px_4px_0px_#0A0A0A] brutal-transition cursor-default`}
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
