import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  // 角色名
  @Length(2, 12, { message: 'name字段长度应为2 ~ 12位字符' })
  @IsNotEmpty({ message: 'name字段不能为空' })
  public readonly name: string;

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
