import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  base: './',
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
              return 'vendor-mui';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('swiper') || id.includes('slick-carousel') || id.includes('react-slick')) {
              return 'vendor-swiper';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-react';
            }
            // Group other remaining node_modules into a general vendor chunk
            return 'vendor-others';
          }
        },
      },
    },
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})

