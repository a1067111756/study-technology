import DataVComponentsLib from '../../../componentsLib/dist/bundle.es'

export default {
  install: (app, options) => {
    // 注册davav全局组件
    app.use(DataVComponentsLib)
  }
}
