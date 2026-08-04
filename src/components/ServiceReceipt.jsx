import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import SectionLabel from "./ui/SectionLabel"

export default function ServiceReceipt() {
  const { t } = useLanguage()

  // Generate random barcode lines
  const barcodeLines = Array.from({ length: 40 }).map((_, i) => (
    <div 
      key={i} 
      className="bg-brutal-black h-12 md:h-16 inline-block"
      style={{ width: `${Math.random() * 4 + 1}px`, marginRight: `${Math.random() * 3 + 1}px` }}
    ></div>
  ))

  const dateStr = new Date().toLocaleDateString('en-GB')
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })

  return (
    <section className="py-24 bg-tertiary-pink relative border-y-[3px] border-brutal-black overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-start w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 text-left flex flex-col items-start"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
          >
            <SectionLabel color="bg-primary-yellow text-brutal-black">{t.services.title}</SectionLabel>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mt-6 leading-tight font-grotesk uppercase text-brutal-white drop-shadow-[4px_4px_0_#0A0A0A]">
            {t.services.sub}
          </h2>
        </motion.div>

        {/* The Receipt */}
        <motion.div 
          initial={{ rotate: -2, y: 50, opacity: 0 }}
          whileInView={{ rotate: 0, y: 0, opacity: 1 }}
          whileHover={{ rotate: -1, scale: 1.02 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-[#FFFBEA] w-full max-w-lg mx-auto border-[4px] border-brutal-black shadow-[8px_8px_0px_#0A0A0A] p-6 md:p-10 text-brutal-black font-mono flex flex-col"
        >
          {/* Jagged Top & Bottom (CSS trick using radial gradients) */}
          <div className="absolute top-[-10px] left-0 w-full h-3" style={{ background: 'radial-gradient(circle at 10px 0, transparent 10px, #FFFBEA 11px) repeat-x', backgroundSize: '20px 20px' }}></div>
          <div className="absolute top-[-14px] left-0 w-full h-1 border-t-[4px] border-brutal-black dashed" style={{ borderTopStyle: 'dashed' }}></div>
          
          {/* Header */}
          <div className="text-center mb-6 border-b-2 border-brutal-black border-dashed pb-6">
            <h3 className="font-bold text-2xl md:text-3xl tracking-widest">{t.services.receiptTitle}</h3>
            <p className="mt-2 text-sm">=================================</p>
            <div className="flex justify-between text-xs md:text-sm mt-2 font-bold">
              <span>{t.services.date}: {dateStr}</span>
              <span>{t.services.time}: {timeStr}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm mt-1 font-bold">
              <span>{t.services.cashier}: ANGGA</span>
              <span>{t.services.customer}: YOU</span>
            </div>
            <p className="mt-2 text-sm">=================================</p>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between font-bold border-b border-brutal-black pb-2 text-sm md:text-base">
              <span className="w-12">{t.services.qty}</span>
              <span className="flex-1">{t.services.item}</span>
              <span className="text-right">{t.services.price}</span>
            </div>
            
            {t.services.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm md:text-base">
                <span className="w-12">1x</span>
                <span className="flex-1 pr-2">{item.name}</span>
                <span className="text-right font-bold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t-2 border-brutal-black border-dashed pt-4 mb-8">
            <div className="flex justify-between items-center text-xl md:text-2xl font-black">
              <span>{t.services.total}:</span>
              <span className="bg-primary-yellow px-2 py-1 border-[2px] border-brutal-black transform rotate-2">{t.services.totalValue}</span>
            </div>
          </div>

          {/* Footer & Barcode */}
          <div className="text-center mt-auto flex flex-col items-center">
            <p className="font-bold mb-4">{t.services.footer}</p>
            <div className="flex justify-center w-full overflow-hidden opacity-80 mix-blend-multiply mb-2">
              {barcodeLines}
            </div>
            <p className="text-xs font-bold tracking-widest">{t.services.barcode}</p>
          </div>
          
          <div className="absolute bottom-[-10px] left-0 w-full h-3" style={{ background: 'radial-gradient(circle at 10px 10px, transparent 10px, #FFFBEA 11px) repeat-x top', backgroundSize: '20px 20px' }}></div>
          <div className="absolute bottom-[-14px] left-0 w-full h-1 border-b-[4px] border-brutal-black dashed" style={{ borderBottomStyle: 'dashed' }}></div>
        </motion.div>

        {/* CTA Button */}
        <motion.a 
          href="#contact"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
          className="mt-12 mx-auto bg-secondary-cyan text-brutal-black font-black font-grotesk text-xl md:text-3xl px-8 py-4 border-[4px] border-brutal-black shadow-[8px_8px_0px_#0A0A0A] hover:shadow-[12px_12px_0px_#FFE500] hover:-translate-y-2 transition-all z-20 cursor-pointer text-center max-w-full"
        >
          {t.services.cta}
        </motion.a>

      </div>
    </section>
  )
}
