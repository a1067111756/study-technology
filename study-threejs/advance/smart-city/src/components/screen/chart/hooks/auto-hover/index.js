// hooks - 图表自动轮播tooltip功能封装
import { useH5AutoHover } from './h5'
import { useWebAutoHover } from './web'
import { getRunEnv } from '../../helper'

export function useAutoHover (autoHoverOption) {
  // 当前使用的hover环境
  let autoHover = null
  if (getRunEnv() === 'h5') {
    autoHover = useH5AutoHover(autoHoverOption)
  } else {
    autoHover = useWebAutoHover(autoHoverOption)
  }

  // 方法 - 开始轮播
  const setAutoHover = (instance) => {
    autoHover.setAutoHover(instance)

  }

  // 方法 - 结束轮播
  const clearAutoHover = () => {
    autoHover.clearAutoHover()
  }

  return {
    setAutoHover,
    clearAutoHover
  }
}
