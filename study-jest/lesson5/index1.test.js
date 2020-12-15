/* Jest钩子函数 */



describe('测试用例', () => {
  beforeAll(() => {
    console.log('beforeAll执行')  
  })
  
  beforeEach(() => {
    console.log('beforeEach执行')  
  })

  afterEach(() => {
    console.log('afterEach执行')  
  })
  
  afterAll(() => {
    console.log('beforeAll执行')  
  })
  
  describe('测试一二用例', () => {
    test('测试用例1', () => {
      console.log('测试用例1执行')
    })
    
    test('测试用例2', () => {
      console.log('测试用例2执行')
    })
  })
  
  describe('测试三四用例', () => {
    test('测试用例3', () => {
      console.log('测试用例3执行')
    })
    
    test('测试用例4', () => {
      console.log('测试用例4执行')
    })
  })
})
