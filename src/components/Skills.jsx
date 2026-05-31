import { motion } from "framer-motion"
import SectionLabel from "./ui/SectionLabel"
import BrutalCard from "./ui/BrutalCard"
import { useLanguage } from "../contexts/LanguageContext"

export default function Skills() {
  const { t } = useLanguage()

  const skillCategories = [
    {
      title: t.skills.frontend,
      borderColor: "border-l-primary-yellow",
      skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind"]
    },
    {
      title: t.skills.backend,
      borderColor: "border-l-secondary-cyan",
      skills: ["Node.js", "Supabase", "REST API"]
    },
    {
      title: t.skills.tools,
      borderColor: "border-l-tertiary-pink",
      skills: ["Git", "GitHub", "Figma", "VS Code", "Vercel"]
    },
    {
      title: t.skills.learning,
      borderColor: "border-l-green-400",
      skills: ["Next.js", "PostgreSQL"]
    }
  ]

  return (
    <section id="skills" className="py-24 bg-brutal-white relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ x: -60, scale: 0.8, opacity: 0 }}
          whileInView={{ x: 0, scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel>{t.skills.title}</SectionLabel>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
              }}
            >
              <BrutalCard className={`border-l-[12px] ${category.borderColor}`}>
                <h3 className="text-2xl font-black font-grotesk mb-6 uppercase">{category.title}</h3>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
                  }}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
                      }}
                      whileHover={{ 
                        y: -2, 
                        x: -2, 
                        rotate: [-2, 2, 0],
                        boxShadow: "5px 5px 0px #0A0A0A",
                        backgroundColor: "#FFE500",
                        transition: { duration: 0.2 }
                      }}
                      className="bg-base-cream border-[2px] border-brutal-black px-4 py-2 font-bold font-mono text-sm shadow-[3px_3px_0px_#0A0A0A] cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </BrutalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
