import IOHandler from "./IOHandler";

export default class XMLHandler extends IOHandler {
  add(): void {
    console.log('XMLHandler add method call!')
  }

  query(): void {
    console.log('XMLHandler query method call!')
  }

  remove(): void {
    console.log('XMLHandler remove method call!')
  }

  update(): void {
    console.log('XMLHandler update method call!')
  }
}