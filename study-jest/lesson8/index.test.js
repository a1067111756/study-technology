/* 快照测试例子 */
const { getData } = jest.requireActual('./index')

// jest模拟axios， 不进行真正网络请求，只进行模拟
import axios from 'axios'
jest.mock('axios')

test("Mock axios请求测试例子", async () => {
  axios.get.mockResolvedValue({ data: 'hello' })
  await getData().then((data) => {
    expect(data).toBe('hello')
  })
});

test("Mock axios请求每次不同测试例子", async () => {
  axios.get.mockResolvedValueOnce({ data: 'hello' })
  axios.get.mockResolvedValueOnce({ data: 'world' })
  await getData().then((data) => {
    expect(data).toBe('hello')
  })
  await getData().then((data) => {
    expect(data).toBe('world')
  })  
});


