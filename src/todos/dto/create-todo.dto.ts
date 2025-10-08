import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Alışveriş yap', description: 'Görev başlığı' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Market alışverişi yap', description: 'Açıklama', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}