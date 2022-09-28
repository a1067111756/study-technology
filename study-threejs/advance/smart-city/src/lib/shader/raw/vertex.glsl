// 定义着色器精度计算标准
precision lowp float;

// attribute是定义与顶点着色器相关联的变量，js向顶点着色器传递的变量需要在此声明
attribute vec3 position;
attribute vec2 uv;

// uniform是定义与顶点着色器、片元着色器相关联的全局变量，通常全部不变化的变量都使用uniform声明
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// varyings是定义顶点着色器传递给片元着色器的变量
varying vec2 vUv;

void main() {
    // 将外部传入的法向变量由顶点着色器继续传递给片元着色器
    vUv = uv;
    // 投影矩阵 * 视图矩阵 * 模型矩阵 * 顶点坐标
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}