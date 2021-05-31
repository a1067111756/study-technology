import React from 'react'

class App extends React.Component {
  render () {
    return (
      <div className="app-page__container" style={{ height: '100%' }}>
        {this.props.children}
      </div> 
    )
  }
}

export default App