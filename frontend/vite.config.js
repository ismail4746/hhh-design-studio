import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), imagetools()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  build: {
    sourcemap: false,
    rollupOptions: {
      // Vendor splitting is a browser concern only — in the SSR bundle react
      // and friends are external, and rollup rejects chunking externals.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              icons: ['lucide-react', 'react-icons'],
              axios: ['axios'],
            },
          },
    },
  },
}))
