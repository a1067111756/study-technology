/* Jest钩子函数 */

beforeAll(() => {
  console.log('beforeAll执行')  
})

beforeEach(() => {
  console.log('beforeEach执行')  
})

test('测试用例1', () => {
  console.log('测试用例1执行')
})

test('测试用例2', () => {
  console.log('测试用例2执行')
})

afterEach(() => {
  console.log('afterEach执行')  
})

afterAll(() => {
  console.log('beforeAll执行')  
})