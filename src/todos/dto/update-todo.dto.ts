import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Kitap oku', description: 'Görevin başlığı' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Her gün 30 sayfa kitap oku', description: 'Görevin açıklaması' })
  description?: string;
}