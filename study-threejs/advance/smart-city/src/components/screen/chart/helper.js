// 获取当前运行的环境是电脑端还是手机端
export const getRunEnv = () => {
  function isMobile() {
    const userAgent = navigator.userAgent
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  }

  if (isMobile()) {
    return 'h5'
  } else {
    return 'web'
  }
}
