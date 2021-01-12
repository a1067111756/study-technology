import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

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
        .all([
          // this.loadBgModel(), 
          // this.loadMapModel(),
          this.loadSvg({ url: 'model/svg/circle-lines.svg' }),
          this.loadSvg({ url: 'model/svg/direction.svg' })
        ])
        .then(obj => {
          // 添加网格
          this.addGrid()

          // 添加导入的模型
          obj.map(item => { this.mapGroup.add(item) })

          // 根据自己模型的大小设置位置
          this.mapGroup.position.set(0, 0, 0)
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
          resolve(obj.scene)
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
          resolve(obj.scene)
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
      grid.position.set(0, 0, 0)
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
      mesh.position.set(0, 0, 0)
      this.mapGroup.add(mesh)
    },

    // 方法 - 加载Svg资源
		loadSvg (opt) {
      return new Promise((resolve, reject) => {
        const loader = new SVGLoader()
        loader.load(opt.url, function (data) {
          const paths = data.paths;
          const group = new THREE.Group();
          group.position.x = -1150;
          group.position.y = 0;
          group.position.z = 700;
          group.scale.y *= -1;
          group.rotation.x = Math.PI / 2
  
          for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[i];
            const material = new THREE.MeshBasicMaterial({
              color: path.color,
              side: THREE.DoubleSide,
              depthWrite: false
            })
  
            const shapes = path.toShapes(true);
            for (let j = 0; j < shapes.length; j++) {
              const shape = shapes[j]
              const geometry = new THREE.ShapeBufferGeometry(shape, 40)
              const mesh = new THREE.Mesh(geometry, material)
              group.add(mesh)
            }
          }

          resolve(group)
        }, function (xhr) {
          console.log(`svg图加载中：${(xhr.loaded / xhr.total * 100)}%`);
        }, (error) => {
          console.log(`svg加载发生错误`, error);
          reject(error)
        })        
      })
		}      
  }
}
