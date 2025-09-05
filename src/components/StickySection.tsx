import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  top?: string;
}

export const StickySection = ({ children, className = "", top = "0" }: StickySectionProps) => {
  return (
    <motion.div
      className={`sticky z-10 ${className}`}
      style={{ top }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};