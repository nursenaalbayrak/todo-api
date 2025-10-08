import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { User } from 'src/users/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface CreateTodoDto {
  title: string;
  description?: string;
}

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm görevleri getir' })
  @ApiResponse({ status: 200, description: 'Başarıyla görevler listelendi' })
  list(@Req() req: any) {
    return this.todosService.findAllByUser(req.user.userId);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtreli görevleri getir' })
  @ApiResponse({ status: 200, description: 'Başarıyla filtreli görevler listelendi' })
  filterTodos(@Req() req: any, @Query() query: any) {
    return this.todosService.findFilteredTodos(req.user.userId, query);
  }

  @Post()
  @ApiOperation({ summary: 'Yeni görev oluştur' })
  @ApiResponse({ status: 201, description: 'Görev başarıyla oluşturuldu' })
  create(@Req() req: any, @Body() body: CreateTodoDto) {
    return this.todosService.createForUser({ id: req.user.userId } as User, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Görevi tamamlandı olarak işaretle' })
  @ApiResponse({ status: 200, description: 'Görev tamamlandı olarak işaretlendi' })
  done(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.todosService.markDone(req.user.userId, id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Görev güncelle' })
  @ApiResponse({ status: 200, description: 'Görev başarıyla güncellendi' })
  updateTodo(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todosService.updateTodo(req.user.userId, id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Görev sil' })
  @ApiResponse({ status: 200, description: 'Görev başarıyla silindi' })
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(req.user.userId, id);
  }
}