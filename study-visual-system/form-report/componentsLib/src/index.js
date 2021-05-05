import FlyBox from './components/FlyBox.vue'
import DatavLoading from './components/DatavLoading.vue'
import DatavContainer from './components/DatavContainer.vue'

export default {
  install: (app, options) => {
    app.component(FlyBox.name, FlyBox)
    app.component(DatavLoading.name, DatavLoading)
    app.component(DatavContainer.name, DatavContainer)
  }
}