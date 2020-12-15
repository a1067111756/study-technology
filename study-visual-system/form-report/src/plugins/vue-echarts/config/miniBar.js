const options = {
  color: '#58AFFF',
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
    left: 5,
    right: 5,
    top: 0,
    bottom: 0
  },
  series: [
    {
      type: 'bar',
      barWidth: 12
    }
  ]
}

export default {
  options
}
