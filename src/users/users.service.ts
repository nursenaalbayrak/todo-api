import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Delete } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UnauthorizedException } from '@nestjs/common';
import { SetMetadata,UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...rest,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new ConflictException('Bu e-posta zaten kayıtlı');
      }
      throw err;
    }
  }

  async findAll (){
  return this.usersRepository.find();
}

  async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({
    where: { email },
    select: ['id', 'email', 'password', 'role'], // ← role alanını buraya ekle
  });
}

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user){
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
   await this.usersRepository.remove(user);
    return { message: 'Kullanıcı başarıyla silindi' };
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

    // Şifre varsa hashle
    if (body.password) {
      const salt = await bcrypt.genSalt();
      body.password = await bcrypt.hash(body.password, salt);
    }

    Object.assign(user, body);
    return this.usersRepository.save(user);
  }

async changePassword(id: number, dto: ChangePasswordDto) {
const user = await this.findById(id);



const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
if (!isMatch) {
  throw new UnauthorizedException('Mevcut şifre yanlış');
}

const salt = await bcrypt.genSalt();
user.password = await bcrypt.hash(dto.newPassword, salt);

await this.usersRepository.save(user);
return { message: 'Şifre başarıyla değiştirildi' };
}
}