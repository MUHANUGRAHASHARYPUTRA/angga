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
        <SectionLabel>{t.skills.title}</SectionLabel>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <BrutalCard className={`border-l-[12px] ${category.borderColor}`}>
                <h3 className="text-2xl font-black font-grotesk mb-6 uppercase">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="bg-base-cream border-[2px] border-brutal-black px-4 py-2 font-bold font-mono text-sm shadow-[3px_3px_0px_#0A0A0A] cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </BrutalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
