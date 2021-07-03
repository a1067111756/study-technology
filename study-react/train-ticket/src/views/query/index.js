import './index.scss'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { timeFilter } from '@/utils/filter'
import { withRouter } from 'react-router-dom'
import { setTrainNumberDate } from '@/store/actions'
import NavigationBar from '@/components/NavigationBar'
import TrainNumberList from './components/train-number-list'
import TrainNumberTool from './components/train-number-tool'

function QueryPage (props) {
  const { 
    history, 
    fromCity, 
    toCity, 
    trainNumberDate,
    setTrainNumberDate 
  } = props

  // 事件 - 回退
  const onBack = useCallback(() => {
    history.goBack()
  }, [history])

  return(
    <div className="page-query__container">
      {/* 顶部栏 */}
      <div style={{ position: 'fixed', left: 0, top: 0, width: '100%' }}>
        {/* 导航标题栏 */}
        <NavigationBar title={`${fromCity} - ${toCity}`} onBack={onBack} ></NavigationBar>

        {/* 时间选择栏 */}
        <div className="pqc-time-bar">
          <span onClick={ e => setTrainNumberDate(dayjs(trainNumberDate).add(-1, 'day').format('YYYY-MM-D')) }>前一天</span>
          <span className="date-time" onClick={ e => history.push('/calendar') }>{timeFilter(trainNumberDate)}</span>
          <span onClick={ e => setTrainNumberDate(dayjs(trainNumberDate).add(1, 'day').format('YYYY-MM-D')) }>后一天</span>
        </div>        
      </div>

      {/* 占位栏 */}
      <div style={{ height: '106px' }}></div>

      {/* 车次列表 */}
      <TrainNumberList />

      {/* 筛选工具 */}
      <TrainNumberTool />
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
    setTrainNumberDate: bindActionCreators(setTrainNumberDate, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QueryPage))