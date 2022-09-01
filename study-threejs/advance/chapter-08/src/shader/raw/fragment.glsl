// 定义着色器精度计算标准
precision lowp float;

// 接收顶点着色器传递的变量
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}