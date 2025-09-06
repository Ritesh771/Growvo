import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      // Check if element is already in viewport
      const rect = imgRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        setIsInView(true);
      } else {
        observer.observe(imgRef.current);
      }
    }

    observerRef.current = observer;

    // Fallback timeout in case IntersectionObserver doesn't trigger
    const timeoutId = setTimeout(() => {
      if (!isInView) {
        setIsInView(true);
      }
    }, 2000); // 2 second fallback

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('LazyImage Debug:', { src, isInView, isLoaded, hasError });
    }
  }, [src, isInView, isLoaded, hasError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {(!isLoaded && isInView) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <img
              src={placeholder}
              alt="Loading..."
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
