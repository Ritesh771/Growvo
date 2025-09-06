import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
}

const ParallaxLayer = ({ children, speed, className = '' }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MultiLayerParallaxProps {
  children: React.ReactNode;
  className?: string;
}

const MultiLayerParallax = ({ children, className = '' }: MultiLayerParallaxProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export { MultiLayerParallax, ParallaxLayer };