public class Application {
    public static void main(String[] args) {
        HungrySingleton hungrySingleton = HungrySingleton.getInstance();
        hungrySingleton.check();

        LazySingleton lazySingleton = LazySingleton.getInstance();
        lazySingleton.check();

        DoubleCheckSingleton doubleCheckSingleton = DoubleCheckSingleton.getInstance();
        doubleCheckSingleton.check();

        StaticClassSingleton staticClassSingleton = StaticClassSingleton.getInstance();
        staticClassSingleton.check();

        EnumSingleton enumSingleton = EnumSingleton.INSTANCE;
        enumSingleton.check();
    }
}
