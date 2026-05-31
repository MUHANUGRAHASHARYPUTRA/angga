import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [hoverState, setHoverState] = useState("default") // default, button, text

  useEffect(() => {
    // Only enable on devices with a fine pointer (like a mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)")
    setIsPointerFine(mediaQuery.matches)

    const handleMediaChange = (e) => setIsPointerFine(e.matches)
    mediaQuery.addEventListener("change", handleMediaChange)

    if (!mediaQuery.matches) return

    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseOver = (e) => {
      const target = e.target
      const tagName = target.tagName.toLowerCase()
      
      if (
        tagName === "button" || 
        tagName === "a" || 
        target.closest("button") || 
        target.closest("a") || 
        target.getAttribute("role") === "button"
      ) {
        setHoverState("button")
      } else if (
        tagName === "p" || 
        tagName === "h1" || 
        tagName === "h2" || 
        tagName === "h3" || 
        tagName === "span"
      ) {
        setHoverState("text")
      } else {
        setHoverState("default")
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseover", onMouseOver)

    // Render loop for smooth lerp
    let animationFrame
    const render = () => {
      // Lerp (linear interpolation) for trailing effect
      // speed factor: 0.2 (higher = faster snap)
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      }
      animationFrame = requestAnimationFrame(render)
    }
    render()

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", onMouseOver)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  if (!isPointerFine) return null

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "transparent",
      borderRadius: "50%",
      border: "2px solid #0A0A0A"
    },
    button: {
      width: 32,
      height: 32,
      backgroundColor: "#FFE500",
      borderRadius: "50%",
      border: "2px solid #0A0A0A",
      mixBlendMode: "normal"
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: "#0A0A0A",
      borderRadius: "0%",
      border: "none",
      mixBlendMode: "difference"
    }
  }

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <motion.div
        variants={variants}
        animate={hoverState}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  )
}
