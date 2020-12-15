/* vue-charts封装层
 * 原则：
 *   1. 统一处理charts属性事件，不阻拦原所有配置
 *   2. 所有图形依靠config进行配置，不对每个图形进行封装，二次封装由外部负责
 *   3. 设置默认配置，外部自由修改、扩展配置
 */

// 宽高： 默认 [100% 100%], 最小 [40px 40px]  可设置固定宽高

<template>
  <e-charts ref="vChart" v-bind="$attrs" :options="options" autoresize :style="{ width: widthCmp, height: heightCmp }" />
</template>

<script>
import ECharts from 'vue-echarts'

const isDeepArray = arr => arr.some(item => item instanceof Array)

const isDeepObject = arr => arr.some(item => item instanceof Object)

const handleSeriesData = (data, series) => {
  if (!Array.isArray(series) || !series[0]) {
    series[0] = { type: 'line', data: [] }
  }

  // 只是单层数据 - data: [xxx, xxx, xxx, xxx]
  if (!isDeepArray(data) && !isDeepObject(data)) {
    series[0].data = data
    return series
  }

  // 双层嵌套不带其它属性 - data: [[xxx, xxx, xxx,], [xxx, xxx, xxx]]
  if (isDeepArray(data, series)) {
    const seriesCommon = JSON.parse(JSON.stringify(series[0]))
    series = data.map(item => ({
      ...seriesCommon,
      data: item
    }))
    return series
  }

  // 双层嵌套带其它属性 - data: [{ name: 'xxx', data: [xxx, xxx, xxx,] }, { name: 'xxx', data: [xxx, xxx, xxx,] }]
  if (isDeepObject(data, series)) {
    const seriesCommon = JSON.parse(JSON.stringify(series[0]))
    series = data.map(item => ({
      ...seriesCommon,
      ...item
    }))
    return series
  }
}

export default {
  components: { ECharts },
  props: {
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },    
    autoresize: {
      type: Boolean,
      default: true
    },
    dataSource: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 容器宽高设定
    widthCmp () {
      return this.width ? `${this.width}px` : '100%'
    },
    heightCmp () {
      return this.height ? `${this.height}px` : '100%'
    }    
  },
  watch: {
    // 计算data，将数据手动填充到options中
    dataSource: {
      handler (val) {
        if (!val) return

        // xLabel - 从dataSource中的xLabel字段取
        if (val.xLabel) {
          this.options.xAxis.data = val.xLabel
        }

        // yLabel - 从dataSource中的xLabel字段取
        if (val.yLabel) {
          this.options.yAxis.data = val.yLabel
        }

        // legend - 从dataSource中的legend字段取
        if (val.legend) {
          this.options.legend.data = val.legend
        }

        // series data - 从dataSource中的data字段取
        if (!Array.isArray(val.data) || val.data.length <= 0) return
        this.options.series = handleSeriesData(val.data, this.options.series)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    // 组件销毁时清除其实例
    this.$refs.vChart.dispose()
  }
}
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 100%;
    min-height: 40px;
    min-width: 40px;
  }
</style>
