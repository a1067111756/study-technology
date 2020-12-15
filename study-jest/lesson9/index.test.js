/* 快照测试例子 */
jest.mock('./mock')
import { fetchData } from "./mock";
const { fetchData1 } = jest.requireActual("./mock");


test("__mocks__中存在替换ajax测试例子", () => {
  return fetchData().then(data => {
    expect(data).toEqual('hello jest!')
  })
});

test("__mocks__不存在替换ajax测试例子", () => {
  return fetchData1().then(data => {
    expect(data).toEqual('hello jest1!')
  })
});







