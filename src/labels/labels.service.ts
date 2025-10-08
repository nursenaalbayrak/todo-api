import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private labelRepo: Repository<Label>,
  ) {}

  create(createLabelDto: CreateLabelDto) {
    const label = this.labelRepo.create(createLabelDto);
    return this.labelRepo.save(label);
  }

  findAll() {
    return this.labelRepo.find();
  }
}