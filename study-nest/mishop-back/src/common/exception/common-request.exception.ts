import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonRequestException extends HttpException {
  constructor(code, message) {
    super({ code, message }, HttpStatus.OK);
  }
}
