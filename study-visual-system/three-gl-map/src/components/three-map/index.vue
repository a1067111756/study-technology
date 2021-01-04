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
import lightMixins from './mixins/_light'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  name: 'global-three-map',
  mixins: [drawMixins, renderMixins, lightMixins],
  data() {
    return {
      scene: null,
      camera: null,
      baseGroup: null,
      mapCache: {
        province: {
          inside: null,
          around: null,
          outside: null
        }
      },
      gui: {
        spotLightGuiSwitch: false,
        rectLightGuiSwitch: false,
        faceGuiSwitch: false,
        baseGroupGuiSwitch: false,
        cameraGuiSwitch: false,
        hotmapGuiSwitch: false
      } 
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

      // 定义摄像机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
      // this.camera.up.set(0, 1, 0);
      this.camera.position.set(-30, 40, 1600)
      this.camera.lookAt(this.scene.position)
      this.scene.add(this.camera)

      // 定义渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true }) // 开启反锯齿
      this.renderer.setClearColor("#091F31", 1)
      this.renderer.toneMappingExposure = 1 // 色调映射的曝光级别
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置场景大小
      this.renderer.setPixelRatio(window.devicePixelRatio) // 设置分辨率比

      const axisHelper = new THREE.AxisHelper( 500 ); 
      this.scene.add( axisHelper );

      // 实力换加载器
      const loader = new GLTFLoader()
      loader.load('model/gz.glb', (obj) => {
        let group = new THREE.Group()
        group.add(obj.scene)

        // 根据自己模型的大小设置位置
        group.position.set(300, 0, 0)
        group.rotation.x = Math.PI / 2
        group.rotation.y = 0
        group.rotation.z = 0
        // group.rotation.set(Math.PI / 2, 0, 0)
        this.scene.add(group)

      },function (xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },function (error) {
        console.log('load error!, ', error);
      })

      // 添加光源
      // const ambiColor = 0xffffff;
      // const ambientLight = new THREE.AmbientLight(ambiColor)
      // this.scene.add(ambientLight)      
      const spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(-40, 60, 20)
      spotLight.castShadow = true;
      spotLight.intensity = 20
      spotLight.shadow.mapSize.width = 2048; //设置阴影分辨率
      spotLight.shadow.mapSize.height = 2048;
      this.scene.add(spotLight);

      // 挂在dom
      document
        .getElementById('map')
        .appendChild(this.renderer.domElement)      

      // 渲染
      this.render()
    },

    // 方法 - 绘制
    draw () {



      // // 渲染器初始化设置
      // this.renderer.setClearColor("#091F31", 1)
      // this.renderer.shadowMap.enabled = true
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap 

      //绘画场景
      // this.$$draw()

      // // 设置背景板
      // let material = new THREE.MeshLambertMaterial({color: "0x808080", dithering: true});
      // let geometry = new THREE.PlaneBufferGeometry(10000, 10000);
      // let mesh = new THREE.Mesh(geometry, material);
      // mesh.name = '背景板'
      // mesh.position.set(0, 0, -80);
      // mesh.receiveShadow = true;
      // this.baseGroup.add(mesh);
    },

    // 方法 - 渲染
    render () {
      window.requestAnimationFrame(this.render)
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