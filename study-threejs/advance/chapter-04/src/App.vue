<template>
  <div id="main-container"></div>

  <PageProgressLoading
    v-if="loading"
    :progress="progress"
  />
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import * as dat from 'dat.gui'
  import { ref, onMounted } from 'vue'
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import PageProgressLoading from './components/PageProgressLoading.vue'
  import gltfModelUrl from './assets/model/gltf/DamagedHelmet.gltf?url'

  // 模型加载
  const progress = ref(0)
  const loading = ref(false)
  const initThreeScene = () => {
    // 用户图形配置工具
    const gui = new dat.GUI()

    /* 场景 */
    const scene = new THREE.Scene()

    /* 相机 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 20)
    scene.add(camera)

    /* 渲染器 */
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xcbe0e0)
    renderer.shadowMap.enabled = true
    // 将渲染器绑定到dom
    document.getElementById('main-container')!.appendChild(renderer.domElement)

    /* 加载进度管理 */
    const manager = new THREE.LoadingManager()
    manager.onStart = function (url, itemsLoaded) {
      if (itemsLoaded === 0) {
        loading.value = true
      }
    }
    manager.onLoad = function ( ) {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      progress.value = parseInt(itemsLoaded / itemsTotal * 100)
    }

    /* 物体对象 */
    // 加载glb模型
    const dracoLoader = new DRACOLoader(manager);
    dracoLoader.setDecoderPath( 'src/assets/model/glb/' );

    const glbLoader = new GLTFLoader(manager);
    glbLoader.setDRACOLoader( dracoLoader );
    glbLoader.load( 'src/assets/model/glb/LittlestTokyo.glb', function ( gltf ) {
      const model = gltf.scene;
      model.position.set(-10, 0, 0);
      model.scale.set(0.016, 0.016, 0.016);
      scene.add(model);

      const mixer = new THREE.AnimationMixer(model);
      mixer.clipAction( gltf.animations[0]).play();
    })

    // 加载gltf模型
    const gltfLoader = new GLTFLoader(manager)
    gltfLoader.load(gltfModelUrl, function(gltf){
      // 将模型添加至场景
      scene.add(gltf.scene)
      // 设置模型位置
      gltf.scene.position.set(0, 0, 0)
      // 设置模型大小
      gltf.scene.scale.set(5, 5, 5)
    })

    // 加载obj模型
    const mtlLoader = new MTLLoader(manager)
    const objLoader = new OBJLoader(manager)
    mtlLoader.load( 'src/assets/model/obj/IronMan.mtl', function (materials) {
      materials.preload()
      objLoader
        .setMaterials( materials )
        .load( 'src/assets/model/obj/IronMan.obj', function (object) {
          object.position.set(10, -5, 0);
          object.scale.set(0.04, 0.04, 0.04)
          scene.add(object)
        })
    })

    /* 光源 */
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    // 直射光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    /* 辅助工具 */
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

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

  #main-container {
    background-color: #cbe0e0
  }
</style>
