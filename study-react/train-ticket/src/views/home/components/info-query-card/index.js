import './index.css'
import React from 'react'

function InfoQueryCard () {
  return(
    <div className="component-info-query-card__container">
      {/* 标题 */}
      <div className="ciqc-title__wrapper">
        <p className="ciqc-title">火车票</p>
      </div>

      {/* 地址选择框 */}
      <div className="ciqc-address__wrapper">
        <span>北京</span>
        <span className="iconfont icon-qiehuan" style={{ color: '#C0C4CC', transform: 'rotate(90deg)' }}></span>
        <span>上海</span>
      </div>

      {/* 时间选择框 */}
      <div style={{ padding: '0 20px' }}>
        <div className="ciqc-time__wrapper">
          <span className="date">6月16日</span>
          <span className="week">周三 (今天)</span>
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

export default InfoQueryCard