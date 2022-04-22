/* 饿汉单例模式
*  步骤： 1. 构造方法私有化 2. 实例化变量的私有引用 3. 获取实例的方法公有
* */
export default class HungrySingleton {
  // 实例化变量的私有引用
  private static instance = new HungrySingleton()

  // 构造方法私有化
  private constructor () {}

  // 获取实例的方法公有
  public static getInstance () {
    return this.instance
  }

  public check () {
    console.log('I am hungry singleton!')
  }
}
