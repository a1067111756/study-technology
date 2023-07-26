import gsap from 'gsap'
import * as THREE from "three"
import vertexShader from '../../shader/light-well/vertex.glsl?raw'
import fragmentShader from '../../shader/light-well/fragment.glsl?raw'

// 光墙特效
export default class LightWell {
  public geometry: THREE.CylinderBufferGeometry;
  public material: THREE.ShaderMaterial;
  public mesh: THREE.Mesh<THREE.CylinderBufferGeometry, THREE.ShaderMaterial>;

  constructor(eventData: any) {
    // 1. 创建圆柱几何体
    this.geometry = new THREE.CylinderBufferGeometry(0.04, 0.04, 0.08, 32, 1, true)

    // 2. 设置材质
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    })

    // 3. 设置mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(eventData.x, eventData.y - 0.08, eventData.z)

    /* 获取建筑高度差传递到着色器 - 做光墙透明扫面效果 */
    // 让mesh计算边框范围
    this.mesh.geometry.computeBoundingBox()
    // 获取建筑的高度差
    let boundingBox = this.mesh.geometry.boundingBox
    let uHeightDiff = boundingBox!.max.y - boundingBox!.min.y
    // 传递高度差到着色器
    this.material.uniforms.uHeight = {
      value: uHeightDiff
    }

    /* 光强进行缩放动画 */
    gsap.to(this.mesh.scale, {
      x: 2,
      z: 2,
      duration: 1,
      repeat: -1,
      yoyo: true
    })
  }
}
