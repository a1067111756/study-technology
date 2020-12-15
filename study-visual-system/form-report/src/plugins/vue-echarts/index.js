import Vue from 'vue'
import VChart from './components/v-chart.vue'

// 按需导入
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/polar'

Vue.component('v-chart', VChart)
