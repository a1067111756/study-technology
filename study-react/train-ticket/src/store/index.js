import thunk from 'redux-thunk'
import reducers from './reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'

export default createStore(
  combineReducers(reducers),
  {
  },
  applyMiddleware(thunk)
)