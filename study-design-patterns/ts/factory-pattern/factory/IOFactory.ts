import IOHandler from "../product/IOHandler";

export default class IOFactory {
  public static getIOHandler<T extends IOHandler> (ioHandlerClass: new () => T): T {
    let ioHandler = null

    try {
      ioHandler = new ioHandlerClass()
    } catch (e) {
      console.error(e)
      throw new Error('创建出错')
    }

    return ioHandler
  }
}