import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import scene from "../../scene";
import * as THREE from "three";
import modifyCityMaterial from './modifyCityMaterial'
import FlyLine, { FlyLine2 } from "../flyLine";
import IconPoint  from "../iconPoint";
import LightWell  from "../lightWell";
import LightRader  from "../lightRader";


// 加载城市模型
export default (eventData: any) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('src/assets/model/city.glb', (gltf) => {
        // 修改模型mesh的材质
        gltf.scene.traverse((item) => {
            if (item.type === 'Mesh') {
                // @ts-ignore 设置默认材质
                item.material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(0x0c0e6f),
                })

                // 自定义城市材质
                modifyCityMaterial(item as THREE.Mesh)
            }
        });
        scene.add(gltf.scene)

        // 添加飞线
        const flyLine = new FlyLine()
        scene.add(flyLine.mesh)

        // 添加着色器制作的飞线
        const flyLine2 = new FlyLine2()
        scene.add(flyLine2.mesh)

        // 添加事件统计点
        eventData.forEach((item: any) => {
            const iconPoint = new IconPoint(item)
            scene.add(iconPoint.mesh)

            // 添加光墙效果
            if (item.type === '火警' || item.type === '电力') {
                const lightWell = new LightWell(item)
                scene.add(lightWell.mesh)
            } else if (item.type === '治安') {
                const lightRader = new LightRader(item)
                scene.add(lightRader.mesh)
            }
        })


        // alarmIconPoint.onClick((e) => {
        //     console.log(e)
        // })
    })
}

