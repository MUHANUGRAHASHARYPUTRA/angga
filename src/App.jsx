import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { LanguageProvider } from "./contexts/LanguageContext"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <LanguageProvider>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="bg-base-cream min-h-screen text-brutal-black selection:bg-primary-yellow selection:text-brutal-black">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </LanguageProvider>
  )
}

export default App
