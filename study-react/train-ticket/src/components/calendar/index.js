import './index.scss'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'
import { setTrainNumberDate } from '@/store/actions'
import NavigationBar from '@/components/NavigationBar'

function Calendar (props) {
  const { history, trainNumberDate, setTrainNumberDate } = props
  const weekList = ['一', '二', '三', '四', '五', '六', '日'] 
  const dateBet = [dayjs().format('YYYY-MM'), dayjs().add(1, 'month').format('YYYY-MM'), dayjs().add(2, 'month').format('YYYY-MM')]

  const onBack = () => {
    history.goBack()
  }

  return(
    <div className="component-calendar__container">
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%'}}>
        {/* 标题栏 */}
        <NavigationBar title="日期选择" onBack={onBack} ></NavigationBar>

        {/* 星期栏 */}
        <div className="ccc-week-bar">
          {
            weekList.map((item, index) => {
              return <span key={item} className={`${index === 5 || index === 6 ? 'week-day' : '' }`} >{item}</span>
            })
          }
        </div>        
      </div>

      {/* 日历栏 */}    
      <div style={{marginTop: '80px', width: '100%'}}>
        {
          dateBet.map(item => <MonthCalendar date={item} key={item} trainNumberDate={trainNumberDate} setTrainNumberDate={setTrainNumberDate} hideCalendar={onBack} />)
        }
      </div>
    </div>
  )
}

// 月日历
function MonthCalendar (props) {
  const yearMonth = dayjs(props.date).format('YYYY-MM')

  // 当月的日期表
  const monthDayBet = Array.from({ length: dayjs(yearMonth).daysInMonth() }, (i, index) => `${yearMonth}-${index + 1}`)

  // 填充当月第一天之前的空白日期
  const startWeekNum = dayjs(monthDayBet[0]).day()
  const startFillnum = startWeekNum === 0 ? 6 : startWeekNum - 1
  monthDayBet.unshift(...Array.from({ length: startFillnum }, () => undefined))

  // 填充当月最后一天之后的空白日期
  const endWeekNum = dayjs(monthDayBet[monthDayBet.length - 1]).day()
  const endFillnum = endWeekNum === 0 ? 0 : 7 - endWeekNum
  monthDayBet.push(...Array.from({ length: endFillnum }, () => undefined))

  const isToday = (date) => {
    return dayjs().format('YYYY-MM-D') === date
  }

  const isDisable = (date) => {
    return !date || (dayjs(date).isBefore(dayjs()) && !isToday(date))
  }

  const onItemClick = (date) => {
    if (isDisable(date)) return

    props.setTrainNumberDate(date)
    props.hideCalendar()
  }

  return(
    <div className="ccc-month-bar">
      <p className="title">{dayjs(props.date).format('YYYY年MM月')}</p>
      <div className="day-list">
        {
          monthDayBet.map((item, index) => 
            <span 
              key={index}
              onClick={e => onItemClick(item)}
              className={
                `${isDisable(item) ? 'disable' : isToday(item) ? 'today' : '' }
                 ${item === props.trainNumberDate ? 'active' : ''} 
                `
              }
            >{isToday(item) ? '今天' : item && dayjs(item).format('D')}</span>
          )
        }
      </div>
    </div>
  )
}

// 映射状态
const mapStateToProps = state => {
  return {
    trainNumberDate: state.trainNumberReducer.trainNumberDate,
  };
};

// 映射action
const mapDispatchToProps = dispatch => {
  return {
    setTrainNumberDate: bindActionCreators(setTrainNumberDate, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))
