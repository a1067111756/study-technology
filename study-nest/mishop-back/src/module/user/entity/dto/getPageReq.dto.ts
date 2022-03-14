import { IsNotEmpty } from 'class-validator';

export class GetPageReqDto {
  // 分页页码
  @IsNotEmpty({ message: 'pageNo不能为空' })
  public readonly pageNo: number;

  // 分页条数
  @IsNotEmpty({ message: 'pageSize不能为空' })
  public readonly pageSize: number;

  // 用户名
  public readonly name?: string;

  // 用户状态
  public readonly status?: number;

  // 创建事件
  public readonly create_time?: string;
}
