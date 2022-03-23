import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDto {
  @IsString({ message: 'pid类型应为string' })
  @IsNotEmpty({ message: 'pid字段不能为空' })
  public readonly pid: string;

  @Length(1, 12, { message: 'name字段长度应为1 ~ 12位字符' })
  @IsString({ message: 'name类型应为string' })
  @IsNotEmpty({ message: 'name字段不能为空' })
  public readonly name: string;

  @IsOptional()
  @Length(0, 30, { message: 'icon字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'icon字段类型应为string' })
  public readonly icon?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;

  @IsOptional()
  @Length(0, 100, { message: 'remark字段长度应为0 ~ 100位字符' })
  @IsString({ message: 'remark字段类型应为string' })
  public readonly remark?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'hideInMenu字段类型应为0或1的状态枚举' })
  public readonly hideInMenu?: number;

  @IsOptional()
  @IsEnum([0, 1], { message: 'hideInBreadcrumb字段类型应为0或1的状态枚举' })
  public readonly hideInBreadcrumb?: number;
}

export class UpdateByIdDto {
  @IsString({ message: 'id类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;

  @IsString({ message: 'pid类型应为string' })
  @IsNotEmpty({ message: 'pid字段不能为空' })
  public readonly pid: string;

  @Length(1, 12, { message: 'name字段长度应为1 ~ 12位字符' })
  @IsString({ message: 'name类型应为string' })
  @IsNotEmpty({ message: 'name字段不能为空' })
  public readonly name: string;

  @IsOptional()
  @Length(0, 30, { message: 'icon字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'icon字段类型应为string' })
  public readonly icon?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;

  @IsOptional()
  @Length(0, 100, { message: 'remark字段长度应为0 ~ 100位字符' })
  @IsString({ message: 'remark字段类型应为string' })
  public readonly remark?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'hideInMenu字段类型应为0或1的状态枚举' })
  public readonly hideInMenu?: number;

  @IsOptional()
  @IsEnum([0, 1], { message: 'hideInBreadcrumb字段类型应为0或1的状态枚举' })
  public readonly hideInBreadcrumb?: number;
}

export class GetTreeDto {
  @IsOptional()
  @IsString({ message: 'id类型应为string' })
  public readonly id?: string;
}

export class RemoveByIdDto {
  @IsString({ message: 'id类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}
