import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/persons': {
        target: 'https://urban-broccoli-qrx665wg7xc4xjq-3001.app.github.dev/persons',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/persons','')
      }
    }
  }
})
