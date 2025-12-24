import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to access cwd() as it might not be properly typed in this build context
  const env = loadEnv(mode, (process as any).cwd(), '')
  
  return {
    define: {
      // This ensures process.env.API_KEY is available in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg'],
        devOptions: {
          enabled: true
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true
        },
        manifest: {
          name: 'Shepherd Scripture Companion',
          short_name: 'Shepherd',
          description: 'A peaceful, intelligent Bible verse assistant.',
          theme_color: '#1e1b4b',
          background_color: '#1e1b4b',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: 'icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: 'icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        }
      })
    ]
  }
})