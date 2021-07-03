import './index.css'
import React, { useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { switchFromAndToCity } from '@/store/actions'

function InfoQueryCard (props) {
  const { fromCity, toCity, switchFromAndToCity, trainNumberDate, setShowCitySelector } = props

  const [ trainNumberType, setTrainNumberType ] = useState([])

  const weekName = useCallback(() => {
    const stragery = {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六'
    }

    return stragery[dayjs(trainNumberDate).day()]
  }, [trainNumberDate])

  const onTypeChange = (type) => {
    trainNumberType.includes(type)
      ? setTrainNumberType(trainNumberType.filter(item => item !== type))
      : setTrainNumberType([...trainNumberType, type])
  }

  return(
    <div className="component-info-query-card__container">
      {/* 标题 */}
      <div className="ciqc-title__wrapper">
        <p className="ciqc-title">火车票</p>
      </div>

      {/* 地址选择框 */}
      <div className="ciqc-address__wrapper">
        <span onClick={e => setShowCitySelector('fromCity')}>{ fromCity }</span>
        <span className="iconfont icon-qiehuan" style={{ color: '#C0C4CC', transform: 'rotate(90deg)' }} onClick={ switchFromAndToCity }></span>
        <span onClick={e => setShowCitySelector('toCity')}>{ toCity }</span>      
      </div>

      {/* 时间选择框 */}
      <div style={{ padding: '0 20px' }}>
        <div className="ciqc-time__wrapper">
          <NavLink to="/calendar">
            <span className="date">{ dayjs(trainNumberDate).format('M月DD日') }</span>
            <span className="week">
              {weekName()} 
              {
                dayjs(trainNumberDate).format('YYYY-MM-D') ===  dayjs().format('YYYY-MM-D')
                  ? ' (今天)'
                  : dayjs(trainNumberDate).format('YYYY-MM-D') ===  dayjs().add(1, 'day').format('YYYY-MM-D')
                    ? ' (明天)'
                    : ''
              }
            </span>            
          </NavLink>
        </div>
      </div>

      {/* 条件筛选框 */}
      <div className="ciqc-condition__wrapper">
        <div 
          style={{ color: trainNumberType.includes('onlyHightSpeed') ? '#00c9e2' : '#000000' }}
          onClick={e => onTypeChange('onlyHightSpeed')}>
          <span
            className={`iconfont ${trainNumberType.includes('onlyHightSpeed') ? 'icon-check1' : 'icon-check'}`}
            style={{ fontSize: '14px', marginRight: '10px' }}></span>
          <span>只看高铁/动车</span>
        </div>
        
        <div 
          style={{ color: trainNumberType.includes('studentTicket') ? '#00c9e2' : '#000000' }}
          onClick={e => onTypeChange('studentTicket')}>
          <span 
            className={`iconfont ${trainNumberType.includes('studentTicket') ? 'icon-check1' : 'icon-check'}`}
            style={{ fontSize: '14px', marginRight: '10px' }}></span>
          <span>学生票</span>
        </div>
      </div>

      {/* 搜索按钮 */}
      <div style={{ padding: '20px' }}>
        <NavLink to="/query">
          <button className="ciqc-search__btn">搜索</button>
        </NavLink>
      </div>
    </div>
  )
}

// 映射状态
const mapStateToProps = state => {
  return {
    toCity: state.citySelectReducer.toCity,
    fromCity: state.citySelectReducer.fromCity,
    trainNumberDate: state.trainNumberReducer.trainNumberDate
  };
};

// 映射action
const mapDispatchToProps = dispatch => {
  return {
    switchFromAndToCity: bindActionCreators(switchFromAndToCity, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoQueryCard)