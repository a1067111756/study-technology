/* 饿汉单例模式
*  特点：声明时就初始化对象，线程安全，但是未使用就初始化浪费资源，推荐指数：3星
*  步骤： 1. 构造函数私有化 2. 对外暴露公有静态方法获取对象
* */
public class HungrySingleton {
    private static final HungrySingleton hungrySingleton = new HungrySingleton();

    // 1. 构造函数私有化
    private HungrySingleton () {};

    // 2. 对外提供对象获取接口
    public static HungrySingleton getInstance () {
        return hungrySingleton;
    }

    public void check () {
        System.out.print("I'm hungry singleton!\n");
    }
}
