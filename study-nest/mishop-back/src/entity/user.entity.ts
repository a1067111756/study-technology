import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 20 })
  password: string;

  @Column()
  mobile: number;

  @Column({ length: 50 })
  emial: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  role_id: number;
}
