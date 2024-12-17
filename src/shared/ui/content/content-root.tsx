import { motion } from "framer-motion"
import { ReactNode } from "react"
import Utils from "src/shared/utils/utils"

interface ContentGroupProps {
  className?: string
  children: ReactNode
}


export default function ContentGroup({ className, children }: ContentGroupProps) {
  return (
    <div className="min-h-screen bg-primary px-4 py-12 text-secondary-50">
      <motion.div
        className={Utils.cn("mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4", className)}
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}>
        {children}
      </motion.div>
    </div>

  )
}