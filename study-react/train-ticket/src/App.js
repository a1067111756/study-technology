import './App.css'
import React from 'react'

function App (props) {
  return(
    <div className="app-page__container" style={{ height: '100%' }}>
      {props.children}
    </div> 
  )
}

export default App


