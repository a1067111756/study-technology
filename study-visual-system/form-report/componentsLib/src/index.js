import DatavLoading from './DatavLoading.vue'

export default {
  install: (app, options) => {
    app.component(DatavLoading.name, DatavLoading)
  }
}