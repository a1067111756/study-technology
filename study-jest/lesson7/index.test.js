/* 快照测试例子 */
const { generateConfig, generateDynamicConfig } = jest.requireActual("./index");

test("快照测试基本例子", () => {
  expect(generateConfig()).toMatchSnapshot();
});

test("快照测试含有动态属性的例子", () => {
  expect(generateDynamicConfig()).toMatchSnapshot({
    data: expect.any(Date),
  });
});

test("行内快照测试例子", () => {
  expect(generateConfig()).toMatchInlineSnapshot(`
    Object {
      "domain": "www.baidu.com",
      "port": 3000,
      "url": "sicascia.cn",
    }
  `);
});
