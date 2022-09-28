import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import camera from "./camera"
import renderer from "./renderer"

// 初始化轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 导出
export default controls
