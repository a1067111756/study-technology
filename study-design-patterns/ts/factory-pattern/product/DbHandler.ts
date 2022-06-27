import IOHandler from "./IOHandler";

export default class DbHandler extends IOHandler {
  add(): void {
    console.log('DbHandler add method call!')
  }

  query(): void {
    console.log('DbHandler query method call!')
  }

  remove(): void {
    console.log('DbHandler remove method call!')
  }

  update(): void {
    console.log('DbHandler update method call!')
  }
}