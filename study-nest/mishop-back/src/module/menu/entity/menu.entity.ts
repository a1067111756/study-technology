import {
  Column,
  Entity,
  Tree,
  ManyToOne,
  OneToMany,
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

  // 菜单父节点id
  @Column({ length: 36 })
  parentId: string;

  // 菜单名
  @Column({ length: 30 })
  name: string;

  // 菜单图标
  @Column({ length: 30 })
  icon: string;

  //  菜单状态
  @Column({ default: true })
  status: number;

  //  菜单备注
  @Column({ length: 500, nullable: true })
  remark: string;

  // 在菜单中不展示这个路由
  @Column({ default: false })
  hideInMenu: boolean;

  // 在面包屑中不展示这个路由
  @Column({ default: false })
  hideInBreadcrumb: boolean;

  //  菜单创建时间
  @CreateDateColumn()
  create_time: Date;

  //  菜单更新时间
  @UpdateDateColumn()
  update_time: Date;
  //
  // @ManyToOne(() => Menu, (menu) => menu.children)
  // parent: Menu;
  //
  // @OneToMany(() => Menu, (menu) => menu.parent)
  // children: Menu[];
}
