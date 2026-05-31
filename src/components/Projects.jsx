import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../lib/supabase"
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

export default function Projects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState(t.projects.filters[0])
  const [loading, setLoading] = useState(true)

  const filters = t.projects.filters

  // Update filter when language changes if it was "All"/"Semua"
  useEffect(() => {
    if (filter === "All" || filter === "Semua") {
      setFilter(t.projects.filters[0])
    }
  }, [t.projects.filters])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        
        if (data && data.length > 0) {
          setProjects(data)
        } else {
          // Fallback to mock if table is empty or missing
          setProjects(MOCK_PROJECTS)
        }
      } catch (err) {
        console.error("Error fetching projects:", err)
        setProjects(MOCK_PROJECTS)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])

  const filteredProjects = filter === t.projects.filters[0]
    ? projects 
    : projects.filter(p => {
        // Handle mapped categories like "Other" vs "Lainnya"
        const isOther = filter === t.projects.filters[3]
        if (isOther && p.category !== "Web App" && p.category !== "UI/UX") return true
        return p.category === filter
      })

  return (
    <section id="projects" className="py-24 bg-base-cream relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <SectionLabel color="bg-secondary-cyan" className="mb-0">{t.projects.title}</SectionLabel>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border-[2px] border-brutal-black px-4 py-2 font-mono text-sm font-bold transition-colors shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0A0A0A] ${
                  filter === f ? 'bg-primary-yellow text-brutal-black' : 'bg-brutal-white text-gray-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BrutalCard className="h-full flex flex-col p-4">
                  {/* Image */}
                  <div className="border-[2px] border-brutal-black aspect-video mb-4 overflow-hidden relative group">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
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
                      <BrutalButton variant="primary" className="flex-1 py-2 text-xs" onClick={() => window.open(project.live_url, '_blank')}>
                        {t.projects.live}
                      </BrutalButton>
                    )}
                    {project.github_url && (
                      <BrutalButton variant="white" className="flex-1 py-2 text-xs" onClick={() => window.open(project.github_url, '_blank')}>
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
