import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '验证码不能为空' })
  public readonly captcha: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  public readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  public readonly password: string;
}
