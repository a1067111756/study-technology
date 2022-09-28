import { createApp } from 'vue'
import App from './App.vue'
import 'vue-fullpage.js/dist/style.css'
// @ts-ignore
import VueFullPage from 'vue-fullpage.js'

createApp(App)
  .use(VueFullPage)
  .mount('#app')
