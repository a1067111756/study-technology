<template>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  const init = () => {
    // 初始化webgl上下文
    const canvasInstance = document.getElementById('canvas') as any
    canvasInstance.width = window.innerWidth
    canvasInstance.height = window.innerHeight

    const webGl = canvasInstance.getContext('webgl')
    webGl.viewport(0, 0, canvasInstance.width, canvasInstance.height)

    // 创建顶点着色器
    const vertexShared = webGl.createShader(webGl.VERTEX_SHADER)
    webGl.shaderSource(vertexShared, `
        attribute vec4 a_Position;
        void main() {
          gl_Position = a_Position;
        }
    `)
    webGl.compileShader(vertexShared)

    // 创建片元着色器
    const fragmentShared = webGl.createShader(webGl.FRAGMENT_SHADER)
    webGl.shaderSource(fragmentShared, `
        void main() {
          gl_FragColor = vec4(1.0, 0, 0, 1.0);
        }
    `)
    webGl.compileShader(fragmentShared)

    // 创建着色器程序
    const program = webGl.createProgram()
    webGl.attachShader(program, vertexShared)
    webGl.attachShader(program, fragmentShared)

    // 链接着色器程序
    webGl.linkProgram(program)
    webGl.useProgram(program)

    // 创建顶点缓冲区数据
    const vertexBuffer = webGl.createBuffer()
    webGl.bindBuffer(webGl.ARRAY_BUFFER, vertexBuffer)
    const vertices = new Float32Array([
        0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])
    webGl.bufferData(webGl.ARRAY_BUFFER, vertices, webGl.STATIC_DRAW)

    // 获取顶点着色器变量
    const a_Position = webGl.getAttribLocation(program, 'a_Position')
    webGl.vertexAttribPointer(a_Position, 2, webGl.FLOAT, false, 0, 0)
    webGl.enableVertexAttribArray(a_Position)

    // 开始绘制
    webGl.drawArrays(webGl.TRIANGLES, 0 ,3)
  }

  onMounted(() => {
    init()
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
