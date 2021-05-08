import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
})
