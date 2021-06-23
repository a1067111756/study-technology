/* eslint-disable import/no-anonymous-default-export */
import {
  ACTION_SET_TO_CITY,
  ACTION_SET_FROM_CITY,
  ACTION_SWITCH_FROM_AND_TO_CITY
} from './actions'

// 城市选择的reducer
const citySelectReducer = (state = { fromCity: '北京', toCity: '上海' }, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_SET_TO_CITY:
      return {
        ...state,
        fromCity: payload
      }
    case ACTION_SET_FROM_CITY:
      return {
        ...state,
        toCity: payload
      }
    case ACTION_SWITCH_FROM_AND_TO_CITY:
      console.log('ssssssssss2')
      const {toCity, fromCity} = state
      return {
        ...state,
        toCity: fromCity,
        fromCity: toCity
      }
    default:
      break
  }

  return {
    ...state
  }
}

export default {
  citySelectReducer
}