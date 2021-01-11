/* api自动注册脚本 */
import Vue from 'vue'

const api = {}

// 查找文件
const requirAll = require.context(
  // 指令目录
  './modules',
  // 查找目录
  true,
  // js文件
  /^\.\/.*\.js$/
)

// 匹配挂在属性
requirAll.keys().forEach(fileName => {
	// 模块名称
	const moduleName = fileName.slice(2, -3)
	
	// 添加挂在配置到api对象
	const config = requirAll(fileName)
	api[moduleName] = config.default
})

// 挂在$api属性到Vue
!Vue.prototype.$api && Object.defineProperties(Vue.prototype, {
	$api: {
		get () {
			return api
		}
	}
})
