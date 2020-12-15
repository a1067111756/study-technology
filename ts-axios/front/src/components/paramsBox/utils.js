export const arrayToObject = (value) => {
  let obj = {}
  value.forEach(item => {
    obj[item.key] = item.value
  })

  return obj
}

export const objectToArray = (value) => {
  return Object.keys(value).map(key => ({ value: value[key], key: key }))
}