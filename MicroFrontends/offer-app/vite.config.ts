import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './src/environments')
  return {
    plugins: [
      react(),
      federation({
        name: 'OfferApp',
        filename: 'remoteEntry.js',
        remotes: {
          HostApp: env.VITE_HOST_URL || 'http://localhost:5000/assets/remoteEntry.js'
        },
        exposes: {
          './remoteRoutes': './src/routes/remoteRoutes'
        },
        shared: ['react', 'react-dom', '@tanstack/react-router']
      })
    ],
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5002,
      strictPort: true,
      cors: true
    },
    envDir: './src/environments',
  }
})