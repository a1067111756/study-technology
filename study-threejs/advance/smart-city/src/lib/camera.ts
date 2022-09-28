import * as THREE from 'three'

// 相机初始化
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0.4, 0.8)

// 导出
export default camera
