import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'bigint', nullable: true })
  resetTokenTimestamp: number;
}
