import './index.scss'
import dayjs from 'dayjs'
import React from 'react'
import NavigationBar from '@/components/NavigationBar'

function Calendar (props) {
  const { hideCalendar } = props

  // 周期
  const weekList = ['一', '二', '三', '四', '五', '六', '日'] 

  return(
    <div className="component-calendar__container">
      {/* 顶部标题栏 */}
      <NavigationBar title="日期选择" onBack={hideCalendar} ></NavigationBar>

      {/* 星期栏 */}
      <div className="ccc-week-bar">
        {
          weekList.map((item, index) => {
            return <span key={item} className={`${index === 0 || index === 6 ? 'week-day' : '' }`} >{item}</span>
          })
        }
      </div>

      {/* 日历栏 */}
      <MonthCalendar date="2021-07" />
    </div>
  )
}

// 月日历
function MonthCalendar (props) {
  const yearMonth = dayjs(props.date).format('YYYY-MM')

  // 当月的日期表
  const monthDayBet = Array.from({ length: dayjs(yearMonth).daysInMonth() }, (i, index) => index + 1)

  // 填充当月第一天之前的空白日期
  const startWeekNum = dayjs(`${yearMonth}-${monthDayBet[0]}`).day()
  const startFillnum = startWeekNum === 0 ? 6 : startWeekNum - 1
  monthDayBet.unshift(...Array.from({ length: startFillnum }, () => undefined))

  // 填充当月最后一天之后的空白日期
  const endWeekNum = dayjs(`${yearMonth}-${monthDayBet[monthDayBet.length - 1]}`).day()
  const endFillnum = endWeekNum === 0 ? 0 : 7 - endWeekNum
  monthDayBet.push(...Array.from({ length: endFillnum }, () => undefined))

  return(
    <div className="ccc-month-bar">
      <p className="title">2021年7月</p>
      <div className="day-list">
        {
          monthDayBet.map((item, index) => <span key={index}>{item}</span>)
        }
      </div>
    </div>
  )
}

export default Calendar