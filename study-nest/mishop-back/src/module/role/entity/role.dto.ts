import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PaginationDto } from 'src/common/entity/dto/pagination.dto';

export class CreateDto {
  // 角色名
  @Length(2, 12, { message: 'name字段长度应为2 ~ 12位字符' })
  @IsString({ message: 'name类型应为string' })
  @IsNotEmpty({ message: 'name字段不能为空' })
  public readonly name: string;

  // 角色状态
  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;

  // 菜单分配
  // 角色备注
  @IsOptional()
  @Length(0, 100, { message: 'remark字段长度应为0 ~ 100位字符' })
  @IsString({ message: 'remark字段类型应为string' })
  public readonly remark?: string;
}

export class UpdateByIdDto {
  // 角色id
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;

  // 角色名
  @IsOptional()
  @Length(2, 12, { message: 'name字段长度应为2 ~ 12位字符' })
  @IsString({ message: 'name类型应为string' })
  public readonly name?: string;

  // 角色状态
  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;

  // 角色备注
  @IsOptional()
  @Length(0, 100, { message: 'remark字段长度应为0 ~ 100位字符' })
  @IsString({ message: 'remark字段类型应为string' })
  public readonly remark?: string;
}

export class GetPageDto extends PaginationDto {
  // 角色名
  @IsOptional()
  @IsString({ message: 'name类型应为string' })
  public readonly name?: string;

  // 角色状态
  @IsOptional()
  @IsEnum([0, 1], { message: 'status类型应为0或1的状态枚举' })
  public readonly status?: number;
}

export class RemoveByIdDto {
  // 角色名
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}

export class GetByIdDto {
  // 角色名
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}
