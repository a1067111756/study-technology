import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  data () {
    return {
      mapGroup: null // 地图模型加载集合
    }
  },
  mounted() {
    this.mapGroup = new THREE.Group()
  },
  methods: {
    // 加载模型
    loaderModel () {
      Promise
        .all([this.loadMapModel(), this.loadBgModel()])
        .then(obj => {
          obj.map(item => {
            this.mapGroup.add(item.scene)
          })

          // 根据自己模型的大小设置位置
          this.mapGroup.position.set(300, 0, 0)
          this.mapGroup.rotation.x = Math.PI / 2
          this.mapGroup.rotation.y = 0
          this.mapGroup.rotation.z = 0
          this.scene.add(this.mapGroup)
        })
        .catch(err => {
          console.error('模型加载出现问题：', err)
        })
    },

    // 加载地图模型
    async loadMapModel () {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()
        loader.load('model/gz.glb', (obj) => {
          resolve(obj)
        },function (xhr) {
          console.log(`地图模型加载中：${(xhr.loaded / xhr.total * 100)}%`);
        },function (error) {
          reject(error)
        })      
      })
    },

    // 加载背景面板
    async loadBgModel () {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()
        loader.load("model/bj.glb", (obj) => {
          resolve(obj)
        }, function (xhr) {
          console.log(`背景面板模型加载中：${(xhr.loaded / xhr.total * 100)}%`);
        }, (error) => {
          reject(error)
        })
      })   
    }    
  }
}
