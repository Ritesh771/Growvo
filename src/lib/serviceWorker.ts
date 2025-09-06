// Service Worker Registration Utility
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              if (confirm('New content is available! Reload to get the latest version?')) {
                window.location.reload();
              }
            }
          });
        }
      });

      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Unregister service worker (for development)
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log('Service Worker unregistered');
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};
