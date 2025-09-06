import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const SplitTextReveal = ({ 
  text, 
  className = '', 
  delay = 0, 
  stagger = 0.03 
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      
      gsap.fromTo(chars, 
        {
          y: 100,
          opacity: 0,
          rotationX: 90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [inView, delay, stagger]);

  const splitText = text.split('').map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ transformOrigin: '0% 50%' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={ref} className={className}>
      <div ref={textRef} className="inline-block">
        {splitText}
      </div>
    </div>
  );
};

export default SplitTextReveal;