import { cn } from "../../lib/utils"
import { motion } from "framer-motion"

export default function BrutalCard({ className, children, hoverEffect = false, ...props }) {
  const hoverProps = hoverEffect ? {
    whileHover: { x: -4, y: -4, boxShadow: "8px 8px 0px 0px #0A0A0A" },
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] }
  } : {}

  return (
    <motion.div 
      {...hoverProps}
      className={cn(
        "bg-brutal-white border-[3px] border-brutal-black shadow-[4px_4px_0px_0px_#0A0A0A] p-6 relative group",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
