import IOHandler from "./IOHandler";

export default class FileHandler extends IOHandler {
  add(): void {
    console.log('FileHandler add method call!')
  }

  query(): void {
    console.log('FileHandler query method call!')
  }

  remove(): void {
    console.log('FileHandler remove method call!')
  }

  update(): void {
    console.log('FileHandler update method call!')
  }
}