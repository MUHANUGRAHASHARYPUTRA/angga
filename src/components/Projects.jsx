import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import SectionLabel from "./ui/SectionLabel"
import BrutalCard from "./ui/BrutalCard"
import BrutalButton from "./ui/BrutalButton"
import { useLanguage } from "../contexts/LanguageContext"

import imgAlizah from "../assets/alizah.jpg"
import imgUno from "../assets/uno.jpg"
import imgPortofolio from "../assets/portofolio.jpg"

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Bukit Panaikang Residence",
    description: "Property management system (Alizah Property).",
    image_url: imgAlizah,
    tech_stack: ["Next.js", "Supabase", "Tailwind"],
    live_url: "https://alizahproperty.vercel.app",
    github_url: "https://github.com/MUHANUGRAHASHARYPUTRA",
    category: "Web App"
  },
  {
    id: 2,
    title: "Uno Game",
    description: "Interactive web-based Uno card game.",
    image_url: imgUno,
    tech_stack: ["HTML", "CSS", "JavaScript"],
    live_url: "https://muhanugrahasharyputra.github.io/uno/",
    github_url: "https://github.com/MUHANUGRAHASHARYPUTRA",
    category: "Web App"
  },
  {
    id: 3,
    title: "Portofolio Modern",
    description: "Modern and bold portfolio built by Angga.",
    image_url: imgPortofolio,
    tech_stack: ["React", "Framer Motion", "Tailwind"],
    live_url: "https://angga-portofolioo.vercel.app",
    github_url: "https://github.com/MUHANUGRAHASHARYPUTRA",
    category: "Web App"
  }
]

const ScrambleText = ({ text, trigger }) => {
  const [displayText, setDisplayText] = useState(text)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  
  useEffect(() => {
    if (!isInView && trigger === 0) return
    
    let iteration = 0
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef@#$%'
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) {
          return text[index]
        }
        if (text[index] === ' ') return ' '
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      
      iteration += 1.5 // settle letters much faster
    }, 25)
    
    return () => clearInterval(interval)
  }, [text, trigger, isInView])
  
  return <span ref={ref}>{displayText}</span>
}

export default function Projects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const [filter, setFilter] = useState(t.projects.filters[0])
  const [scrambleTrigger, setScrambleTrigger] = useState(0)

  const filters = t.projects.filters

  useEffect(() => {
    if (filter === "All" || filter === "Semua") {
      setFilter(t.projects.filters[0])
    }
  }, [t.projects.filters])



  const filteredProjects = filter === t.projects.filters[0]
    ? projects 
    : projects.filter(p => {
        const isOther = filter === t.projects.filters[3]
        if (isOther && p.category !== "Web App" && p.category !== "UI/UX") return true
        return p.category === filter
      })

  return (
    <section id="projects" className="py-24 bg-base-cream relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <motion.div
              initial={{ x: -60, scale: 0.8, opacity: 0 }}
              whileInView={{ x: 0, scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel color="bg-secondary-cyan" className="mb-2">{t.projects.title}</SectionLabel>
            </motion.div>
            <p className="font-grotesk font-black text-2xl uppercase mt-2">
              <ScrambleText text={`0${filteredProjects.length} ${t.projects.sub}`} trigger={scrambleTrigger} />
            </p>
          </div>
          
          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-2 mt-6 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {filters.map(f => (
              <motion.button
                key={f}
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                }}
                onClick={() => {
                  setFilter(f)
                  setScrambleTrigger(p => p + 1)
                }}
                className={`border-[2px] border-brutal-black px-4 py-2 font-mono text-sm font-bold transition-colors shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0A0A0A] ${
                  filter === f ? 'bg-primary-yellow text-brutal-black filter-wipe-active' : 'bg-brutal-white text-gray-500'
                }`}
              >
                {f}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 80 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
              >
                <BrutalCard hoverEffect className="h-full flex flex-col p-4 group">
                  {/* Image */}
                  <div className="border-[2px] border-brutal-black aspect-video mb-4 overflow-hidden relative">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-tertiary-pink border-[2px] border-brutal-black text-brutal-white text-xs font-mono font-bold px-2 py-1">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black font-grotesk mb-2">{project.title}</h3>
                    <p className="font-sans mb-4 text-gray-700">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack?.map(tech => (
                        <span key={tech} className="bg-gray-100 border border-brutal-black px-2 py-1 text-xs font-mono font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    {project.live_url && (
                      <BrutalButton variant="primary" className="flex-1 py-2 text-xs" href={project.live_url} target="_blank" rel="noopener noreferrer">
                        {t.projects.live}
                      </BrutalButton>
                    )}
                    {project.github_url && (
                      <BrutalButton variant="white" className="flex-1 py-2 text-xs" href={project.github_url} target="_blank" rel="noopener noreferrer">
                        {t.projects.github}
                      </BrutalButton>
                    )}
                  </div>
                </BrutalCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
