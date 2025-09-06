import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useLazyImage = (
  src: string,
  options: UseLazyImageOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return {
    imgRef,
    isInView,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
    shouldLoad: isInView,
  };
};

// Hook for preloading images
export const useImagePreloader = () => {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadImages = (srcs: string[]): Promise<void[]> => {
    return Promise.all(srcs.map(src => preloadImage(src)));
  };

  return { preloadImage, preloadImages };
};

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
  });

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[];
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[];
          entries.forEach((entry) => {
            setMetrics(prev => ({
              ...prev,
              fid: entry.processingStart - entry.startTime
            }));
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }

      // CLS Observer
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[];
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }
    }

    // TTFB measurement
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart
        }));
      }
    }
  }, []);

  return metrics;
};
