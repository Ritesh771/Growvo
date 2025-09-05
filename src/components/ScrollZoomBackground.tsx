import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollZoomBackgroundProps {
  children: ReactNode;
  backgroundImage: string;
  className?: string;
}

export const ScrollZoomBackground = ({ 
  children, 
  backgroundImage, 
  className = "" 
}: ScrollZoomBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.6]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          scale,
          opacity,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};