import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
    rollupOptions: {
      input: {
        metamask: path.resolve(__dirname, 'src', 'ui', 'pages', 'metamask', 'index.html'),
        logging: path.resolve(__dirname, 'src', 'ui', 'pages', 'logging', 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
