import DatavLoading from './DatavLoading.vue'
import FlyBox from './FlyBox.vue'

export default {
  install: (app, options) => {
    app.component(FlyBox.name, FlyBox)
    app.component(DatavLoading.name, DatavLoading)
  }
}