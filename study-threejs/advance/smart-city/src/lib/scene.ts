import * as THREE from 'three'

// 场景初始化
const scene = new THREE.Scene()

// 设置背景
const textureLoader = new THREE.CubeTextureLoader()
const textureCube = textureLoader.load([
  'src/assets/textures/bg1.jpg',
  'src/assets/textures/bg2.jpg',
  'src/assets/textures/bg3.jpg',
  'src/assets/textures/bg4.jpg',
  'src/assets/textures/bg5.jpg',
  'src/assets/textures/bg6.jpg'
])
scene.background = textureCube
scene.environment = textureCube

// 导出
export default scene
