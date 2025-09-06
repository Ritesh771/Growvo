import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './lib/serviceWorker'
import { ResourcePreloader, measurePerformance } from './lib/performance'

// Register service worker for caching
if (import.meta.env.PROD) {
  registerServiceWorker();
}

// Initialize performance monitoring
measurePerformance();

// Preload critical resources
const preloader = ResourcePreloader.getInstance();
preloader.preloadCriticalResources();

// Preload on page load
window.addEventListener('load', () => {
  // Additional preloading after initial load
  setTimeout(() => {
    preloader.preloadImage('/src/assets/stalightlogo.jpeg');
  }, 1000);
});

// Performance observer for web vitals
if ('PerformanceObserver' in window) {
  // Observe Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP observation not supported');
  }

  // Observe First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID observation not supported');
  }

  // Observe Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS observation not supported');
  }
}

createRoot(document.getElementById("root")!).render(<App />);
