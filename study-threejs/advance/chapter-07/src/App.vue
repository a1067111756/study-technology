<template>
  <div id="main-container"></div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import * as CANNON from 'cannon-es'
  import { onMounted } from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import Stats  from 'three/examples/jsm/libs/stats.module'

  const initThreeScene = () => {
    /* 场景 */
    const scene = new THREE.Scene()

    /* 相机 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(5, 5, 10)
    scene.add(camera)

    /* 渲染器 */
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
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
    // 创建平面
    const planeGeometry = new THREE.PlaneBufferGeometry(10, 5)
    const planeMaterial = new THREE.MeshStandardMaterial({ color: '#86909c', side: THREE.DoubleSide })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    // 创建小球
    const sphereGeometry = new THREE.SphereGeometry(0.3, 100, 100)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: '#d73019' })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.castShadow = true
    sphere.position.set(0, 4, 0)
    scene.add(sphere)

    /* 光源 */
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)

    // 直射光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 10, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    /* 轨道控制器 */
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼, 必须在动画循环中调用update
    controls.enableDamping = true

    /* 创建物理环境 */
    // 1. 创建物理世界
    const world = new CANNON.World()
    // 设置重力属性
    world.gravity.set(0, -9.8, 0)

    // 2. 创建与threeJs对应的物理对象
    const sphereBodyMaterial = new CANNON.Material()
    const sphereBody = new CANNON.Body({
      // 物体形状
      shape: new CANNON.Sphere(0.3),
      // 物体位置
      position: new CANNON.Vec3(0, 4, 0),
      // 物体质量
      mass: 1,
      // 物体材质
      material: sphereBodyMaterial
    })
    const planeBodyMaterial = new CANNON.Material()
    const planeBody = new CANNON.Body({
      // 物体形状
      shape: new CANNON.Plane(),
      // 物体位置
      position: new CANNON.Vec3(0, 0, 0),
      // 物体质量, 质量为0时，物体碰撞会保持不动
      mass: 0,
      // 物体材质
      material: planeBodyMaterial
    })
    // 物体旋转
    planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)

    // 设置碰撞关联材质
    const contactMaterial = new CANNON.ContactMaterial(
        sphereBodyMaterial,
        planeBodyMaterial,
        {
          // 摩擦系数
          friction: 0.1,
          // 弹性系数
          restitution: 0.7
        }
    )
    world.addContactMaterial(contactMaterial)

    // 监听小球碰撞事件
    const audio = new Audio('src/assets/hit.mp3')
    sphereBody.addEventListener('collide', (e: any) => {
      const impactStrength = e.contact.getImpactVelocityAlongNormal()
      if (impactStrength > 2) {
        audio.currentTime = 0.5
        audio.volume = impactStrength / 10
        audio.play()
      }
    })

    // 3. 将物理对象添加到物理世界
    world.addBody(sphereBody)
    world.addBody(planeBody)


    // 执行渲染
    const clock = new THREE.Clock()
    function render () {
      requestAnimationFrame(render)
      controls.update()
      stats.update()
      // 4. 更新物理引擎中的物体
      world.step(1/60, clock.getDelta())
      sphere.position.copy(sphereBody.position as any)
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
