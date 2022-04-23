/* 静态内部类单例模式
*  特点：既保证线程安全，又保证单例对象的唯一性，同时也延迟了单例的实例化。推荐指数：5星
*  步骤： 1. 构造函数私有化 2. 对外暴露公有静态方法获取对象 3. 内部持有静态内部类
* */
public class StaticClassSingleton {
    // 1. 构造函数私有化
    private StaticClassSingleton() {};

    // 2. 对外提供对象获取接口
    public static StaticClassSingleton getInstance () {
        return SingletonHolder.instance;
    }

    public void check () {
        System.out.print("I'm staticClass singleton!\n");
    }

    private static class SingletonHolder {
        private static final StaticClassSingleton instance = new StaticClassSingleton();
    }
}
