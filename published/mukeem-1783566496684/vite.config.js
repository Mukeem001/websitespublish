import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/sites/mukeem-1783566496684/",
  plugins: [react(), tailwindcss()],
})