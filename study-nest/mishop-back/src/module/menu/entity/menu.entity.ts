import {
  Column,
  Entity,
  Tree,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Tree('adjacency-list')
export class Menu {
  // 菜单uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 菜单类型
  @Column()
  type: number;

  // 菜单父节点id
  @Column({ length: 36 })
  pid: string;

  // 菜单名
  @Column({ length: 30 })
  name: string;

  // 菜单图标
  @Column({ length: 30, nullable: true })
  icon: string;

  // 国际化
  @Column({ length: 50, nullable: true })
  local: string;

  // 路由地址
  @Column({ length: 100, nullable: true })
  path: string;

  // 组件路径
  @Column({ length: 100, default: 'Layout', nullable: true })
  component: string;

  //  菜单状态
  @Column({ default: 1 })
  status: number;

  //  菜单备注
  @Column({ length: 500, nullable: true })
  remark: string;

  // 在菜单中隐藏这个路由
  @Column({ default: 0 })
  hideInMenu: number;

  // 在面包屑中隐藏这个路由
  @Column({ default: 0 })
  hideInBreadcrumb: number;

  //  菜单创建时间
  @CreateDateColumn()
  create_time: Date;

  //  菜单更新时间
  @UpdateDateColumn()
  update_time: Date;

  // 子节点
  children: Menu[];
}
