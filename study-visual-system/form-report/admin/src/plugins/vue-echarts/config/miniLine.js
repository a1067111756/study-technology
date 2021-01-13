const options = {
  color: '#975FE4',
  xAxis: {
    type: 'category',
    show: false,
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    show: false,
    boundaryGap: false
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  series: [
    {
      type: 'line',
      areaStyle: {},
      symbol: 'none',
      smooth: true
    }
  ]
}

export default {
  options
}
