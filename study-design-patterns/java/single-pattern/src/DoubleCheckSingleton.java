/* 双重校验锁单例模式
*  特点：既能使用时初始化对象，又是线程安全，但是某些情况下会失效，不建议这种方式， 推荐指数：1星
*  步骤： 1. 构造函数私有化 2. 对外暴露公有静态方法获取对象
* */
public class DoubleCheckSingleton {
    private static DoubleCheckSingleton doubleCheckSingleton = null;

    // 1. 构造函数私有化
    private DoubleCheckSingleton() {};

    // 2. 对外提供对象获取接口
    public static DoubleCheckSingleton getInstance () {
        // 第一层判空是为了避免非必要同步
        if (doubleCheckSingleton == null) {
            synchronized (DoubleCheckSingleton.class) {
                // 第二层判空是检查实例是否已经创建
                if (doubleCheckSingleton == null) {
                    doubleCheckSingleton = new DoubleCheckSingleton();
                }
            }
        }
        return doubleCheckSingleton;

    }

    public void check () {
        System.out.print("I'm doubleCheck Singleton\n");
    }
}
