import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: 1 })
  status: number;

  // 创建时间
  @CreateDateColumn()
  create_time: Date;

  // 更新时间
  @UpdateDateColumn()
  update_time: Date;
}
