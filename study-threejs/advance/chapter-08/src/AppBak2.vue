/* 着色器打造烟雾水云效果 */
<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { onMounted } from 'vue'
import vertexShader from './shader/water/vertex.glsl?raw'
import fragmentShader from './shader/water/fragment.glsl?raw'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const initThreeScene = () => {
  // 用户图形配置工具
  const gui = new dat.GUI()

  /* 场景 */
  const scene = new THREE.Scene()

  /* 相机 */
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0.5, 1)
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
  // 动态参数
  const geometryParams = {
    // 水波频率
    uWareFrequency: 14,
    // 水波缩放比
    uWareScale: 0.03,
    // 水波xz轴比例缩放
    uWareXzScale: 1.5,
    // 噪音频率
    uNoiseFrequency: 10,
    // 噪音缩放比
    uNoiseScale: 1.5,
    // 计时器
    uTime: 0,
    // x轴水流动速度
    xSpeed: 1,
    // z轴水流动速度
    zSpeed: 1,
    // 噪音流动速度
    noiseSpeed: 1,
    // 低位颜色
    uLowColor: '#337ecc',
    // 高位颜色
    uHighColor: '#c6e2ff'
  }

  // 创建物体
  const geometry = new THREE.PlaneGeometry(1, 1, 1024, 1024)
  // 创建材质
  const material = new THREE.ShaderMaterial({
    // 投影矩阵 * 视图矩阵 * 模型矩阵 * 顶点坐标
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uWareFrequency: {
        value: geometryParams.uWareFrequency
      },
      uWareScale: {
        value: geometryParams.uWareScale
      },
      uWareXzScale: {
        value: geometryParams.uWareXzScale
      },
      uNoiseFrequency: {
        value: geometryParams.uNoiseFrequency
      },
      uNoiseScale: {
        value: geometryParams.uNoiseScale
      },
      uTime: {
        value: geometryParams.uTime
      },
      xSpeed: {
        value: geometryParams.xSpeed
      },
      zSpeed: {
        value: geometryParams.zSpeed
      },
      noiseSpeed: {
        value: geometryParams.noiseSpeed
      },
      uLowColor: {
        value: new THREE.Color(geometryParams.uLowColor),
      },
      uHighColor: {
        value: new THREE.Color(geometryParams.uHighColor),
      }
    },
    transparent: true
  })

  // 物体绑定材质
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.x = -Math.PI / 2
  scene.add(cube)

  // 设置gui控制参数
  gui.add(geometryParams, 'uWareFrequency').min(1).max(100).step(0.1).onChange((value: number) => {
    material.uniforms.uWareFrequency.value = value
  })
  gui.add(geometryParams, 'uWareScale').min(0).max(0.2).step(0.001).onChange((value: number) => {
    material.uniforms.uWareScale.value = value
  })
  gui.add(geometryParams, 'uWareXzScale').min(0).max(5).step(0.1).onChange((value: number) => {
    material.uniforms.uWareXzScale.value = value
  })
  gui.add(geometryParams, 'uNoiseFrequency').min(1).max(100).step(0.1).onChange((value: number) => {
    material.uniforms.uNoiseFrequency.value = value
  })
  gui.add(geometryParams, 'uNoiseScale').min(0).max(5).step(0.001).onChange((value: number) => {
    material.uniforms.uNoiseScale.value = value
  })
  gui.add(geometryParams, 'xSpeed').min(0).max(5).step(0.001).onChange((value: number) => {
    material.uniforms.xSpeed.value = value
  })
  gui.add(geometryParams, 'zSpeed').min(0).max(5).step(0.001).onChange((value: number) => {
    material.uniforms.zSpeed.value = value
  })
  gui.add(geometryParams, 'noiseSpeed').min(0).max(5).step(0.001).onChange((value: number) => {
    material.uniforms.noiseSpeed.value = value
  })
  gui.addColor(geometryParams, 'uLowColor').onFinishChange((value: string) => {
    material.uniforms.uLowColor.value = new THREE.Color(value)
    console.log(new THREE.Color(value))
  })
  gui.addColor(geometryParams, 'uHighColor').onFinishChange((value: string) => {
    material.uniforms.uHighColor.value = new THREE.Color(value)
  })

  /* 轨道控制器 */
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼, 必须在动画循环中调用update
  controls.enableDamping = true

  // 执行渲染
  const clock = new THREE.Clock()
  function render () {
    // 更新间隔时间
    material.uniforms.uTime.value = clock.getElapsedTime()

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
