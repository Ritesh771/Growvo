import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ImageMaskRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export const ImageMaskReveal = ({ 
  src, 
  alt, 
  className = "", 
  direction = 'bottom' 
}: ImageMaskRevealProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const maskVariants = {
    hidden: {
      clipPath: direction === 'left' ? 'inset(0 100% 0 0)' :
                direction === 'right' ? 'inset(0 0 0 100%)' :
                direction === 'top' ? 'inset(100% 0 0 0)' :
                'inset(0 0 100% 0)'
    },
    visible: {
      clipPath: 'inset(0 0 0 0)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        variants={maskVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      />
    </div>
  );
};