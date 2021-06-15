import thunk from 'redux-thunk'
import reducers from './reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'

export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false
  },
  applyMiddleware(thunk)
)