// Resource Preloader for critical assets
export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private preloadedUrls = new Set<string>();

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  // Preload images with priority
  preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedUrls.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();

      if (priority === 'high') {
        img.fetchPriority = 'high';
      }

      img.onload = () => {
        this.preloadedUrls.add(src);
        resolve();
      };

      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload fonts
  preloadFont(href: string, type: string = 'font/woff2'): Promise<void> {
    if (this.preloadedUrls.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = type;
      link.crossOrigin = 'anonymous';

      link.onload = () => {
        this.preloadedUrls.add(href);
        resolve();
      };

      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Preload scripts
  preloadScript(src: string): Promise<void> {
    if (this.preloadedUrls.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = () => {
        this.preloadedUrls.add(src);
        resolve();
      };

      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    // Preload hero images
    this.preloadImage('/src/assets/hero-bg.jpg', 'high');
    this.preloadImage('/src/assets/growvo-logo.png', 'high');
    this.preloadImage('/src/assets/Ritesh.jpg', 'high');
    this.preloadImage('/src/assets/stalightlogo.jpeg', 'high');

    // Preload project images (lazy load these)
    const projectImages = [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
    ];

    // Preload first few project images with lower priority
    projectImages.slice(0, 3).forEach(src => {
      this.preloadImage(src, 'low');
    });
  }
}

// Image optimization utilities
export const optimizeImage = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
} = {}): string => {
  const { width, height, quality = 80, format = 'webp' } = options;

  // For external images (Unsplash), add optimization parameters
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    if (quality) url.searchParams.set('q', quality.toString());
    if (format) url.searchParams.set('fm', format);
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('crop', 'center');
    return url.toString();
  }

  return src;
};

// Cache utilities
export const setCacheHeaders = (url: string, maxAge: number = 86400): void => {
  // This would typically be done on the server side
  // For client-side, we can use service worker or cache API
  if ('caches' in window) {
    caches.open('growvo-cache-v1').then(cache => {
      fetch(url).then(response => {
        const responseWithCache = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...Object.fromEntries(response.headers.entries()),
            'Cache-Control': `max-age=${maxAge}`,
          },
        });
        cache.put(url, responseWithCache);
      });
    });
  }
};

// Performance monitoring
export const measurePerformance = () => {
  if ('performance' in window) {
    // Measure Time to First Byte (TTFB)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      console.log('TTFB:', navigation.responseStart - navigation.requestStart);
    }

    // Measure DOM Content Loaded
    window.addEventListener('DOMContentLoaded', () => {
      const domContentLoaded = performance.now();
      console.log('DOM Content Loaded:', domContentLoaded);
    });

    // Measure Load Complete
    window.addEventListener('load', () => {
      const loadComplete = performance.now();
      console.log('Load Complete:', loadComplete);
    });
  }
};
