/* 分页相关dto */
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class PaginationDto {
  // 分页页码
  @IsPositive({ message: 'pageNo起始值为1' })
  @IsInt({ message: 'pageNo类型应为number' })
  @IsNotEmpty({ message: 'pageNo不能为空' })
  public readonly pageNo: number;

  // 分页条数
  @IsPositive({ message: 'pageSize不能小于等于0' })
  @IsInt({ message: 'pageSize类型为number' })
  @IsNotEmpty({ message: 'pageSize不能为空' })
  public readonly pageSize: number;
}
