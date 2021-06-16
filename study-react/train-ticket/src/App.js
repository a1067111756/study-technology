import './App.css'
import React from 'react'
import { connect } from 'react-redux'
import HomePage from './views/home/index'

function App (props) {
  return(
    <HomePage></HomePage>
  )
}

export default connect(
  function mapStateToProps (state) {},
  function mapDispatchToProps (dispatch) {}
)(App)