<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import TWEEN from '@tweenjs/tween.js'
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
    // 创建物体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    // 物体绑定材质
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    // 物体动画
    const moveTween = new TWEEN.Tween(cube.position)
        .to({ x: 5 }, 5000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .repeat(Infinity)
        .yoyo(true)
        .start();
    const rotationTween = new TWEEN.Tween(cube.rotation)
        .to({ x: Math.PI }, 5000)
        .repeat(Infinity)
        .start();
    const cubeTweenGroup = new TWEEN.Group()
    cubeTweenGroup.add(moveTween)
    cubeTweenGroup.add(rotationTween)

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
      cubeTweenGroup.update()
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
