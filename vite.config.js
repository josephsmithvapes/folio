import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Inline small assets as base64 to avoid extra requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor chunk from app code for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
