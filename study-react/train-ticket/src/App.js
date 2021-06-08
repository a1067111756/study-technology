import './App.css';
import React from 'react'

// class App extends React.Component {
//   state = {
//     count: 0
//   }

//   onCountClick = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   render () {
//     return(
//       <div>
//         <button onClick={this.onCountClick}>{ this.state.count }</button>
//       </div>
//     )  
//   }
// }

function App () {
  const [count, setCount] = React.useState(0)

  return(
    <div>
      <button onClick={() => { setCount(count + 1) }}>{ count }</button>
    </div>
  )
}

export default App;
