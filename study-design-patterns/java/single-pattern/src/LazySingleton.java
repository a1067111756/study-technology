/* 懒汉单例模式
*  特点：使用时才初始化对象，非线程安全，但第一次加载时需要及时进行实例初始化，反应稍慢，每次调用getInstance都进行同步会造成不必要开销，推荐指数：3星
*  步骤： 1. 构造函数私有化 2. 对外暴露公有静态方法获取对象
* */
public class LazySingleton {
    private static LazySingleton lazySingleton;

    // 1. 构造函数私有化
    private LazySingleton() {};

    // 2. 对外提供对象获取接口
    public static synchronized LazySingleton getInstance () {
        if (lazySingleton == null) {
            lazySingleton = new LazySingleton();
        }
        return lazySingleton;
    }

    public void check () {
        System.out.print("I'm lazy singleton!!\n");
    }
}
