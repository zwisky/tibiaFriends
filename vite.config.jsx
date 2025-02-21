import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tibiaFriends/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@babel/plugin-proposal-decorators', { legacy: true }]
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: './index.html', // ¡CRÍTICO! Debe ser el HTML, no el JSX
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    minify: 'terser',
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  server: {
    open: true,
    port: 5173
  }
});