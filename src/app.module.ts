import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { Label } from './labels/label.entity';
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     TodosModule,
    TypeOrmModule.forRoot({
      
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      entities: [User,Todo,Label],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
    AuthModule,
    LabelsModule,
  ],
})
export class AppModule {}