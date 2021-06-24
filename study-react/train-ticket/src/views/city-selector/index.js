import './index.scss'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function CitySelectPage (props) {
  const [searchKey, setSearchKey] = useState('')

  // 事件 - 回退页面
  const onBack = () => {
    props.history.goBack()
  }

  // 事件 - 清除输入框
  const onClear = () => {
    setSearchKey('')
  }

  return(
    <div className="page-city-selector__container">
      {/* 顶部搜索框 */}
      <div className="pcs-top-search__wrapper">
        <span className="iconfont icon-back" onClick={onBack}></span>
        <div className="right">
          <span className="iconfont icon-sousuo icon-search"></span>
          <input value={searchKey} placeholder="城市、车站的中文或拼音" onChange={e => setSearchKey(e.target.value)} />
          <span className="iconfont icon-ziyuanxhdpi icon-clear" onClick={onClear}></span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(CitySelectPage)