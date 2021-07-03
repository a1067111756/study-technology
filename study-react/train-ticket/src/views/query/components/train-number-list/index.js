import './index.scss'

// 车次信息表
function TrainNumberList () {
  return(
    <div className="component-train-number-list">
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
      <TrainNumberListItem />
    </div>
  )
}

function TrainNumberListItem () {
  return(
    <div className="component-train-number-list-item">
      <div className="top">
        {/* 开始信息 */}
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span className="time">06:20</span>
          <span>北京南</span>
        </div>
        {/* 时长信息 */}
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>5时38分</span>
          <span>G103</span>
        </div>   
        {/* 结束信息 */}
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span className="time">11:58</span>
          <span>上海虹桥</span>
        </div>
        {/* 价格 */}
        <span className="price"><span style={{ fontSize: '12px' }}>￥</span>553</span>
      </div>

      <div className="divide"></div>

      <div className="bottom">
        <span>二等座有票</span>
        <span>一等座有票</span>
        <span>商务座3张</span>
      </div>
    </div>
  )
}

export default TrainNumberList