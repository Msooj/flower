import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: true, // Listen on all local IPs
        port: 3001,
        open: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'animation-vendor': ['framer-motion'],
                    'ui-vendor': ['lucide-react'],
                },
            },
        },
        // Improve chunk size warning threshold
        chunkSizeWarningLimit: 600,
    },
})

