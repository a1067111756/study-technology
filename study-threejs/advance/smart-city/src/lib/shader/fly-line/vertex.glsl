// 定义着色器精度计算标准
precision lowp float;

attribute float aSize;
void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // 顶点大小
    if (aSize * 0.005 < 2.0) {
        gl_PointSize = 2.0;
    } else {
        gl_PointSize = aSize * 0.007;
    }

}