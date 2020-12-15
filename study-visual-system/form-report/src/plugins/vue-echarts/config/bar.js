const options = {
  color: '#58AFFF',
  xAxis: {
    show: true,
    type: 'category',
    axisLine: { // 坐标轴线
      show: true,
      lineStyle: {
        color: '#d9d9d9',
        width: 2
      }
    },
    axisTick: { // 坐标轴刻度
      show: true,
      alignWithLabel: true // 刻度对齐柱状图
    },
    axisLabel: { // 刻度标签
      show: true,
      margin: 10,
      color: '#595959'
    },
    splitLine: { // 分割线
      show: false
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    splitNumber: 2,
    axisLine: { // 坐标轴线
      show: false
    },
    axisTick: { // 坐标轴刻度
      show: false
    },
    axisLabel: { // 刻度标签
      show: true,
      color: '#595959'
    },
    splitLine: { // 分割线
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#d9d9d9'
      }
    } 
  },
  grid: {
    left: 40,
    right: 0,
  },
  series: [
    {
      type: 'bar',
      barWidth: 45
    }
  ]
}

export default {
  options
}
