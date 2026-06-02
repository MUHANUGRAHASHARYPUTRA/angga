import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BrutalButton from "./BrutalButton"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="back-to-top-btn"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
        >
          <BrutalButton 
            onClick={scrollToTop}
            className="w-14 h-14 !p-0 rounded-none shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#0A0A0A]"
          >
            ↑
          </BrutalButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
