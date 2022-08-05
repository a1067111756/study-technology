<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { onMounted } from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  const initThreeScene = () => {
    /* 场景 */
    const scene = new THREE.Scene()

    /* 相机 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(10, 5, 10)
    scene.add(camera)

    /* 渲染器 */
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 将渲染器绑定到dom
    document.getElementById('main-container')!.appendChild(renderer.domElement)

    /* 物体对象 */
    // 创建随机顶点
    const count = 5000
    const randomGeometry = new THREE.BufferGeometry()

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
      colors[i] = Math.random()
    }
    randomGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    randomGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // 设置材质
    const pointMaterial = new THREE.PointsMaterial({
      // 颜色
      color: 0xfff000,
      // 点大小
      size: 0.5,
      // 相机深度衰减，透视摄像机才有效, true效果是随距离大小发生衰减。false效果是大小都保持一致
      sizeAttenuation: true
    })

    // 设置贴图
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('src/assets/1.png')
    pointMaterial.map = texture
    pointMaterial.alphaMap = texture
    pointMaterial.transparent = true
    pointMaterial.depthWrite = false // 材质是否对深度缓冲区有任何影响
    pointMaterial.blending = THREE.AdditiveBlending // 混合模式
    pointMaterial.vertexColors = true // 启用顶点颜色

    // 生成对象并添加到场景
    const points = new THREE.Points(randomGeometry, pointMaterial)
    scene.add(points)

    /* 光源 */
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    /* 辅助工具 */
    // 坐标轴
    // const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    // 执行渲染
    function render () {
      requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }
    render()

    // 监测尺寸变化
    window.addEventListener('resize', () => {
      // 更新摄像头宽高比
      camera.aspect = window.innerWidth / window.innerHeight
      // 更新摄像机投影矩阵
      camera.updateProjectionMatrix()
      // 更新渲染器
      renderer.setSize(window.innerWidth, window.innerHeight)
      // 设置渲染器像素比
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }

  onMounted(() => {
    initThreeScene()
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
