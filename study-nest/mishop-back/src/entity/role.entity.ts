import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  // 角色uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 角色名
  @Column({ length: 100 })
  name: string;

  // 角色状态
  @Column({ default: true })
  status: boolean;

  // 角色备注
  @Column({ length: 500 })
  remark: string;

  // 角色创建时间
  @Column({ type: 'datetime' })
  create_time: Date;

  // 角色更新时间
  @Column({ type: 'datetime' })
  update_time: Date;
}
