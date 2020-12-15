/* 异步函数测试 */

import { fetchData } from './index'

test('异步函数测试', (done) => {
  fetchData().then(data => {
    expect(data).toEqual({
      success: true
    })
    done()
  })
})

test('promise函数测试1', () => {
  expect(fetchData()).resolves.toMatchObject({
    success: true
  })
})

test('promise函数测试2', async () => {
  await expect(fetchData()).resolves.toMatchObject({
    success: true
  })
})

test('promise函数测试3', async () => {
  const data = await fetchData()
  expect(data).toEqual({ success: true })
})
