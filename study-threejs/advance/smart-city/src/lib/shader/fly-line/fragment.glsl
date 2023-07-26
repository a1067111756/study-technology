// 定义着色器精度计算标准
precision lowp float;

void main() {
    // 中心点将边缘透明，实现飞线圆形
    float distanceToCenter = distance(gl_PointCoord,  vec2(0.5, 0.5));
    float strength = 1.0 - (distanceToCenter * 2.0);

    gl_FragColor = vec4(1.0, 0.0, 0.0, strength);
}