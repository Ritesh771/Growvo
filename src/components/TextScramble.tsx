import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextScramble = ({ text, className = '', delay = 0 }: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        scrambleText();
      }, delay);
    }
  }, [inView, delay, isAnimating]);

  const scrambleText = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span ref={ref} className={className}>
      {displayText || text}
    </span>
  );
};

export default TextScramble;