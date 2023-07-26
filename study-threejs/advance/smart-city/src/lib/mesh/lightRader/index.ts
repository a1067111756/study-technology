import gsap from 'gsap'
import * as THREE from "three"
import vertexShader from '../../shader/light-rader/vertex.glsl?raw'
import fragmentShader from '../../shader/light-rader/fragment.glsl?raw'

// 光墙特效
export default class LightWRader {
  public geometry: THREE.PlaneBufferGeometry;
  public material: THREE.ShaderMaterial;
  public mesh: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.ShaderMaterial>;

  constructor(eventData: any) {
    // 1. 创建圆柱几何体
    this.geometry = new THREE.PlaneBufferGeometry(0.15, 0.15)

    // 2. 设置材质
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    })

    // 3. 设置mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(eventData.x, eventData.y - 0.125, eventData.z)
    this.mesh.rotation.x = -Math.PI / 2

    /* 获取建筑高度差传递到着色器 - 做光墙透明扫面效果 */
    // 传递高度差到着色器
    this.material.uniforms.uColor = {
      value: new THREE.Color('#ffff00')
    }
    this.material.uniforms.uTime = {
      value: 0
    }

    /* 光强进行缩放动画 */
    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none"
    })
  }
}
