<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { onMounted } from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import Stats  from 'three/examples/jsm/libs/stats.module'

  const initThreeScene = () => {
    /* 场景 */
    const scene = new THREE.Scene()

    /* 相机 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(20, 15, 20)
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
    // 帧率监控
    const stats = Stats()
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.right = '10px'
    stats.domElement.style.top = '20px'
    stats.domElement.style.left = 'unset'
    document.body.appendChild(stats.domElement)

    /* 物体对象 */
    const cubeArr: Array<THREE.Mesh> = []
    // 创建物体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      wireframe: true
    })
    // 物体绑定材质
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        for (let k = 0; k < 10; k++) {
          const cube = new THREE.Mesh(geometry, material)
          cube.position.set(i, j, k)
          cubeArr.push(cube)
          scene.add(cube)
        }
      }
    }

    /* 设置光线投射 */
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    window.addEventListener('click', (event) => {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

      // 使用新的原点和方向更新射线
      raycaster.setFromCamera(mouse, camera)
      // 检查光线与对象之间的所有交集
      const intersectRes = raycaster.intersectObjects(cubeArr)

      intersectRes.forEach(item => {
        item.object.material = new THREE.MeshBasicMaterial({
          color: '#ff0000'
        })
      })
    })

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    // 执行渲染
    function render () {
      requestAnimationFrame(render)
      controls.update()
      stats.update()
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
