import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react({
      include: "**/*.{jsx,js}",
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three'],
          framerMotion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
});

