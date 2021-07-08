import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 12, { message: '用户名长度应为2 ~ 12位字符' })
  public readonly name: string;

  public readonly status?: boolean;

  @MaxLength(50, { message: '备注最大长度为50字符' })
  public readonly remark?: string;
}
