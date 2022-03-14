import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  // 角色uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 角色名
  @Column({ length: 30 })
  name: string;

  // 角色状态
  @Column({ default: true })
  status: number;

  // 角色备注
  @Column({ length: 500, nullable: true })
  remark: string;

  // 角色创建时间
  @CreateDateColumn()
  create_time: Date;

  // 角色更新时间
  @UpdateDateColumn()
  update_time: Date;
}
