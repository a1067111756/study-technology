/* 全局属性相关注册 */
import ApiInstall from '@/api/index.ts'

const install = (app) => {
  // 注册api全局属性$api
  ApiInstall(app)
}

export default install
