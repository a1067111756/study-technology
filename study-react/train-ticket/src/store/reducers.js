/* eslint-disable import/no-anonymous-default-export */
import dayjs from 'dayjs'
import {
  ACTION_SET_TO_CITY,
  ACTION_SET_FROM_CITY,
  ACTION_SWITCH_FROM_AND_TO_CITY,
  ACTION_SET_TRAIN_NUMBER_DATE
} from './actions'

// 城市选择的reducer
const citySelectReducer = (state = { fromCity: '北京', toCity: '上海' }, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_SET_TO_CITY:
      return {
        ...state,
        toCity: payload
      }
    case ACTION_SET_FROM_CITY:
      return {
        ...state,
        fromCity: payload
      }
    case ACTION_SWITCH_FROM_AND_TO_CITY:
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

// 车次信息
const trainNumberReducer = (state = { trainNumberDate: dayjs().format('YYYY-MM-D') }, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_SET_TRAIN_NUMBER_DATE:
      return {
        ...state,
        trainNumberDate: payload
      }
    default:
      break
  }

  return {
    ...state
  }
}

export default {
  citySelectReducer,
  trainNumberReducer
}