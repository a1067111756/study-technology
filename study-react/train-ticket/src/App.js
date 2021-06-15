import './App.css'
import { connect } from 'react-redux'
import NavigationBar from '@/components/NavigationBar'
import React, { useCallback } from 'react'

function App (props) {
  // 事件 - 回退
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return(
    <NavigationBar title="火车票" onBack={onBack} ></NavigationBar>
  )
}

export default connect(
  function mapStateToProps (state) {},
  function mapDispatchToProps (dispatch) {}
)(App)