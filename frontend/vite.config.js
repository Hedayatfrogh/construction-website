import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all network interfaces (0.0.0.0) so the dev server is
    // reachable from other devices on the same Wi-Fi / LAN.
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
    // Allow any host header (so phones / other PCs hitting
    // http://<your-laptop-ip>:5175 aren't blocked by Vite's host check).
    allowedHosts: true,
    // Proxy API requests to the local backend. Using a relative path
    // (`/api`) means the same frontend bundle works whether you open it
    // from `localhost`, `127.0.0.1`, or `http://192.168.x.x:5173` - no
    // need to know the LAN IP at build time.
    proxy: {
      '/api': {
        target: 'http://localhost:2000',
        changeOrigin: true,
        secure: false,
      },
      '/Uploads': {
        target: 'http://localhost:2000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

