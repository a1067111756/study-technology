import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/entity/dto/pagination.dto';

export class GetPageReqDto extends PaginationDto {
  // 角色名
  @IsOptional()
  @IsString({ message: 'name类型应为string' })
  public readonly name?: string;

  // 角色状态
  @IsOptional()
  @IsEnum([0, 1], { message: 'status类型应为0或1的状态枚举' })
  public readonly status?: number;

  // 创建事件
  @IsOptional()
  @IsDate({ message: 'create_time类型应为date' })
  public readonly create_time?: string;
}
