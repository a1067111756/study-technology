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
  // 代理设置
  server: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    }    
  }
})
