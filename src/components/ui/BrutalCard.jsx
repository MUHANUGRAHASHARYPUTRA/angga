import { cn } from "../../lib/utils"

export default function BrutalCard({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "bg-brutal-white brutal-border brutal-shadow brutal-transition p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
