<template>
  <div style="position: fixed; bottom: 0;left: 0; z-index: 1; width: 100vw; height:100vh">
    <div id="stats"></div>
    <div id="map"></div>
  </div>
</template>

<script>
/* three.js相关对象引入 */
import * as THREE from 'three'
import drawMixins from './mixins/_draw'
import renderMixins from './mixins/_render'
import lightMixins from './mixins/_light'
import Stats from 'three/examples/jsm/libs/stats.module.js'

var scene = null

export default {
  name: 'global-three-map',
  mixins: [drawMixins, renderMixins, lightMixins],
  data() {
    return {
      stats: null,
      camera: null,
      baseGroup: null
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // this.renderer.forceContextLoss()
    // this.renderer = null
  },
  methods: {
    // 方法 - 初始化
    init () {
      // 初始化性能监测工具
      this.initStats()

      // 定义场景
      scene = new THREE.Scene()
      // scene.fog = new THREE.Fog('#00060c', 2500, 4500);

      // 定义摄像机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000)
      this.camera.position.set(0, 1600, 1200)
      this.camera.lookAt(scene.position)
      scene.add(this.camera)

      const axisHelper = new THREE.AxisHelper(50); 
      scene.add(axisHelper);

      // 定义渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true }) // 开启反锯齿
      this.renderer.setClearColor(0x000000, 1)
      this.renderer.toneMappingExposure = 1 // 色调映射的曝光级别
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置场景大小
      this.renderer.setPixelRatio(window.devicePixelRatio) // 设置分辨率比

      // 模型加载
      this.loaderModel(scene)

      // 添加光源
      this.initLinght(scene)

      // 挂在dom
      document
        .getElementById('map')
        .appendChild(this.renderer.domElement)      

      // // 渲染
      this.render()
    },
    // 方法 - 渲染
    render () {
      this.stats.update()
      window.requestAnimationFrame(this.render)
      this.renderer.render(scene, this.camera)  
    },
    // 方法 - 初始化性能监测工具
    initStats () {
      const stats = new Stats()
      stats.setMode(0)
      stats.domElement.style.position = 'absolute'
      stats.domElement.style.left = '0px'
      stats.domElement.style.top = '0px'
      document.getElementById("stats").appendChild(stats.domElement)
      this.stats = stats
    }
  },
}
</script>

<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
</style>