import FlyBox from './FlyBox.vue'
import DatavLoading from './DatavLoading.vue'
import DatavContainer from './DatavContainer.vue'

export default {
  install: (app, options) => {
    app.component(FlyBox.name, FlyBox)
    app.component(DatavLoading.name, DatavLoading)
    app.component(DatavContainer.name, DatavContainer)
  }
}