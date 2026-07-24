import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Đổi thành '/ten-thu-muc/' nếu deploy vào sub-path
  base: '/',
  // Worker của pdf.js được khởi tạo với `type: 'module'` (xem PdfViewer),
  // nên Vite phải xuất worker ở dạng ES module thay vì 'iife' mặc định.
  worker: {
    format: 'es',
  },
  server: {
    port: 5173,
    open: true,
  },
})
