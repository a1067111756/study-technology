import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDto {
  @IsEnum([0, 1, 2], { message: 'type字段类型应为0、1、2的状态枚举' })
  @IsNotEmpty({ message: 'type字段不能为空' })
  public readonly type: number;

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
  @Length(0, 30, { message: 'local字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'local字段类型应为string' })
  public readonly local?: string;

  @IsOptional()
  @Length(0, 30, { message: 'path字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'path字段类型应为string' })
  public readonly path?: string;

  @IsOptional()
  @Length(0, 30, { message: 'component字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'component字段类型应为string' })
  public readonly component?: string;

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

  @IsOptional()
  @IsEnum([0, 1, 2], { message: 'type字段类型应为0、1、2的状态枚举' })
  public readonly type: number;

  @IsOptional()
  @IsString({ message: 'pid类型应为string' })
  public readonly pid: string;

  @IsOptional()
  @Length(1, 12, { message: 'name字段长度应为1 ~ 12位字符' })
  @IsString({ message: 'name类型应为string' })
  public readonly name: string;

  @IsOptional()
  @Length(0, 30, { message: 'icon字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'icon字段类型应为string' })
  public readonly icon?: string;

  @IsOptional()
  @Length(0, 30, { message: 'local字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'local字段类型应为string' })
  public readonly local?: string;

  @IsOptional()
  @Length(0, 30, { message: 'path字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'path字段类型应为string' })
  public readonly path?: string;

  @IsOptional()
  @Length(0, 30, { message: 'component字段长度应为0 ~ 30位字符' })
  @IsString({ message: 'component字段类型应为string' })
  public readonly component?: string;

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
