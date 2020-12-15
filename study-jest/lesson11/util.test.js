/* 类方法测试 */
import Util from './util'

let util = null
beforeAll(() => {
  util = new Util()    
})

test('测试Util a方法', () => {
  expect(util.a()).toEqual('a')
})

test('测试Util b方法', () => {
  expect(util.b()).toEqual('b')
})

