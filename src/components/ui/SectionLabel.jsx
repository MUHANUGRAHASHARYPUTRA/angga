import { cn } from "../../lib/utils"

export default function SectionLabel({ children, className, color = "bg-primary-yellow" }) {
  return (
    <div className="flex justify-start mb-8 md:mb-12">
      <div 
        className={cn(
          "inline-block border-[3px] border-brutal-black px-6 py-2 uppercase font-grotesk font-black text-xl md:text-3xl tracking-wide",
          color,
          className
        )}
        style={{
          boxShadow: "4px 4px 0px #0A0A0A",
          borderRadius: "9999px" // Pill shape
        }}
      >
        {children}
      </div>
    </div>
  )
}
