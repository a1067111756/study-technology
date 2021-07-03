import './index.css'
import React, { useState, useCallback } from 'react'
import CitySelector from './components/city-selector'
import NavigationBar from '@/components/NavigationBar'
import InfoQueryCard from './components/info-query-card'
import topTitleImg from '@/assets/images/top_title.png'
import IconOrder from '@/assets/images/icon-order.png'
import IconQiangPiao from '@/assets/images/icon_qiang.png'

function HomePage () {
  const [showCitySelector, setShowCitySelector] = useState(false)

  // 事件 - 回退
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return(
    <div className="page-home__container">
      {/* 主页内容 */}
      {
        !showCitySelector &&
          <>
            {/* 导航标题栏 */}
            <NavigationBar title="火车票" onBack={onBack} ></NavigationBar>
            
            {/* 顶部背景图 */}
            <img src={topTitleImg} alt="" style={{ width: '100%', height: '124px' }} />
    
            {/* 信息卡片 */}
            <InfoQueryCard setShowCitySelector={setShowCitySelector}></InfoQueryCard>
    
            {/* 工具栏 */}
            <div style={{ display: 'flex', justifyContent: 'center', color: '#333', fontSize: '14px' }} >
              <div style={{ marginRight: '60px', textAlign: 'center' }}>
                <img src={IconQiangPiao} alt="" style={{ width: '44px', height: '44px' }} />
                <p style={{ marginTop: '6px' }}>抢票</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={IconOrder} alt="" style={{ width: '44px', height: '44px' }} />
                <p style={{ marginTop: '6px' }}>我的订单</p>
              </div>        
            </div>        
          </>
      }

      {/* 城市选择浮层 */}
      {
        showCitySelector && <CitySelector showCitySelector={showCitySelector} setShowCitySelector={setShowCitySelector} />
      }
    </div>
  )  
}

export default HomePage