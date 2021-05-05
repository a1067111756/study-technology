// vue.config.js
const vueConfig = {
  devServer: {
    port: 8000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 本地环境
      '/dev': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
}

module.exports = vueConfig
