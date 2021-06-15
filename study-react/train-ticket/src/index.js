import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import store from '@/store/index'
import { Provider } from 'react-redux'
import 'normalize.css'
import '@/assets/iconfont/iconfont.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
