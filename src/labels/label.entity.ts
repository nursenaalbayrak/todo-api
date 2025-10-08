import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Todo } from 'src/todos/todo.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Todo, (todo) => todo.labels)
  todos: Todo[];
}