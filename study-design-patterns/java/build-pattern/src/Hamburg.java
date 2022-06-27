/* 建造模式 - 构建相对复杂的流程对象
 *  包含三个基本元素：对象类、构造类、组装类
 *    对象类 - 最终需要构建出的对象
 *    构造类 - 负责属性的构造，只提供属性的设置方法
 *    组装类 - 负责组装的实际流程，包括组装属性、属性设置顺序等
 *
 *  优点： 1. 构造类(Builder)和组装类(Director)共同封装了组建对象的细节，构造类负责可以设置哪些属性，组装类
 *           负责怎么去组装这些属性
 *        2. 组装类(Director)封装了组装的细节，可以根据不同的场景设置不同的组装流程，特别对属性的不同组装形式
 *           会影响最终生成不同对象的情景特别适用
 * */

// 对象类
public class Hamburg {
    private final String name;
    private final String meatType;
    private final int breadNum;

    public Hamburg(String name, String meatType, int breadNum) {
        this.name = name;
        this.meatType = meatType;
        this.breadNum = breadNum;
    }

    public void getInfo() {
        System.out.print(this.name + ": meatType - " + this.meatType + ", breadNum: " + this.breadNum + "\n");
    }
}

// 构造类
abstract class HamburgBuilder {
    public abstract HamburgBuilder setMeatType(String meatType);
    public abstract HamburgBuilder setBreadNum(int breadNum);
    public abstract Hamburg build();
}

class BeefHamburgBuilder extends HamburgBuilder {
    private String name = "beefHamburg";
    private String meatType;
    private int breadNum;

    @Override
    public HamburgBuilder setMeatType(String meatType) {
        this.meatType = meatType;
        return this;
    }

    @Override
    public HamburgBuilder setBreadNum(int breadNum) {
        this.breadNum = breadNum;
        return this;
    }

    @Override
    public Hamburg build() {
        return new Hamburg(this.name, this.meatType, this.breadNum);
    }
}

class PorkHamburgBuilder extends HamburgBuilder {
    private String name = "porkHamburg";
    private String meatType;
    private int breadNum;

    @Override
    public HamburgBuilder setMeatType(String meatType) {
        this.meatType = meatType;
        return this;
    }

    @Override
    public HamburgBuilder setBreadNum(int breadNum) {
        this.breadNum = breadNum;
        return this;
    }

    @Override
    public Hamburg build() {
        return new Hamburg(this.name, this.meatType, this.breadNum);
    }
}

// 组装类
class HamburgDirector {
    public static Hamburg constructor1(HamburgBuilder builder, String meatType, int breadNum) {
        builder.setMeatType(meatType);
        // console.log('先将肉炸了，再组装')
        builder.setBreadNum(breadNum);
        return builder.build();
    }

    public static Hamburg constructor2(HamburgBuilder builder, String meatType, int breadNum) {
        builder.setMeatType(meatType);
        builder.setBreadNum(breadNum);
        // console.log('先组装再将汉堡炸了')
        return builder.build();
    }
}
