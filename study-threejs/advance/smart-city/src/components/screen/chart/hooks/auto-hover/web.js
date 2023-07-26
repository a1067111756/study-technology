// hooks - 图表自动轮播tooltip功能封装
export function useWebAutoHover (autoHoverOption) {
  // 数据 - 当前轮播索引
  let currentIndex = autoHoverOption?.defaultIndex || 0

  // 数据 - 外部选中索引，eg：选中legend、选中图表导致的行为
  let selectedHoverIndex = -1

  // 数据 - 轮播定时器flag
  let hoverFlag = null

  // 数据 - 判断当前鼠标是否在绘图内
  let isInChart = false

  // 数据 - echarts实例
  let echartsInstance = null

  // 计算属性 - 轮播配置
  const autoHoverOptionCmp = Object.assign(
    {},
    {
      interval: 2000,
      defaultIndex: 0,
      action: 'showTip'
    },
    autoHoverOption
  )

  // 方法 - 设置自动轮播
  const setAutoHover = (instance) => {
    echartsInstance = instance

    // 重置鼠标监听事件
    removeHoverListener()

    // 重置轮播状态
    pauseAutoHover()

    // 开启轮播
    startAutoHover()

    // 开启鼠标监听
    addHoverListener()
  }

  // 方法 - 开始轮播
  const startAutoHover = () => {
    // 获取数据项数量
    const dataCountLength = echartsInstance.getOption().dataset[0].source.length

    const action = () => {
      // 取消上一次选中, 只要有highlight触发需要取消上一次。showTip不需要
      autoHoverOptionCmp.action === 'highlight' && echartsInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })

      // 触发选中事件，显示Tooltip
      echartsInstance.dispatchAction({
        type: autoHoverOptionCmp.action,
        seriesIndex: 0,
        dataIndex: currentIndex
      })

      // 切换到下一个数据项
      currentIndex = currentIndex + 1 === dataCountLength ? 0 : currentIndex + 1
    }

    // 设置定时器进行切换
    setTimeout(() => action(), 300)
    hoverFlag = setInterval(() => action(), autoHoverOptionCmp.interval)
  }

  // 方法 - 暂停轮播
  const pauseAutoHover = () => {
    if (hoverFlag) {
      clearInterval(hoverFlag)
      hoverFlag = null

      if (autoHoverOptionCmp.action === 'highlight') {
        echartsInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })

        echartsInstance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: selectedHoverIndex
        })
      }
    }
  }

  // 方法 - 清除自动轮播, 释放资源
  const clearAutoHover = () => {
    echartsInstance = null
    pauseAutoHover()
  }

  // 方法 - 监听鼠标悬浮于图表事件
  const hoverChartListenerHandle = (e) => {
    const point = [e.offsetX, e.offsetY]
    const newIsInChart = echartsInstance.containPixel('series', point)

    // 进入
    if (newIsInChart && !isInChart) {
      isInChart = true
      pauseAutoHover()
      // 出去
    } else if (!newIsInChart && isInChart) {
      isInChart = false
      selectedHoverIndex = -1
      startAutoHover()
    }
  }

  // 方法 - 监听鼠标浮于图表系列条目事件
  const hoverDataIndexListenerHandle = (e) => {
    selectedHoverIndex = e.dataIndex
  }

  // 方法 - 监听鼠标悬浮于legend事件
  const hoverLegendListenerHandle = (e) => {
    if (e.seriesIndex === undefined && e.batch === undefined) {
      const dataSource = echartsInstance.getOption().dataset[0].source
      selectedHoverIndex = dataSource.findIndex((item) => Object.values(item).some(value => value === e.name))

      pauseAutoHover()
    }
  }

  // 方法 - 监听鼠标取消悬浮于legend事件
  const unHoverLegendListenerHandle = (e) => {
    if (e.seriesIndex === undefined && e.batch === undefined) {
      startAutoHover()
    }
  }

  // 方法 - 添加鼠标监听事件
  const addHoverListener = () =>  {
    // 添加监听鼠标悬浮于图表事件 - 控制轮播暂停和恢复
    echartsInstance.getZr().on('mousemove', hoverChartListenerHandle)

    // 添加监听鼠标悬浮于legend事件 - 控制轮播暂停和恢复
    echartsInstance.on('highlight', hoverLegendListenerHandle)
    echartsInstance.on('downplay', unHoverLegendListenerHandle)

    // 添加监听鼠标移动事件 - 记录鼠标悬浮在哪一个数据列
    echartsInstance.on('mousemove', hoverDataIndexListenerHandle)
  }

  // 方法 - 移除鼠标监听事件
  const removeHoverListener = () => {
    // 重置标志
    isInChart = false

    // 卸载监听
    echartsInstance.getZr().off('mousemove', hoverChartListenerHandle)
    echartsInstance.off('highlight', hoverLegendListenerHandle)
    echartsInstance.off('downplay', unHoverLegendListenerHandle)
    echartsInstance.off('mousemove', hoverDataIndexListenerHandle)
  }

  return {
    setAutoHover,
    clearAutoHover
  }
}
