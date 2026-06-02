import { useEffect } from "react"
import { motion } from "framer-motion"
import { FiDownload, FiX } from "react-icons/fi"
import BrutalButton from "./BrutalButton"

export default function CVReceiptModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("hide-back-to-top")
    } else {
      document.body.classList.remove("hide-back-to-top")
    }
    return () => document.body.classList.remove("hide-back-to-top")
  }, [isOpen])

  if (!isOpen) return null

  // Generate current date for the receipt
  const today = new Date().toLocaleDateString('id-ID', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 p-4 overflow-y-auto flex flex-col items-center">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brutal-black/80 backdrop-blur-sm"
      />

      {/* Receipt Container */}
      <motion.div 
        initial={{ y: "-100vh", rotate: -5 }}
        animate={{ y: 0, rotate: 0 }}
        exit={{ y: "100vh", rotate: 5 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="relative z-10 w-full max-w-sm my-auto py-8"
      >
        {/* Receipt Paper */}
        <div className="bg-[#f4f4f0] text-brutal-black font-mono border-[3px] border-brutal-black shadow-[12px_12px_0px_#FFE500] flex flex-col relative overflow-hidden">
          
          {/* Jagged Top Edge (using CSS masking or simple pseudo-elements, here we use a tiled background or svg) */}
          <div className="h-4 w-full" style={{ backgroundImage: 'radial-gradient(circle at 10px 0, transparent 10px, #0A0A0A 11px, #f4f4f0 12px)', backgroundSize: '20px 20px', backgroundPosition: 'bottom' }}></div>

          <div className="p-4 md:p-6 pt-4 flex-grow flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-4 w-full border-b-[2px] border-dashed border-brutal-black pb-4">
              <h3 className="font-grotesk font-black text-xl md:text-3xl tracking-widest mb-1">ANGGA MART</h3>
              <p className="text-[10px] md:text-xs font-bold">INFO. SYSTEMS STUDENT</p>
              <p className="text-[10px] md:text-xs">UNHAS · MAKASSAR</p>
              <p className="text-[10px] md:text-xs mt-2 font-bold">{today} · 09:41 AM</p>
            </div>

            {/* Items */}
            <div className="w-full text-xs md:text-sm font-bold flex flex-col gap-2 mb-4">
              <div className="flex justify-between border-b-[2px] border-brutal-black pb-1">
                <span>ITEM</span>
                <span>LEVEL</span>
              </div>
              <div className="flex justify-between">
                <span>React.js</span>
                <span>90%</span>
              </div>
              <div className="flex justify-between">
                <span>Tailwind CSS</span>
                <span>95%</span>
              </div>
              <div className="flex justify-between">
                <span>Next.js</span>
                <span>80%</span>
              </div>
              <div className="flex justify-between">
                <span>UI/UX Design</span>
                <span>85%</span>
              </div>
              <div className="flex justify-between">
                <span>Problem Solving</span>
                <span>100%</span>
              </div>
            </div>

            {/* Total */}
            <div className="w-full text-center border-y-[2px] border-dashed border-brutal-black py-3 mb-4">
              <p className="text-xs md:text-sm font-bold mb-1">TOTAL EXPERIENCE:</p>
              <p className="font-grotesk font-black text-xl md:text-2xl">2+ YEARS</p>
            </div>

            {/* Footer */}
            <p className="text-center font-bold text-xs md:text-sm mb-4">
              THANK YOU FOR VISITING!<br/>
              SCAN BARCODE TO HIRE
            </p>
            
            {/* Fake Barcode */}
            <div className="h-12 w-full flex justify-between gap-[2px]">
              {[...Array(35)].map((_, i) => (
                <div key={i} className={`bg-brutal-black h-full ${Math.random() > 0.5 ? 'w-1' : 'w-2'}`}></div>
              ))}
            </div>
          </div>

          {/* Jagged Bottom Edge */}
          <div className="h-4 w-full rotate-180" style={{ backgroundImage: 'radial-gradient(circle at 10px 0, transparent 10px, #0A0A0A 11px, #f4f4f0 12px)', backgroundSize: '20px 20px', backgroundPosition: 'bottom' }}></div>

        </div>

        {/* Action Buttons Floating below receipt */}
        <div className="mt-8 flex gap-4">
          <BrutalButton 
            variant="black" 
            className="flex-1 py-3 text-sm flex items-center justify-center gap-2"
            href="/cv.pdf"
            target="_blank"
            onClick={onClose}
          >
            <FiDownload size={18} /> PRINT CV
          </BrutalButton>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-tertiary-pink border-[3px] border-brutal-black shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] flex items-center justify-center transition-all text-brutal-white hover:text-brutal-black"
          >
            <FiX size={24} strokeWidth={4} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
