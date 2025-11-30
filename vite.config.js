import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/', // 部署到 GitHub Pages 时需要配置，需与仓库名一致
  plugins: [
    react(),
    tailwindcss(),
  ],
})
