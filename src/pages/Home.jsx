import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import DailySetup from "../components/DailySetup"
import Projects from "../components/Projects"
import Testimonials from "../components/Testimonials"
import FAQ from "../components/FAQ"
import Contact from "../components/Contact"
import FunZoneBanner from "../components/FunZoneBanner"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <DailySetup />
      <Projects />
      <Testimonials />
      <FAQ />
      <FunZoneBanner />
      <Contact />
    </main>
  )
}
