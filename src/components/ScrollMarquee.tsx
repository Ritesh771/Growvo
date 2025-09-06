import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollMarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const ScrollMarquee = ({ 
  text, 
  speed = 1, 
  direction = 'right',
  className = '' 
}: ScrollMarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'right' ? ['0%', '100%'] : ['0%', '-100%']
  );

  const repeatedText = Array(10).fill(text).join(' • ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} ref={ref}>
      <motion.div
        style={{ x: useTransform(x, (value) => `${parseFloat(value) * speed}%`) }}
        className="inline-block"
      >
        <span className="text-muted-foreground/50 text-lg font-medium tracking-wider">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
};

export default ScrollMarquee;