export const ACTION_SET_TO_CITY = 'SET_TO_CITY'
export const ACTION_SET_FROM_CITY = 'SET_FROM_CITY'
export const ACTION_SWITCH_FROM_AND_TO_CITY = 'SWITCH_FROM_AND_TO_CITY'

// 设置来自哪里城市
export function setFromCity (fromCity) {
  return {
    type: ACTION_SET_FROM_CITY,
    payload: fromCity
  }
}

// 设置去哪里城市
export function setToCity (toCity) {
  return {
    type: ACTION_SET_TO_CITY,
    payload: toCity
  }
}

// 对换来哪里和去哪里城市
export function switchFromAndToCity () {
  console.log('ssssssssss1')
  return {
    type: ACTION_SWITCH_FROM_AND_TO_CITY
  }
}