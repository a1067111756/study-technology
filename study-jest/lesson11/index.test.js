/* ES6类测试例子 */
jest.mock('./util') // jest.mock发现util是一个类, 会自动把类的构造函数和方法变成jest.fn
import Util from './util'
import { demoFunction } from './index'

test('类功能测试例子', () => {
  demoFunction()
  expect(Util).toHaveBeenCalled() // Util构造方法被执行过b
  expect(Util.mock.instances[0].a).toHaveBeenCalled() // Util.a方法被调用过
  expect(Util.mock.instances[0].b).toHaveBeenCalled() // Util.b方法被调用过
})

