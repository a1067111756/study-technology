<template>
  <div style="position: fixed; bottom: 0;left: 0; z-index: 1; width: 100vw; height:100vh">
    <div id="map"></div>
  </div>
</template>

<script>
/* three.js相关对象引入 */
import * as THREE from 'three'
import drawMixins from './mixins/_draw'
import renderMixins from './mixins/_render'

export default {
  name: 'global-three-map',
  mixins: [drawMixins, renderMixins],
  data() {
    return {
      scene: null,
      camera: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 方法 - 初始化
    init () {
      this.$$bloomLayer()
      this.$$darkMaterial()

      // 定义场景
      this.scene = new THREE.Scene()
      // this.scene.fog = new THREE.Fog('#00060c', 2500, 4500)

      // 定义摄像机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.up.set(0, 1, 0);
      this.camera.position.set(-30, 40, 30)
      this.camera.lookAt(this.scene.position)
      this.scene.add(this.camera)

      // 定义渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true }) // 开启反锯齿
      // this.renderer.autoClear = false // 在渲染每一帧之前自动清除其输出置为false
      this.renderer.toneMappingExposure = 1 // 色调映射的曝光级别
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置场景大小
      this.renderer.setPixelRatio(window.devicePixelRatio) // 设置分辨率比

      this.$$render();

      // 挂在dom
      document
        .getElementById('map')
        .appendChild(this.renderer.domElement)      

      // 渲染
      this.render()
    },

    // 方法 - 绘制
    draw () {
      this.renderer.setClearColor("#091F31", 1); // 设置场景背景色
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;      
    },

    // 方法 - 渲染
    render () {
      // window.requestAnimationFrame(render)
      this.renderer.render(this.scene, this.camera)  
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