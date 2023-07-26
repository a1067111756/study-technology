<!-- 全局组件：柱状图
       1. 提供了默认loading样式，提供loadingOption属性修改loading样式，同时提供<slot name="loading" />插槽自定义加载状态
           :loadingOption="{
            // 加载文本
            text: '加载中',
            // 字体大小
            fontSize: '14px',
            // 文本颜色
            color: '#909399'
          }"
       2. 提供了默认empty样式，可通过<slot name="empty" />插槽自定义空状态
       3. 提供data属性注入数据，参考echarts数据集dataset形式
       4. 提供mergeOption属性用于覆写配置
       5. 提供autoHover属性，开启自动tooltip轮播
           <GlobalChartBar
            :data="barData"
            :autoHover="true"
            :loading="loading"
            :mergeOption="{ xxx }"
          />
-->

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
    name: 'GlobalChartBar'
  }
</script>

<script setup>
  import * as echarts from 'echarts/core'
  import ChartBase from './ChartBase.vue'
  import { useAutoHover } from '../hooks/auto-hover/index'
  import { BarChart } from 'echarts/charts'
  import { LineChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
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
    LineChart,
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
    color: ['#47397e', '#0a58aa', '#0aa2c3', '#9ecb87'],
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
            verticalAlign: 'middle'
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
    series: [
      {
        type: 'bar',
        barWidth: 5,
        barMinHeight: 5,
        barGap: '50%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
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
      // 这个地方需要优化干掉 - 可能会导致多次重绘
      newData && echartsInstance && echartsInstance.resize()

      // 更新数据
      newData && echartsInstance && echartsInstance.setOption({
        dataset: {
          source: newData
        }
      })

      // 开启自动轮播
      if (props.autoHover) {
        autoHoverHook.setAutoHover(echartsInstance)
      }
    }
  }

  /*------------------------------------- 暴露变量相关 -------------------------------------------*/
  defineExpose({
    echartsInstance
  })
</script>
