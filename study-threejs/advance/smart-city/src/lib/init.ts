// 初始化
import scene from './scene'
import camera from './camera'
import renderer from './renderer'
import controls from './controls'
import axesHelper from './axesHelper'
import statsHelper from './statsHelper'
import loadCity from './mesh/city'

// 方法 - 执行渲染
function render () {
    requestAnimationFrame(render)
    controls.update()
    statsHelper.update()
    renderer.render(scene, camera)
}

const init = (eventData: any) => {
    // 添加相机
    scene.add(camera)

    // 添加辅助工具
    // scene.add(axesHelper)

    // 将渲染器绑定到dom
    document.getElementById('canvas')!.appendChild(renderer.domElement)

    // 加载对象
    loadCity(eventData)

    // 执行页面渲染
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

export default init

