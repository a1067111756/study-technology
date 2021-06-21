import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CommonRequestException } from 'src/common/exception/common-request.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metaData: ArgumentMetadata) {
    // 检查参数是否是支持的检查类型
    if (!metaData.metatype || !this.toValidate(metaData.metatype)) {
      return value;
    }

    // 使用class-transformer将json数据转换为class对象
    const object = plainToClass(metaData.metatype, value);

    // 使用class-validator进行参数验证
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorText = Object.values(errors[0].constraints);
      throw new CommonRequestException('40001', `参数不合法 - [${errorText}]`);
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
