import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Label } from 'src/labels/label.entity';
import { ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // 🆕 EKLENDİ
  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  @ManyToMany(() => Label, (label) => label.todos, { cascade: true })
  @JoinTable()
  labels: Label[];

  @ManyToOne(() => User, { eager: false, nullable: false, onDelete: 'CASCADE' })
  user: User;
}