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

export class Hamburg {
  private name: string;
  private meatType: string
  private breadNum: number

  public constructor(name: string, meatType: string, breadNum: number) {
    this.name = name
    this.meatType = meatType
    this.breadNum = breadNum
  }

  public getInfo(): void {
    console.log(`${this.name}：肉 - ${this.meatType}，面包片数量 - ${this.breadNum}`)
  }
}

// 抽象构造类 - 负责属性的构造
abstract class HamburgBuilder {
  public abstract setMeatType(meatType: String): HamburgBuilder;
  public abstract setBreadNum(breadNum: number): HamburgBuilder;
  public abstract build(): Hamburg;
}

// 实际构造类
export class BeefHamburgBuilder extends HamburgBuilder {
  private name: string = '牛肉汉堡';
  private meatType: string = '牛肉'
  private breadNum: number = 2

  setBreadNum(breadNum: number): BeefHamburgBuilder {
    this.breadNum = breadNum
    return this
  }

  setMeatType(meatType: string): BeefHamburgBuilder {
    this.meatType = meatType
    return this
  }

  public build(): Hamburg {
    return new Hamburg(this.name, this.meatType, this.breadNum);
  }
}

// 实际构造类
export class PorkHamburgBuilder extends HamburgBuilder {
  private name: string = '猪肉汉堡'
  private meatType: string = '猪肉'
  private breadNum: number = 2

  setBreadNum(breadNum: number): PorkHamburgBuilder {
    this.breadNum = breadNum
    return this
  }

  setMeatType(meatType: string): PorkHamburgBuilder {
    this.meatType = meatType
    return this
  }

  public build(): Hamburg {
    return new Hamburg(this.name, this.meatType, this.breadNum);
  }
}

// 抽象组装类 - 负责组装的实际流程，包括属性、属性设置顺序等
export class HamburgDirector {
  // 流程一：
  public static constructor1(builder: HamburgBuilder, meatType: string, breadNum: number) {
    builder.setMeatType(meatType)
    // console.log('先将肉炸了，再组装')
    builder.setBreadNum(breadNum)
    return builder.build()
  }

  // 流程二：
  public static constructor2(builder: HamburgBuilder, meatType: string, breadNum: number) {
    builder.setBreadNum(breadNum)
    builder.setMeatType(meatType)
    // console.log('先组装再将汉堡炸了')
    return builder.build()
  }
}