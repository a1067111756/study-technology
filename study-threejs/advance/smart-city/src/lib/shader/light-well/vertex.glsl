// 定义着色器精度计算标准
varying vec3 vPosition;

void main() {
    // 获取顶点位置
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vPosition = position;
}
