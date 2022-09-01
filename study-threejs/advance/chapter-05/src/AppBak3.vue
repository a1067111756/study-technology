/* 粒子构建星旋臂 */
<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { onMounted } from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import Stats  from 'three/examples/jsm/libs/stats.module'

  const initThreeScene = () => {
    const params = {
      count: 3000,
      radius: 6,
      size: 0.2,
      color: 0xff6030,
      branch: 5
    }

    /* 生成单条星臂 */
    const generateStartBranch = () => {
      // 通过顶点构建图形
      const randomGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(params.count * 3)
      for (let i = 0; i < params.count; i++) {
        // 当前点位序号
        const curPosition = i * 3
        // 当前点距离圆心距离
        const distance = Math.random() * params.radius * Math.pow(Math.random(), 3)
        const randomX = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5
        const randomY = Math.pow(Math.random() * 2 - 1, 3)
        const randomZ = Math.pow(Math.random() * 2 - 1, 3)

        // X坐标
        positions[curPosition] = distance + randomX
        // Y坐标
        positions[curPosition + 1] = 0 + randomY
        // Z坐标
        positions[curPosition + 2] =  Math.tan(60 / params.radius * distance * Math.PI / 180) * distance + randomZ
      }
      randomGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      // 设置材质
      const pointMaterial = new THREE.PointsMaterial({
        // 颜色
        color: params.color,
        // 点大小
        size: params.size,
        // 相机深度衰减，透视摄像机才有效, true效果是随距离大小发生衰减。false效果是大小都保持一致
        sizeAttenuation: true
      })

      // 设置贴图
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(`src/assets/1.png`)
      pointMaterial.map = texture
      pointMaterial.alphaMap = texture
      pointMaterial.transparent = true
      pointMaterial.depthWrite = false // 材质是否对深度缓冲区有任何影响
      pointMaterial.blending = THREE.AdditiveBlending // 混合模式

      // 生成对象并添加到场景
      const pointsBranch = new THREE.Points(randomGeometry, pointMaterial)
      scene.add(pointsBranch)

      return pointsBranch
    }

    /* 生成星臂 */
    const generateGalaxy = () => {
      for (let i = 0; i < params.branch; i++) {
        const pointsBranch = generateStartBranch()
        pointsBranch.rotation.y = i * (360 / params.branch) * Math.PI / 180
      }
    }

    /* 场景 */
    const scene = new THREE.Scene()

    /* 相机 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(10, 5, 15)
    scene.add(camera)

    /* 渲染器 */
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 将渲染器绑定到dom
    document.getElementById('main-container')!.appendChild(renderer.domElement)

    /* 物体对象 */
    generateGalaxy()

    /* 光源 */
    // 环境光
    // const light = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(light)

    /* 辅助工具 */
    // 坐标轴
    // const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

    // 帧率监控
    const stats = new Stats()
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.right = '10px'
    stats.domElement.style.top = '20px'
    stats.domElement.style.left = 'unset'
    document.body.appendChild(stats.domElement)

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    // 执行渲染
    function render () {
      requestAnimationFrame(render)
      stats.update()
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
