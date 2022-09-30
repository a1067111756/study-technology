import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import scene from "../../scene";
import * as THREE from "three";
import modifyCityMaterial from './modifyCityMaterial'
import FlyLine from "../flyLine";


// 加载城市模型
export default () => {
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
    })
}

