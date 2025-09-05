import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
}

export const ParallaxBackground = ({ 
  children, 
  speed = 0.5, 
  className = "",
  backgroundImage
}: ParallaxBackgroundProps) => {
  const y = useParallax(speed);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            y,
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};