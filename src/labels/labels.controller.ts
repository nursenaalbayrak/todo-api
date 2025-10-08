import { Controller, Get, Post, Body } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(@Body() dto: CreateLabelDto) {
    return this.labelsService.create(dto);
  }

  @Get()
  findAll() {
    return this.labelsService.findAll();
  }
}