// 定义着色器精度计算标准
precision lowp float;

// uniform变量
// 水波频率 - 控制水波起伏段数
uniform float uWareFrequency;
// 水波缩放比 - 控制水波起伏高度
uniform float uWareScale;
// 水波xz轴比例缩放 - 控制x/z轴水波起伏段数比
uniform float uWareXzScale;
// 噪音频率 - 控制噪音函数采样频率
uniform float uNoiseFrequency;
// 噪音缩放比 - 控制噪音函数程度
uniform float uNoiseScale;
// 渲染间隔时间 - 当前帧与上一帧渲染间隔时间
uniform float uTime;
// x轴水流动速度 - 控制流动方向
uniform float xSpeed;
// z轴水流动速度 - 控制流动方向
uniform float zSpeed;
// 噪音流动速度 - 控制流动速度
uniform float noiseSpeed;

// varying变量
// 传递给片元着色器采样点的起伏高度
varying float vElevation;

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// 噪音函数
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    // 从x、z轴进行sin采样，再进行noise噪音混合
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uWareFrequency + uTime * xSpeed) * sin(modelPosition.z * uWareXzScale * uWareFrequency + uTime * zSpeed);
    elevation += -abs(cnoise(vec2(modelPosition.xz * uNoiseFrequency + uTime * noiseSpeed))) * uNoiseScale;

    // 赋值到y轴实现起伏波浪
    vElevation = elevation;
    elevation *= uWareScale;
    modelPosition.y += elevation ;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
