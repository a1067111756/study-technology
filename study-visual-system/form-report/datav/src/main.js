import App from './App.vue'
import { createApp } from 'vue'
import '@/config/style.config'
import pluginInstall from '@/config/plugin.config'

const app = createApp(App)
app.use(pluginInstall).mount('#app')
