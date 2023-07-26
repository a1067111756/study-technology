import * as THREE from 'three'

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  // 设置抗锯齿
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

// 导出
export default renderer
