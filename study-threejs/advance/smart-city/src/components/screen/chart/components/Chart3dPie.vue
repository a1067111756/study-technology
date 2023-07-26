<template>
  <ChartBase v-bind="props">
    <!-- loading插槽 -->
    <template #loading>
      <slot name="loading" />
    </template>

    <!-- empty插槽 -->
    <template #empty>
      <slot name="empty" />
    </template>

    <!-- 内容插槽 -->
    <template #default>
      <div ref="echartsRef" style="width: 100%; height: 100%;" />
    </template>
  </ChartBase>
</template>

<script>
  export default {
    name: 'GlobalChart3dPie'
  }
</script>

<script setup>
  import * as echarts from 'echarts/core'
  import ChartBase from './ChartBase.vue'
  import { useAutoHover } from '../hooks/auto-hover/index'
  import { LineChart } from 'echarts/charts'
  import { BarChart, PieChart } from 'echarts/charts'
  import { PictorialBarChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import { SurfaceChart } from 'echarts-gl/charts'
  import { Grid3DComponent } from 'echarts-gl/components'
  import { LabelLayout, UniversalTransition } from 'echarts/features'
  import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

  import {
    GridComponent,
    TitleComponent,
    LegendComponent,
    ToolboxComponent,
    DatasetComponent,
    TooltipComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    TransformComponent
  } from 'echarts/components'

  echarts.use([
    BarChart,
    PieChart,
    LineChart,
    SurfaceChart,
    PictorialBarChart,
    GridComponent,
    TitleComponent,
    LegendComponent,
    ToolboxComponent,
    DatasetComponent,
    TooltipComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    TransformComponent,
    Grid3DComponent,
    CanvasRenderer,
    LabelLayout,
    UniversalTransition
  ])

  // props
  const props = defineProps({
    // 覆写配置
    mergeOption: {
      type: Object,
      default: undefined
    },
    // 数据
    data: {
      type: Array,
      default: undefined
    },
    // 加载动画
    loading: {
      type: Boolean,
      default: false
    },
    // 加载动画配置
    loadingOption: {
      type: Object,
      default: () => ({})
    },
    // 容器宽度
    width: {
      type: String,
      default: undefined
    },
    // 容器高度
    height: {
      type: String,
      default: undefined
    },
    // 自动轮播
    autoHover: {
      type: Boolean,
      default: false
    },
    // 自动轮播配置
    autoHoverOption: {
      type: Object,
      default: () => ({})
    },
    // 数据映射合集
    encode: {
      type: Array,
      default: () => []
    },
    // 柱上下面形状
    symbol: {
      type: String,
      default: 'circle'
    },
    // 柱面颜色
    color: {
      type: Array,
      default: () => ([
        {
          top: '#b0a488',
          bottom: '#9b8d6d',
          middle: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(150,135,102,0.6)'
            }, {
              offset: 1, color: 'rgba(150,135,102, 1)'
            }]
          }
        },
        {
          top: '#695e96',
          bottom: '#574890',
          middle: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(71,57,126,0.6)'
            }, {
              offset: 1, color: 'rgba(71,57,126,1)'
            }]
          }
        },
        {
          top: '#3b79bb',
          bottom: '#1e66b1',
          middle: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(10,88,170,0.6)'
            }, {
              offset: 1, color: 'rgba(10,88,170,1)'
            }]
          }
        },
        {
          top: '#3ab4cf',
          bottom: '#16a5c5',
          middle: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(10,162,195,0.6)'
            }, {
              offset: 1, color: 'rgba(10,162,195,1)'
            }]
          }
        }
      ])
    }
  })

  // emitter
  const emitter = defineEmits(['mounted', 'unMounted'])

  // refs
  const echartsRef = ref()

  // hooks
  const autoHoverHook = useAutoHover(props.autoHoverOption)

  // 生命周期 - 挂载
  onMounted(() => {
    init()
  })

  // 生命周期 - 卸载
  onUnmounted(() => {
    destroy()
  })

  /*------------------------------------- echarts配置相关 -------------------------------------------*/
  // 默认配置
  const option = {
    color: ['#968766', '#47397e', '#0a58aa', '#0aa2c3', '#9ecb87'],
    legend: {
      show: true,
      itemWidth: 10,
      itemHeight: 10,
      top: 30,
      textStyle: {
        rich: {
          a: {
            verticalAlign: 'middle'
          }
        },
        padding:[0, 0, -2, 0]
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: 10,
      viewControl: {  // 配置视角控制
        alpha: 35,  // 左右旋转的角度
        rotateSensitivity: 1,  // 旋转的灵敏度
        zoomSensitivity: 0,  // 缩放的灵敏度
        panSensitivity: 0,  // 平移的灵敏度
        distance: 190  // 初始视角距离主体的距离
      },
      postEffect: {  // 配置后处理特效
        enable: false,  // 是否开启
        bloom: {  // 配置泛光特效
          enable: true,
          bloomIntensity: 0.1
        },
        SSAO: {  // 配置环境光遮蔽特效
          enable: true,
          quality: 'medium',
          radius: 2
        }
      }
    },
    series: []
  }

  // 监听 - 配置变化
  watch(
    () => props.mergeOption,
    (newOption) => {
      // 推迟到下一周期更新
      nextTick(() => updateOption(newOption))
    },
    { immediate: true }
  )

  // 监听 - 数据变化
  watch(
    () => props.data,
    (newData) => {
      // 推迟到下一周期更新
      nextTick(() => updateData(newData))
    },
    { immediate: true }
  )

  /*------------------------------------- echarts操作相关 -------------------------------------------*/
  // echarts实例
  let echartsInstance = null

  // 方法 - 初始化
  const init = () => {
    // echartsInstance已经初始化的情况下，不再进行初始化
    if (echartsInstance) {
      return
    }

    // dom为空情况下，不再进行初始化
    if (!echartsRef.value) {
      return
    }

    // 绑定dom
    echartsInstance = echarts.init(echartsRef.value)

    // 设置配置
    echartsInstance.setOption(option)

    // 初始化完成事件
    emitter('mounted', echartsInstance)
  }

  // 方法 - 销毁
  const destroy = () => {
    if (!echartsInstance) {
      return
    }

    // autoHoverHook.clearAutoHover()

    // 销毁事件
    emitter('unMounted', echartsInstance)

    // 卸载echarts
    echartsInstance.dispose()
    echartsInstance = null
  }

  // 方法 - 更新option配置
  const updateOption = (mergeOption) => {
    mergeOption && echartsInstance && echartsInstance.setOption(mergeOption)
  }

  // 方法 - 更新数据
  const updateData = (newData) => {
    // 存在数据时才去更新视图
    if (Array.isArray(props.data) && props.data.length > 0) {
      // 这个地方需要优化干掉
      newData && echartsInstance && echartsInstance.resize()

      // 更新数据
      newData && echartsInstance && echartsInstance.setOption(getPie3D(newData, 0.59))

      // 开启自动轮播
      // if (props.autoHover) {
      //   autoHoverHook.setAutoHover(echartsInstance)
      // }
    }
  }

  /*------------------------------------------------ 计算生成series相关 -----------------------------------------------*/
  // 生成扇形的曲面参数方程
  // startRatio - 起始角度  endRatio - 结束角度
  const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
    // 求出起始和结束角度的弧度值
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;

    // 求出中间角度的弧度值
    const midRatio = (startRatio + endRatio) / 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32
      },

      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },

      // 计算每个点在 x 轴上的坐标值
      x(u, v) {
        if (u < startRadian) {
          // 如果该点的角度小于起始角度，则以该点的起始角度为基准来计算坐标值
          return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          // 如果该点的角度大于结束角度，则以该点的结束角度为基准来计算坐标值
          return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        // 如果该点的角度在扇形的起始角度和结束角度之间，则根据当前角度来计算坐标值
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      // 计算每个点在 y 轴方向上的坐标值
      y(u, v) {
        if (u < startRadian) {
          // 如果该点的角度小于起始角度，则以该点的起始角度为基准来计算坐标值
          return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          // 如果该点的角度大于结束角度，则以该点的结束角度为基准来计算坐标值
          return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        // 如果该点的角度在扇形的起始角度和结束角度之间，则根据当前角度来计算坐标值
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      // 计算每个点在 z 轴方向上的坐标值
      z(u, v) {
        if (u < -Math.PI * 0.5) {
          // 如果该点的角度小于 -π/2，则该点在立体图上显示为一个半球体
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          // 如果该点的角度大于 2.5π，则该点在立体图上显示为一个较小的椭圆体
          return Math.sin(u) * h * 0.1;
        }
        // 否则，该点在立体图上显示为一个棱锥体
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      }
    };
  };

  // 生成模拟 3D 饼图的配置项
  const getPie3D = (pieData, internalDiameterRatio) => {
    const series = []; // 初始化 series 数组
    let sumValue = 0; // 初始化总和 sumValue
    let startValue = 0; // 初始化起始值 startValue
    let endValue = 0; // 初始化终止值 endValue
    const legendData = []; // 初始化 legendData 数组

    const k = // 计算内径比例
      typeof internalDiameterRatio !== 'undefined'
        ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
        : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i += 1) {
      sumValue += pieData[i].value; // 统计总和

      const seriesItem = {  // 初始化 series-surface 配置
        name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k
        }
      };

      // 判断是否设置了 itemStyle，设置颜色和透明度
      if (typeof pieData[i].itemStyle !== 'undefined') {
        const { itemStyle } = pieData[i];

        typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
        typeof pieData[i].itemStyle.opacity !== 'undefined'
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;

        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);  // 将生成的 series-surface 配置添加到 series 数组中
    }

    // 遍历每个 series-surface，计算饼图的起始结束比例，设置参数方程
    for (let i = 0; i < series.length; i += 1) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;  // 计算饼图的起始比例
      series[i].pieData.endRatio = endValue / sumValue;  // 计算饼图的结束比例

      series[i].parametricEquation =  // 调用 getParametricEquation 函数，获取饼图的参数方程
        getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          // 对于第一个饼图，设置参数方程中步长为35，其他为10
          series[i].pieData.value === series[0].pieData.value ? 35 : 10
        );

      startValue = endValue;  // 更新起始值

      legendData.push(series[i].name);  // 将饼图的名称添加到 legendData 数组中
    }

    // 返回配置项
    return {
      series
    }
  }

  /*------------------------------------- 暴露变量相关 -------------------------------------------*/
  defineExpose({
    echartsInstance
  })
</script>
