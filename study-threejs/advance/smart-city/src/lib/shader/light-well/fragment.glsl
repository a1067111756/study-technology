// 定义着色器精度计算标准
varying vec3 vPosition;
uniform float uHeight;
void main() {
    // 设置颜色混合百分比
    float gradMix = (vPosition.y + uHeight / 3.0) / uHeight;
    gl_FragColor = vec4(1.0, 0, 0, (1.0 - gradMix) * 0.7);
}