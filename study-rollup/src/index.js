import Test from './Test.vue'

export default {
  install: (app, options) => {
    app.component(Test.name, Test)
  }
}