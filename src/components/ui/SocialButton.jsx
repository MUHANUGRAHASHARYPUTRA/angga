import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export default function SocialButton({ 
  icon: Icon, 
  label, 
  href, 
  colorClass, 
  shadowColor = "#0A0A0A" 
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center justify-center gap-3 border-[3px] border-brutal-black p-4 w-full h-[64px] font-grotesk font-black text-lg uppercase transition-colors",
        colorClass
      )}
      style={{
        boxShadow: `4px 4px 0px ${shadowColor}`
      }}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </motion.a>
  )
}
