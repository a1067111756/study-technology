import THREE from 'three'

function init () {
  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  scene.add(camera)

  // 添加平面
  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
  const planeMaterial =new THREE.MeshLambertMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(plane)

  // 添加基本光源
  const ambientLight = new THREE.AmbientLight(0x0c0c0c)
  scene.add(ambientLight)

  // 添加聚光源
  const spotLight = new THREE.SpotLight(0xffffff)
  scene.add(spotLight)

  document
    .getElementById('webgl')
    .appendChild(renderer.domElement)
  renderer.render(scene, camera)  
}

function addCube (scene, planeGeometry) {
  const cubeSize = Math.ceil(Math.random() * 3)
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  cube.name = 'cube' + scene.children.length
  cube.position.x = -30 + Math.round(Math.random() * planeGeometry.width)
  cube.position.y = Math.round(Math.random() * 5)
  cube.position.z = -20 + Math.round(Math.random() * planeGeometry.height)
  scene.add(cube)

  const ambientLight = new THREE.PointLight()
}