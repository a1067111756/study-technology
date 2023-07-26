<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { onMounted } from 'vue'
  import hdrUrl from './assets/env/002.hdr?url'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
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

    /* 辅助工具 */
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    /* 物体对象 */
    // 创建物体 - 置换贴图需要设置顶点数量才能出现效果
    const geometry = new THREE.SphereBufferGeometry(2, 30, 30)
    // 设置材质
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7, // 全局金属度，默认是0
      roughness: 0.1, // 全局粗糙度
    })
    // 材质双面显示
    material.side = THREE.DoubleSide

    new RGBELoader().loadAsync(hdrUrl).then(texture => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      // 场景添加背景
      scene.background = texture
      // 场景添加全局物体的环境贴图，如果物体自身没有环境贴图则使用该设置
      scene.environment = texture
    })

    // 物体绑定材质
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    /* 光源 */
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)

    // 直射光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

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
