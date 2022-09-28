import * as THREE from "three";
import gsap from 'gsap'

// 方法 - 添加渐变色效果
function addGradColor (shader: THREE.Shader, mesh: THREE.Mesh) {
    // 让mesh计算边框范围
    mesh.geometry.computeBoundingBox()

    // 获取建筑的高度差
    let boundingBox = mesh.geometry.boundingBox
    let uHeightDiff = boundingBox!.max.y - boundingBox!.min.y

    // 定义高度差uniform变量
    shader.uniforms.uHeightDiff = {
        value: uHeightDiff
    }
    // 定义建筑顶部uniform变量
    shader.uniforms.uTopColor = {
        value: new THREE.Color("#aaaeff")
    }

    // 修改顶点着色器 - 将顶点位置传递给片元着色器
    shader.vertexShader = shader.vertexShader.replace('#include <common>', `
        #include <common>
        varying vec3 vPosition;
    `)
    shader.vertexShader = shader.vertexShader.replace('//#replace_vertex_shader_flag#', `
        vPosition = position;
        //#replace_vertex_shader_flag#
    `)

    // 修改片元着色器 - 实现渐变色（原理 - 使用mix函数根据position.y进行渐变）
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
        #include <common>
        uniform vec3 uTopColor;
        uniform float uHeightDiff;
        varying vec3 vPosition;
    `)

    shader.fragmentShader = shader.fragmentShader.replace('//#replace_fragment_shader_flag#', `
        vec4 distGradColor = gl_FragColor;
        float gradMix = (vPosition.y + uHeightDiff / 3.0) / uHeightDiff;
        vec3 gradMixColor = mix(distGradColor.xyz, uTopColor, gradMix);
        gl_FragColor = vec4(gradMixColor, 1.0);
        //#replace_fragment_shader_flag#
    `)
}

// 方法 - 添加扩散效果
function addDiffusionColor (shader: THREE.Shader, mesh: THREE.Mesh) {
    // 扩散的中心点
    shader.uniforms.uDiffusionCenter = {
        value: new THREE.Vector2(0, 0)
    }
    // 扩散的时间
    shader.uniforms.uDiffusionTime = {
        value: 0
    }
    // 设置扩散条带的宽度
    shader.uniforms.uDiffusionWidth = {
        value: 100
    }

    // 修改片元着色器 - 实现扩散效果（原理 - 反抛物线函数）
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
        #include <common>
        uniform vec2 uDiffusionCenter;
        uniform float uDiffusionTime;
        uniform float uDiffusionWidth;
    `)

    shader.fragmentShader = shader.fragmentShader.replace('//#replace_fragment_shader_flag#', `
        // 当前点与中心点的距离
        float radius = distance(vPosition.xz, uDiffusionCenter);
        // 扩散函数  -x^2 + c
        float diffusionHeight = -(radius - uDiffusionTime) * (radius - uDiffusionTime) + uDiffusionWidth;
        // 显示y轴大于0的部分
        if (diffusionHeight > 0.0) {
            gl_FragColor = mix(gl_FragColor, vec4(1,1,1,1), diffusionHeight / uDiffusionWidth);
        }
        //#replace_fragment_shader_flag#
    `)

    gsap.to(shader.uniforms.uDiffusionTime, {
        value: 800,
        duration: 3,
        ease: 'none',
        repeat: -1
    })
}

// 方法 - 添加横向扫描效果
function addLineScanColor (shader: THREE.Shader, mesh: THREE.Mesh) {
    // 扩散的时间
    shader.uniforms.uScanTime = {
        value: -1000
    }
    // 设置扩散条带的宽度
    shader.uniforms.uScanWidth = {
        value: 40
    }

    // 修改片元着色器 - 实现扩散效果（原理 - 反抛物线函数）
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
        #include <common>
        uniform float uScanTime;
        uniform float uScanWidth;
    `)

    shader.fragmentShader = shader.fragmentShader.replace('//#replace_fragment_shader_flag#', `
        // 扩散函数  -x^2 + c
        float scanHeight = -(vPosition.x + vPosition.z - uScanTime) * (vPosition.x + vPosition.z - uScanTime) + uScanWidth;
        // 显示y轴大于0的部分
        if (scanHeight > 0.0) {
            gl_FragColor = mix(gl_FragColor, vec4(0.8,1.0,1.0,1), scanHeight / uScanWidth);
        }
        //#replace_fragment_shader_flag#
    `)

    gsap.to(shader.uniforms.uScanTime, {
        value: 1500,
        duration: 5,
        ease: 'none',
        repeat: -1
    })
}

// 默认导出
export default function modifyCityMaterial (mesh: THREE.Mesh) {
    // 在编译阶段获取着色器
    (mesh.material as THREE.Material).onBeforeCompile = (shader: THREE.Shader) => {
        // 插入着色器替换标识位置
        shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
            #include <fog_vertex>
            //#replace_vertex_shader_flag#
        `)
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
            #include <dithering_fragment>
            //#replace_fragment_shader_flag#
        `)

        // 添加建筑渐变色
        addGradColor(shader, mesh)

        // 添加建筑圆形扩散扫描效果
        addDiffusionColor(shader, mesh)

        // 添加建筑横向扩散扫描效果
        addLineScanColor(shader, mesh)
    };
}
