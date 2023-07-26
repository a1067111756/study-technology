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
    name: 'GlobalChart3dBar'
  }
</script>

<script setup>
  import * as echarts from 'echarts/core'
  import ChartBase from './ChartBase.vue'
  import { useAutoHover } from '../hooks/auto-hover/index'
  import { BarChart } from 'echarts/charts'
  import { LineChart } from 'echarts/charts'
  import { PictorialBarChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import { LabelLayout, UniversalTransition } from 'echarts/features'
  import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'

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
    LineChart,
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
          top: '#06dbff',
          bottom: '#2e73e2',
          middle: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(37,115,232,1)'
            }, {
              offset: 1, color: 'rgba(6,219,225,0.6)'
            }],
          },
        },
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
            }],
          },
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
            }],
          },
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
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    legend: {
      show: true,
      itemWidth: 10,
      itemHeight: 10,
      top: 30,
      textStyle: {
        rich: {
          a: {
            verticalAlign: 'middle',
          }
        },
        padding:[0, 0, -2, 0]
      }
    },
    grid: {
      top: 80
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#909399'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    dataset: {
      source: []
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

    autoHoverHook.clearAutoHover()

    // 销毁事件
    emitter('unMounted', echartsInstance)

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
      newData && echartsInstance && echartsInstance.setOption({
        dataset: {
          source: newData
        },
        series: generateSeriesItems()
      })

      // 开启自动轮播
      if (props.autoHover) {
        autoHoverHook.setAutoHover(echartsInstance)
      }
    }
  }

  // 方法 - 生成series条目
  const generateSeriesItems = () => {
    const barWidth = 18  // 柱体的宽度
    const seriesGap = 10 // 系列间的间隔宽度
    const offsetArray = [] // 存放偏移量的数组
    const totalSeries = props.encode.length // 数据长度

    // 计算偏移
    for (let i = 0; i < totalSeries; i++) {
      const offset = (totalSeries / 2 - i - 0.5) * (barWidth + seriesGap);
      offsetArray.push(-offset);
    }

    const series = props.encode.map((item, index) => {
      return [
        {
          type: 'bar',
          name: item.name,
          barWidth: barWidth,
          barGap: '50%',
          itemStyle: {
            color: props.color[index % props.color.length].middle
          },
          encode: {
            x: item.x,
            y: item.y,
          }
        },
        // 顶部
        {
          type: 'pictorialBar',
          z: 4,
          tooltip: {
            show: false
          },
          name: item.name,
          barWidth: barWidth,
          barGap: '-100%',
          symbol: props.symbol,
          symbolPosition: 'end',
          symbolSize: [barWidth, 10],
          symbolOffset: [ offsetArray[index], '-50%' ],
          itemStyle: {
            color: props.color[index % props.color.length].top
          },
          encode: {
            x: item.x,
            y: item.y,
          }
        },
        // 底部
        {
          type: 'pictorialBar',
          z: 3,
          tooltip: {
            show: false
          },
          name: item.name,
          symbol: props.symbol,
          symbolSize: [barWidth, 12],
          symbolOffset: [ offsetArray[index], '50%' ],
          barWidth: barWidth,
          barGap: '-100%',
          itemStyle: {
            color: props.color[index % props.color.length].bottom
          },
          encode: {
            x: item.x,
            y: item.y
          }
        }
      ]
    })

    return series.flat()
  }

  /*------------------------------------- 暴露变量相关 -------------------------------------------*/
  defineExpose({
    echartsInstance
  })
</script>
