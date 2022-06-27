/* 建造模式 - 构建简单对象
*  包含两个基本元素：对象类、构造类
*    对象类 - 最终需要构建出的对象
*    构造类 - 负责属性的构造，只提供属性的设置方法
*
*  优点： 比较简单，构造类提供以可选链式的方式将属性构造方法从对象类中抽离，适合需要配置多个参数生成对象的情景
* */

export default class Product {
  private width: number;
  private height: number;
  private shape: String;

  private constructor(width: number, height: number, shape: String) {
    this.width = width;
    this.height = height;
    this.shape = shape;
  }

  public getInfo(): void {
    console.log(`宽: ${this.width}, 高：${this.height}， 形状：${this.shape}`)
  }

  static Builder = class Builder {
    private width: number = 0;
    private height: number = 0;
    private shape: String = '';

    public setWidth(width: number): Builder {
      this.width = width;
      return this
    }

    public setHeight(height: number): Builder {
      this.height = height;
      return this
    }

    public setShape(shape: String): Builder {
      this.shape = shape;
      return this
    }

    public build(): Product {
      return new Product(this.width, this.height, this.shape);
    }
  }
}

