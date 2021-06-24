import React from 'react'
import ReactDOM from 'react-dom'
import store from '@/store/index'
import { Provider } from 'react-redux'
import IRouter from '@/router/index'
import 'normalize.css'
import '@/assets/iconfont/iconfont.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
