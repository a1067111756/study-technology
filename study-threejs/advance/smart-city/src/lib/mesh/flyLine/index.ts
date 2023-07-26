/*  飞线模型 */
import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '../../shader/fly-line/vertex.glsl?raw'
import fragmentShader from '../../shader/fly-line/fragment.glsl?raw'

export default class FlyLine {
    public geometry: THREE.TubeGeometry;
    public material: THREE.MeshBasicMaterial;
    public mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>;

    constructor () {
        // 1. 创建曲线路劲
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.25, 0.05, 0.05),
            new THREE.Vector3(0.365, 0.2, 0.15),
            new THREE.Vector3(0.48, 0.05, 0.25)
        ])

        // 2. 创建飞线几何体
        this.geometry = new THREE.TubeGeometry(path, 100, 0.01, 2, false)

        // 3. 创建飞线材质
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load('src/assets/textures/z_11.png')
        texture.repeat.set(1, 2)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.MirroredRepeatWrapping
        this.material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        })

        // 4. 创建mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        // 5. 设置动画
        gsap.to(texture.offset, {
            x: -1,
            duration: 1,
            ease: 'none',
            repeat: -1
        })
    }
}

export class FlyLine2 {
    public mesh: THREE.Points;
    public geometry: THREE.BufferGeometry;
    public shaderMaterial: THREE.ShaderMaterial;

    constructor () {
        // 1. 创建曲线路劲
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.25, 0.05, 0.05),
            new THREE.Vector3(0.22, 0.25, 0.17),
            new THREE.Vector3(0.18, 0.065, 0.36)
        ])

        // 2. 创建几何体
        const points = path.getPoints(1000)
        this.geometry = new THREE.BufferGeometry().setFromPoints(points)

        // 记录每个点大小(流星飞线是开始细，后面粗)
        const aSizeArray = new Float32Array(points.length)
        for (let i = 0; i < points.length; i++) {
            aSizeArray[i] = i
        }
        // 将位置属性传递给着色器
        this.geometry.setAttribute('aSize', new THREE.BufferAttribute(aSizeArray, 1))

        // 3. 创建飞线材质
        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        // 4. 创建mesh
        this.mesh = new THREE.Points(this.geometry, this.shaderMaterial)
    }
}

