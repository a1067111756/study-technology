import Stats from 'three/examples/jsm/libs/stats.module'

// 帧率工具
const statsHelper = new (Stats as any)()
statsHelper.domElement.style.position = 'absolute'
statsHelper.domElement.style.right = '10px'
statsHelper.domElement.style.top = '20px'
statsHelper.domElement.style.left = 'unset'
document.body.appendChild(statsHelper.domElement)

// 导出
export default statsHelper