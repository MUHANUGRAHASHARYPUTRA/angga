import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./contexts/LanguageContext"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ui/ScrollProgress"
import BackToTop from "./components/ui/BackToTop"
import FloatingGameTrigger from "./components/FloatingGameTrigger"

import Home from "./pages/Home"
import Playground from "./pages/Playground"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <div className="bg-base-cream min-h-screen text-brutal-black selection:bg-primary-yellow selection:text-brutal-black">
            <ScrollProgress />
            <BackToTop />
            <FloatingGameTrigger />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
            </Routes>
            <Footer />
          </div>
        )}
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
