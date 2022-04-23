/* 枚举单例模式
 *  特点：天生支持线程安全，并支持反序列化，推荐指数：5星
 * */

public enum EnumSingleton {
    INSTANCE;
    public void check () {
        System.out.print("I'm enum singleton!\n");
    }
}
