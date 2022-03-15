import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveRoleDto {
  // 角色名
  @IsString({ message: 'id字段类型应为string' })
  @IsNotEmpty({ message: 'id字段不能为空' })
  public readonly id: string;
}
