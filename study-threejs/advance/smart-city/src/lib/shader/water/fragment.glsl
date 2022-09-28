// 定义着色器精度计算标准
precision lowp float;

// 低位颜色
uniform vec3 uLowColor;
// 高位颜色
uniform vec3 uHighColor;

// 传递给片元着色器采样点的起伏高度
varying float vElevation;

void main() {
    float colorOff = (vElevation + 1.0) / 2.0;
    vec3 mixColor = mix(uLowColor, uHighColor, colorOff);
    gl_FragColor = vec4(mixColor, 1.0);
}
