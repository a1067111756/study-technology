import './index.scss'
import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'
import { MockCityData } from '@/assets/mock/city'
import { setFromCity, setToCity } from '@/store/actions'

function CitySelectPage (props) {
  const { history, setToCity, setFromCity } = props
  const [searchKey, setSearchKey] = useState('')

  // 事件 - 回退页面
  const onBack = useCallback(() => {
    history.goBack()
  }, [history])

  // 事件 - 清除输入框
  const onClear = useCallback(() => {
    setSearchKey('')
  }, [])

  // 事件 - 点击选择城市
  const onSelectCity = useCallback((name) => {
    const type = history.location.query.type
    console.log(type === 'fromCity')
    type === 'fromCity' ? setFromCity(name) : setToCity(name)
    history.goBack()
  }, [history, setFromCity, setToCity])

  return(
    <div className="page-city-selector__container">
      {/* 顶部搜索框 */}
      <div className="pcs-top-search__wrapper">
        <span className="iconfont icon-back" onClick={onBack}></span>
        <div className="right">
          <span className="iconfont icon-sousuo icon-search"></span>
          <input value={searchKey} placeholder="城市、车站的中文或拼音" onChange={e => setSearchKey(e.target.value)} />
          {
            searchKey && <span className="iconfont icon-ziyuanxhdpi icon-clear" onClick={onClear}></span>
          }
        </div>
      </div>

      {/* 城市列表 */}
      <CityList data={MockCityData} onSelectCity={onSelectCity} />

      {/* 快速选择栏 */}
      <FastSelector />
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
    setToCity: bindActionCreators(setToCity, dispatch),
    setFromCity: bindActionCreators(setFromCity, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CitySelectPage))

/* 城市列表组件 */
function CityList (props) {
  const { hotCities, cityList } = props.data

  return(
    <div className="component-citi-list">
      <div className="hot-city-list-wrapper">
        <div className="title" anchor="热门">热门</div>
        <div className="hot-city-list">
          {
            hotCities.map(item => <p key={item.name} onClick={e => props.onSelectCity(item.name)}>{item.name}</p>)
          }
        </div>
      </div>
      {
        cityList.map(item => <CityListGroup key={item.title} data={item} onSelectCity={props.onSelectCity} />)
      }
    </div>
  )
}

/* 城市列表分组组件  anchorPoint={ title }*/
function CityListGroup (props) {
  const { title, citys } = props.data
  
  return(
    <section className="component-city-list-group">
      <p className="title" anchor={title}>{title}</p>
      {
        citys && citys.map(item => <CityListItem key={item.name} data={item} onSelectCity={props.onSelectCity} />)
      }      
    </section>
  )
}

/* 城市列表栏组件 */
function CityListItem (props) {
  const { name } = props.data
  return(
    <div className="component-city-list-item">
      <p className="name" onClick={e => props.onSelectCity(name)}>{name}</p>
    </div>
  )
}

/* 快速选择组件 */
function FastSelector () {
  const alphabet = Array.from(new Array(26), (ele, index) => String.fromCharCode(65 + index))
  alphabet.unshift('热门')

  const onJumpAnchor = useCallback((alpha) => {
    // document.querySelector(`[anchor='${alpha}']`).scrollIntoView()
    const elDom = document.querySelector(`[anchor='${alpha}']`)
    window.scrollTo(0, elDom.offsetTop - 45)
  }, [])

  return (
    <div className="component-fast-selector">
      {
        alphabet.map(item => <span key={item} onClick={e => onJumpAnchor(item)}>{item}</span>)
      }
    </div>
  )
}
