import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 生成适合静态部署的输出
    outDir: 'dist',
    assetsDir: 'assets',
    // 优化大型依赖包
    chunkSizeWarningLimit: 1000,
  },
})