import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PaginationDto } from 'src/common/entity/dto/pagination.dto';

export class CreateDto {
  @Length(2, 12, { message: '用户名长度应为2 ~ 12位字符' })
  @IsString({ message: 'userName类型应为string' })
  @IsNotEmpty({ message: '用户名不能为空' })
  public readonly userName: string;

  @IsOptional()
  @Length(2, 12, { message: '用户昵称长度应为2 ~ 12位字符' })
  @IsString({ message: 'userName类型应为string' })
  public readonly nickName?: string;

  @IsString({ message: 'role类型应为string' })
  @IsNotEmpty({ message: '用户角色不能为空' })
  public readonly role: string;

  @IsOptional()
  @Length(4, 16, { message: '密码长度应为2 ~ 12位字符' })
  @IsString({ message: 'password类型应为string' })
  public password?: string;

  @IsOptional()
  @IsString({ message: 'avatar类型应为string' })
  public readonly avatar?: string;

  @IsOptional()
  @Length(11, 11, { message: '联系电话应为11位数字字符' })
  @IsString({ message: 'phone类型应为string' })
  public readonly phone?: string;

  @IsOptional()
  @Length(0, 100, { message: '联系地址应为0 ~ 100位字符' })
  @IsString({ message: 'address类型应为string' })
  public readonly address?: string;

  @IsOptional()
  @Length(0, 50, { message: '邮箱应为0 ~ 50位字符' })
  @IsString({ message: 'email类型应为string' })
  public readonly email?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;
}

export class UpdateByIdDto {
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;

  @IsOptional()
  @Length(2, 12, { message: '用户名长度应为2 ~ 12位字符' })
  @IsString({ message: 'userName类型应为string' })
  public readonly userName?: string;

  @IsOptional()
  @IsString({ message: 'role类型应为string' })
  public readonly role?: string;

  @IsOptional()
  @Length(2, 12, { message: '用户昵称长度应为2 ~ 12位字符' })
  @IsString({ message: 'userName类型应为string' })
  public readonly nickName?: string;

  @IsOptional()
  @Length(4, 16, { message: '密码长度应为4 ~ 12位字符' })
  @IsString({ message: 'password类型应为string' })
  public password?: string;

  @IsOptional()
  @IsString({ message: 'avatar类型应为string' })
  public readonly avatar?: string;

  @IsOptional()
  @Length(11, 11, { message: '联系电话应为11位数字字符' })
  @IsString({ message: 'phone类型应为string' })
  public readonly phone?: string;

  @IsOptional()
  @Length(0, 100, { message: '联系地址应为0 ~ 100位字符' })
  @IsString({ message: 'address类型应为string' })
  public readonly address?: string;

  @IsOptional()
  @Length(0, 50, { message: '邮箱应为0 ~ 50位字符' })
  @IsString({ message: 'email类型应为string' })
  public readonly email?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;
}

export class GetPageDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'userName类型应为string' })
  public readonly userName?: string;

  @IsOptional()
  @IsString({ message: 'role类型应为string' })
  public readonly role?: string;

  @IsOptional()
  @IsEnum([0, 1], { message: 'status字段类型应为0或1的状态枚举' })
  public readonly status?: number;
}

export class RemoveByIdDto {
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}

export class GetByIdDto {
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}
