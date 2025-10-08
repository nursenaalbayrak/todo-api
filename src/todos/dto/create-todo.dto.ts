import { 
  IsNotEmpty, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsArray, 
  IsNumber 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  labelIds?: number[];
}