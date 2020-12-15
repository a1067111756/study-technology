export function generateConfig () {
  return {
    port: 3000,
    url: 'sicascia.cn',
    domain: 'www.baidu.com'
  }
}

export function generateDynamicConfig () {
  return {
    port: 3000,
    url: 'sicascia.cn',
    domain: 'www.baidu.com',
    data: new Date()
  }
}