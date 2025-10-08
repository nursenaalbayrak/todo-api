import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Req,
  Delete,
  Param,
  ParseIntPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import { Role } from './role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı oluştur' })
  @ApiResponse({ status: 201, description: 'Kullanıcı başarıyla oluşturuldu' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt,
    };
  }

  @Patch(':id')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiOperation({ summary: 'Kullanıcı bilgilerini güncelle' })
@ApiResponse({ status: 200, description: 'Kullanıcı başarıyla güncellendi' })
async updateUser(
  @Req() req,
  @Param('id', ParseIntPipe) id: number,
  @Body() body: UpdateUserDto,
) {
 
  if (req.user.userId !== id && req.user.role !== 'admin') {
  throw new UnauthorizedException('Sadece kendi hesabınızı veya adminsiniz başkalarını güncelleyebilirsiniz.');
}

  return this.usersService.updateUser(id, body);
}

  @Patch('change-password')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Şifre değiştir' })
  @ApiResponse({ status: 200, description: 'Şifre başarıyla değiştirildi' })
  async changePassword(
    @Req() req: any,
    @Body() body: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(req.user.userId, body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcının kendi profil bilgisi' })
  @ApiResponse({ status: 200, description: 'Kullanıcı profili döndürüldü' })
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

 @Delete(':id')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiOperation({ summary: 'Kullanıcı sil' })
@ApiResponse({ status: 200, description: 'Kullanıcı başarıyla silindi' })
async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
  if (req.user.userId !== id && req.user.role !== 'Admin') {
    throw new UnauthorizedException('Sadece kendi hesabınızı veya adminseniz başkalarını silebilirsiniz.');
  }

  return this.usersService.deleteUser(id);
}

  @Get('all-users')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tüm kullanıcıları getir (Sadece admin)' })
  @ApiResponse({ status: 200, description: 'Tüm kullanıcılar listelendi' })
  async getAllUsers() {
    return this.usersService.findAll();
  }
}