import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  // 角色名
  @IsNotEmpty({ message: '角色名不能为空' })
  @Length(2, 12, { message: '角色名长度应为2 ~ 12位字符' })
  public readonly name: string;

  // 角色状态
  public readonly status?: number;

  // 角色备注
  public readonly remark?: string;
}
