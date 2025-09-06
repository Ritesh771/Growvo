import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ColorShiftBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const ColorShiftBackground = ({ children, className = '' }: ColorShiftBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const hue = useTransform(scrollYProgress, [0, 1], [240, 280]);
  const saturation = useTransform(scrollYProgress, [0, 1], [70, 90]);
  const lightness = useTransform(scrollYProgress, [0, 1], [20, 40]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        background: useTransform(
          [hue, saturation, lightness],
          ([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`
        ),
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ColorShiftBackground;