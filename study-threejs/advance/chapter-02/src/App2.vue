<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import textureUrl from './assets/door/color.jpg'
  import alphaTextureUrl from './assets/door/alpha.jpg'
  import normalTextureUrl from './assets/door/normal.jpg'
  import aoTextureUrl from './assets/door/ambientOcclusion.jpg'
  import roughnessTextureUrl from './assets/door/roughness.jpg'
  import displacementTextureUrl from './assets/door/height.jpg'
  import metalnessTextureUrl from './assets/door/metalness.jpg'
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

    /* 辅助工具 */
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    /* 物体对象 */
    // 创建物体 - 置换贴图需要设置顶点数量才能出现效果
    const geometry = new THREE.BoxGeometry(4, 4, 4, 100, 100, 100)
    // aoMap环境贴图需要设置第二组uv
    geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))

    // 创建材质贴图
    const doorTexture = new THREE.TextureLoader().load(textureUrl)
    // 创建环境贴图
    const aoTexture = new THREE.TextureLoader().load(aoTextureUrl)
    // 创建透明贴图
    const alphaTexture = new THREE.TextureLoader().load(alphaTextureUrl)
    // 置换贴图
    const displacementTexture = new THREE.TextureLoader().load(displacementTextureUrl)
    // 粗糙度贴图
    const roughnessTexture = new THREE.TextureLoader().load(roughnessTextureUrl)
    // 金属贴图
    const metalnessTexture = new THREE.TextureLoader().load(metalnessTextureUrl)
    // 法线贴图
    const normalTexture = new THREE.TextureLoader().load(normalTextureUrl)

    // 设置材质
    const material = new THREE.MeshStandardMaterial({
      map: doorTexture, // 贴图纹理
      alphaMap: alphaTexture, // 透明纹理
      transparent: true, // 是否支持透明选项
      aoMap: aoTexture, // 环境纹理
      aoMapIntensity: 1, // 环境遮挡效果的强度
      displacementMap: displacementTexture, // 置换贴图
      displacementScale: 0.2, // 置换贴图位置缩放比
      roughnessMap: roughnessTexture, // 粗糙度贴图
      roughness: 0.5, // 全局粗糙度，默认是0
      metalnessMap: metalnessTexture, // 金属贴图
      metalness: 0, // 全局金属度，默认是0
      normalMap: normalTexture // 法线贴图
    })
    // 材质双面显示
    material.side = THREE.DoubleSide

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
