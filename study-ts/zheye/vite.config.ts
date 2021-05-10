import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    WindiCSS(),
    vue()
  ],
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
})
