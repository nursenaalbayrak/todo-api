import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from 'src/users/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

interface CreateTodoDto {
  title: string;
  description?: string;
}

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAllByUser(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async createForUser(user: User, dto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({ ...dto, user });
    return this.todoRepository.save(todo);
  }

  async markDone(userId: number, id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) throw new NotFoundException('Görev bulunamadı');
    todo.done = true;
    return this.todoRepository.save(todo);
  }

  async updateTodo(userId: number, id: number, body: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) throw new NotFoundException('Görev bulunamadı');
    Object.assign(todo, body);
    return this.todoRepository.save(todo);
  }

  async delete(userId: number, id: number): Promise<{ deleted: boolean }> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) throw new NotFoundException('Görev bulunamadı');
    await this.todoRepository.remove(todo);
    return { deleted: true };
  }

  async findFilteredTodos(
    userId: number,
    filters: { done?: string; title?: string },
  ): Promise<Todo[]> {
    const query = this.todoRepository.createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId });

    if (filters.done !== undefined) {
      query.andWhere('todo.done = :done', { done: filters.done === 'true' });
    }

    if (filters.title) {
      query.andWhere('todo.title ILIKE :title', { title: `%${filters.title}%` });
    }

    return query.getMany();
  }
}
