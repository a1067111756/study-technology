import './index.css'
import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from "redux"
import { switchFromAndToCity } from '@/store/actions'

function InfoQueryCard (props) {
  const { fromCity, toCity, switchFromAndToCity, showCalendar } = props

  const today = () => {
    const stragery = {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六'
    }
    const week = stragery[dayjs().day()]
    return week
  }

  return(
    <div className="component-info-query-card__container">
      {/* 标题 */}
      <div className="ciqc-title__wrapper">
        <p className="ciqc-title">火车票</p>
      </div>

      {/* 地址选择框 */}
      <div className="ciqc-address__wrapper">
        <NavLink to={{ pathname: '/city-selector', query: { type: 'fromCity' } }}>
          <span>{ fromCity }</span>
        </NavLink>
        <span className="iconfont icon-qiehuan" style={{ color: '#C0C4CC', transform: 'rotate(90deg)' }} onClick={ switchFromAndToCity }></span>
        <NavLink to={{ pathname: '/city-selector', query: { type: 'toCity' } }}>
          <span>{ toCity }</span>
        </NavLink>        
      </div>

      {/* 时间选择框 */}
      <div style={{ padding: '0 20px' }}>
        <div className="ciqc-time__wrapper" onClick={showCalendar}>
          <span className="date">{ dayjs().format('M月DD日') }</span>
          <span className="week">{today()} (今天)</span>
        </div>
      </div>

      {/* 条件筛选框 */}
      <div className="ciqc-condition__wrapper">
        <div>
          <span className="iconfont icon-check" style={{ fontSize: '14px', marginRight: '10px' }}></span>
          <span>只看高铁/动车</span>
        </div>
        
        <div>
          <span className="iconfont icon-check" style={{ fontSize: '14px', marginRight: '10px' }}></span>
          <span>学生票</span>
        </div>
      </div>

      {/* 搜索按钮 */}
      <div style={{ padding: '20px' }}>
        <button className="ciqc-search__btn">搜索</button>
      </div>
    </div>
  )
}

// 映射状态
const mapStateToProps = state => {
  return {
    toCity: state.citySelectReducer.toCity,
    fromCity: state.citySelectReducer.fromCity
  };
};

// 映射action
const mapDispatchToProps = dispatch => {
  return {
    switchFromAndToCity: bindActionCreators(switchFromAndToCity, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoQueryCard)