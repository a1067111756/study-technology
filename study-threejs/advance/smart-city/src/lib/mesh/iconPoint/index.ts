import * as THREE from 'three'
import camera from "../../camera";
import renderer from "../../renderer";

export default class IconPoint {
  public mesh: THREE.Sprite;
  public material: THREE.SpriteMaterial;
  public clickFn: Array<(e: any) => void>;
  public raycaster: THREE.Raycaster;
  public mouse: THREE.Vector2;

  constructor (eventData: any) {
    // 加载精灵图
    const textureLoader = new THREE.TextureLoader()
    const map = textureLoader.load(eventData.icon)
    this.material = new THREE.SpriteMaterial({ map: map })
    this.mesh = new THREE.Sprite(this.material)

    // 设置大小
    this.mesh.scale.set(0.05, 0.05, 0.05);
    // 设置位置
    this.mesh.position.set(eventData.x, eventData.y, eventData.z)

    // 绑定点击事件
    this.clickFn = []
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    window.addEventListener('click', (event) => {
      let px = renderer.domElement.getBoundingClientRect().left;
      let py = renderer.domElement.getBoundingClientRect().top;
      this.mouse.x = ((event.clientX - px) / renderer.domElement.offsetWidth) * 2 - 1;
      this.mouse.y = -((event.clientY - py) / renderer.domElement.offsetHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, camera)
      const intersects = this.raycaster.intersectObject(this.mesh)
      if (intersects.length > 0) {
        console.log('选中了物体')
        this.clickFn.forEach(fn => {
          fn(event)
        })
      }
    })
  }

  onClick(callback: (e: any) => void) {
    this.clickFn.push(callback)
  }
}
