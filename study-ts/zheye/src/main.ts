import { createApp } from 'vue'
import App from './App.vue'
import '@/config/style.config.js'
import router from './router/index.js'
import pluginConfig from '@/config/plugin.config.js'

const app = createApp(App)
app.use(pluginConfig)
app.use(router)
app.mount('#app')
