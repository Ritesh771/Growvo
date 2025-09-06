import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
          animations: ['framer-motion', 'gsap'],
          utils: ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging in production
    sourcemap: false,
    // Minify for better performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap'],
    exclude: ['lucide-react'],
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
}));
