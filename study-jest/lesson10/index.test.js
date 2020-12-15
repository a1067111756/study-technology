/* mock time定时器测试例子 */
const { timer, timer1 } = jest.requireActual('./index')
jest.useFakeTimers() // 初始化模拟timer
test("Mock timer测试例子", () => {
  const fn = jest.fn() // 创建模拟函数
  timer(fn) // 调用延时timer
  jest.advanceTimersByTime(3000) // 是定时器快进3000ms执行
  expect(fn).toHaveBeenCalledTimes(1)
});

test("Mock timer嵌套测试例子", () => {
  const fn = jest.fn() // 创建模拟函数
  timer1(fn) // 调用延时timer
  jest.advanceTimersByTime(6000) // 是定时器提前6000ms执行
  expect(fn).toHaveBeenCalledTimes(2)
});



