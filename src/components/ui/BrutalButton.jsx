import { motion, useAnimation } from "framer-motion"
import { cn } from "../../lib/utils"

export default function BrutalButton({ 
  className, 
  variant = "primary", 
  children, 
  onClick,
  href,
  target,
  ...props 
}) {
  const controls = useAnimation()
  
  const variants = {
    primary: "bg-primary-yellow text-brutal-black",
    secondary: "bg-secondary-cyan text-brutal-black",
    tertiary: "bg-tertiary-pink text-brutal-white",
    white: "bg-brutal-white text-brutal-black",
    black: "bg-brutal-black text-brutal-white",
  }

  const handlePointerDown = () => {
    controls.start({
      x: 4,
      y: 4,
      boxShadow: "0px 0px 0px #0A0A0A",
      transition: { duration: 0.08, ease: "linear" }
    })
  }

  const handlePointerUp = async (e) => {
    // Check if it's the Whatsapp hire button specifically (has specific particle effect later, but core physics are here)
    const flashColor = variant === 'primary' ? "#FFE500" : "#FFFFFF"
    
    // Snap back past resting + overshoot
    await controls.start({
      x: -3,
      y: -3,
      boxShadow: "7px 7px 0px #0A0A0A",
      borderColor: ["#0A0A0A", flashColor, "#0A0A0A"],
      transition: { duration: 0.1, ease: "easeOut" }
    })
    
    // Settle
    controls.start({
      x: -2,
      y: -2,
      boxShadow: "6px 6px 0px #0A0A0A",
      transition: { duration: 0.15, ease: "easeOut" }
    })
    
    if (onClick) onClick(e)
  }

  const handleHoverStart = () => {
    controls.start({ x: -2, y: -2, boxShadow: "6px 6px 0px #0A0A0A", transition: { duration: 0.15 } })
  }
  
  const handleHoverEnd = () => {
    controls.start({ x: 0, y: 0, boxShadow: "4px 4px 0px #0A0A0A", transition: { duration: 0.15 } })
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      target={target}
      animate={controls}
      initial={{ x: 0, y: 0, boxShadow: "4px 4px 0px #0A0A0A", borderColor: "#0A0A0A" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handleHoverEnd}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={cn(
        "border-[3px] border-brutal-black uppercase font-grotesk font-bold px-6 py-3 tracking-widest text-sm flex items-center justify-center gap-2 relative no-underline",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
