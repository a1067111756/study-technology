import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile: number;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  status: boolean;
}
