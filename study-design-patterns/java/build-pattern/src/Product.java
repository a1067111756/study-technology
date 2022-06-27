/* 建造模式 - 构建简单对象
 *  包含两个基本元素：对象类、构造类
 *    对象类 - 最终需要构建出的对象
 *    构造类 - 负责属性的构造，只提供属性的设置方法
 *
 *  优点： 比较简单，构造类提供以可选链式的方式将属性构造方法从对象类中抽离，适合需要配置多个参数生成对象的情景
 * */
public class Product {
    private final int width;
    private final int height;
    private final String shape;

    private Product(int width, int height, String shape) {
        this.width = width;
        this.height = height;
        this.shape = shape;
    }

    public void logInfo() {
        System.out.print("width:" + this.width + ", height:" + this.height + ", shape:" + this.shape + "\n");
    }

    static class Builder {
        private int width;
        private int height;
        private String shape;

        public Builder setWidth(int width) {
            this.width = width;
            return this;
        }

        public Builder setHeight(int height) {
            this.height = height;
            return this;
        }

        public Builder setShape(String shape) {
            this.shape = shape;
            return this;
        }

        public Product build() {
            return new Product(this.width, this.height, this.shape);
        }
    }
}
