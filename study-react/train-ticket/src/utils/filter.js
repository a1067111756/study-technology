import dayjs from 'dayjs'

export const timeFilter = (date) => {
  const stragery = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
  }

  return `${dayjs(date).format('MM月DD日')} ${stragery[dayjs(date).day()]}`
}