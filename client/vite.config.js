import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ── Dev Server ──────────────────────────────────────────
  server: {
    port: 5173,
    // Warm up the most-used routes on startup so first HMR is instant
    warmup: {
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/pages/Home.jsx',
        './src/components/Navbar.jsx',
        './src/components/Footer.jsx',
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ── Dependency Pre-Bundling ─────────────────────────────
  // Tells Vite to pre-bundle these on startup rather than on first import,
  // which eliminates the "waterfall" of slow requests during dev.
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-toastify',
      'react-helmet-async',
    ],
  },

  // ── Build / Chunk Splitting ─────────────────────────────
  build: {
    // Use esbuild for faster minification
    minify: 'esbuild',
    // Split large vendors into separate chunks → better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-ui': ['react-toastify', 'react-helmet-async'],
        },
      },
    },
    // Raise chunk warning limit (we split properly above)
    chunkSizeWarningLimit: 1000,
  },

  // ── Vitest ─────────────────────────────────────────────
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
