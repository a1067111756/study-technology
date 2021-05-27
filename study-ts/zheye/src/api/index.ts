/* api分模块集中管理自动注册
   规则: 1. 读取modules文件夹下所有.js注册模块
        2. index.js导出项必须以export形式(因为一个文件可能会有多个导出项)
*/
const install = (app: any) => {
  // api集合
  let apiList: any = {}

  // 查找文件
  const modules = import.meta.globEager('./modules/*.ts')
  // const requirContext: __WebpackModuleApi.RequireContext = require.context(
  //   // 指令目录
  //   './modules',
  //   // 不查找子目录
  //   true,
  //   // js文件
  //   /.js$/
  // )

  // api接口分模块注入
  for (const fileName in modules) {
    const splitFileName = fileName.split('/')
    const apiKey: string = splitFileName[splitFileName.length - 1].slice(0, -3)
    const apiValue: object = modules[fileName]
    apiList[apiKey] = apiValue
  }
  // api接口分模块注入
  // requirContext.keys().forEach(fileName => {
  //   const keyName: string = fileName.slice(2, -3)
  //   const config: object = requirContext(fileName)
  //   apiList[keyName] = config
  // })

  // 将api集合挂载到$api属性
  // !Vue.prototype.$api && (Vue.prototype.$api = apiList)
  !app.config.globalProperties.$api && (app.config.globalProperties.$api = apiList)
}

export default install
