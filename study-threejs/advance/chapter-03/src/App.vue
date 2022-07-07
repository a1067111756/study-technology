<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import * as dat from 'dat.gui'
  import { onMounted } from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  const initThreeScene = () => {
    // 用户图形配置工具
    const gui = new dat.GUI()

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
    renderer.shadowMap.enabled = true
    // 将渲染器绑定到dom
    document.getElementById('main-container')!.appendChild(renderer.domElement)

    /* 物体对象 */
    // 创建圆球
    const sphereGeometry = new THREE.SphereBufferGeometry(2, 30, 30)
    const sphereMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.castShadow = true
    scene.add(sphere)

    // 创建平面
    const planeGeometry = new THREE.PlaneGeometry( 40, 40 )
    const planeMaterial = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide} )
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -2
    plane.receiveShadow = true
    scene.add(plane)

    /* 光源 */
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)

    // 点光源球
    const point = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.1, 10, 10),
      new THREE.MeshStandardMaterial({color: 0xff0000})
    )
    point.position.set(3, 3, 3)
    scene.add(point)

    const pointLight = new THREE.PointLight(0xff0000, 1)
    pointLight.castShadow = true
    // 设置聚光灯阴影模糊度
    pointLight.shadow.radius = 30
    // 设置阴影分辨率
    pointLight.shadow.mapSize.set(4096, 4096)
    point.add(pointLight)

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    /* 辅助工具 */
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

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
