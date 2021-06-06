import { createStore } from 'redux'
import reducer from '../reducer'

// eslint-disable-next-line
export default () => createStore(reducer)