// 对象匹配器 - 地址相同才相同
test('测试对象匹配器', () => {
  expect('address equal be equal').toBe('address equal be equal')
})

// 内容匹配器 - 内容相同即相同
test('测试内容匹配器', () => {
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
})

// 空匹配器 - null表示空， undefined不为空
test('空匹配器', () => {
  expect(null).toBeNull()
})

// 未定义匹配器
test('未定义匹配器', () => {
  expect(undefined).toBeUndefined()
})

// 已定义匹配器
test('已定义匹配器', () => {
  const a = 1
  expect(a).toBeDefined()
})

// 真匹配器
test('真匹配器', () => {
  expect(true).toBeTruthy()
})

// 假匹配器
test('假匹配器', () => {
  expect(false).toBeFalsy()
})

// 取反匹配器
test('取反匹配器', () => {
  expect(false).not.toBeTruthy()
})

// 大于
test('大于匹配器', () => {
  expect(3).toBeGreaterThan(2)
})

// 小于
test('小于匹配器', () => {
  expect(2).toBeLessThan(3)
})

// 大于等于
test('大于等于匹配器', () => {
  expect(3).toBeGreaterThanOrEqual(3)
})

// 小于等于
test('小于等于匹配器', () => {
  expect(3).toBeLessThanOrEqual(3)
})

// 近似等于
test('小于等于匹配器', () => {
  expect(1 + 2).toBeCloseTo(3)
})

// 字符串包含
test('字符串包含', () => {
  expect('hello world').toMatch('llo')
})

// 数组包含
test('数组包含', () => {
  expect(['a', 'b', 'c']).toContain('b')
})

// 异常匹配器
test('异常匹配器', () => {
  const throwNewErrorFunc = () => {
    throw new Error('this is a new error')
  }  
  expect(throwNewErrorFunc).toThrow('this is a new error')
})
