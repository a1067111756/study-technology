const options = {
  xAxis: {
    type: 'value',
    show: false,
    boundaryGap: false
  },
  yAxis: {
    type: 'category',
    show: false,
    boundaryGap: false
  },
  grid: {
    left: 5,
    right: 5,
    bottom: 45
  },
  series: [
    {
      type: 'bar',
      stack: '总量',
      barWidth: 8
    }
  ]
}

export default {
  options
}
