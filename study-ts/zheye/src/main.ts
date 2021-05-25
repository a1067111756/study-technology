import { createApp } from 'vue'
import App from './App.vue'
import '@/config/style.config.js'
import store from './store/index.js'
import router from './router/index.js'
import pluginConfig from '@/config/plugin.config.js'
import prototypeConfig from '@/config/prototype.config.js'

createApp(App)
  .use(store)
  .use(router)
  .use(pluginConfig)
  .use(prototypeConfig)
  .mount('#app')
