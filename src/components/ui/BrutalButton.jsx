import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export default function BrutalButton({ 
  className, 
  variant = "primary", 
  children, 
  ...props 
}) {
  const variants = {
    primary: "bg-primary-yellow hover:bg-primary-yellow/90",
    secondary: "bg-secondary-cyan hover:bg-secondary-cyan/90",
    tertiary: "bg-tertiary-pink hover:bg-tertiary-pink/90",
    white: "bg-brutal-white hover:bg-gray-100",
    black: "bg-brutal-black text-brutal-white hover:bg-brutal-black/90 shadow-brutal-yellow",
  }

  return (
    <motion.button
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px #0A0A0A" }}
      className={cn(
        "brutal-border brutal-shadow uppercase font-grotesk font-bold px-6 py-3 tracking-widest text-sm flex items-center justify-center gap-2 transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
