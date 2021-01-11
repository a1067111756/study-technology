import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  data () {
    return {
      mapGroup: null // 地图模型加载集合
    }
  },
  mounted () {
    this.mapGroup = new THREE.Group()
  },
  methods: {
    // 加载模型
    loaderModel (scene) {
      Promise
        .all([this.loadBgModel(), this.loadMapModel()])
        .then(obj => {
          // 添加网格
          this.addGrid()

          // 添加导入的模型
          obj.map(item => {
            this.mapGroup.add(item.scene)
          })

  

          // 根据自己模型的大小设置位置
          this.mapGroup.position.set(500, 0, 0)
          scene.add(this.mapGroup)
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

    // 加载背景模型
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
    },    

    // 添加网格
    addGrid () {
      let size = 8000;
      let step = 60;

      // 网格
      let grid = new THREE.GridHelper(size, step - 1, 0xffffff, 0xffffff);
      grid.material.opacity = 0.03;
      grid.material.transparent = true;
      grid.position.set(0, 47, 0)
      this.mapGroup.add(grid)     
      
      // 网格点
      let points = [];
      let num = size / (step - 1);
      for (let i = 0; i < step; i++) {
        for (let j = 0; j < step; j++) {
          points.push(new THREE.Vector3((num * i) - size / 2, 0, (num * j) - size / 2));
        }
      }     
      let geometry = new THREE.BufferGeometry().setFromPoints(points)
      let material = new THREE.PointsMaterial({color: 0xffffff, size: 15, transparent: true, opacity: 0.2})
      let mesh = new THREE.Points(geometry, material)
      mesh.name = '点缀点阵集合'
      mesh.position.set(0, 47, 0)
      this.mapGroup.add(mesh)
    },
  }
}
