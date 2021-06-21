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
  emial: string;

  @Column({ default: true })
  status: boolean;
}
