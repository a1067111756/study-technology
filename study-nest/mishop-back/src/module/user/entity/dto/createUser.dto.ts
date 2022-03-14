import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 12, { message: '用户名长度应为2 ~ 12位字符' })
  public readonly userName: string;

  @IsNotEmpty({ message: '用户角色不能为空' })
  public readonly role: string;

  @Length(2, 12, { message: '用户名长度应为2 ~ 12位字符' })
  public readonly nickName?: string;

  public password?: string;

  public readonly avatar?: string;

  public readonly phone?: string;

  public readonly address?: string;

  public readonly email?: string;

  public readonly status?: number;
}
