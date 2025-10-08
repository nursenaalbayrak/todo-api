import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@ApiTags('Auth') // Swagger'da "Auth" başlığı altında gözükecek
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı giriş yapar' })
  @ApiResponse({
    status: 201,
    description: 'Başarılı giriş, access token döner.',
    schema: {
      example: { access_token: 'jwt-token-buraya-gelir' },
    },
  })
  @ApiResponse({ status: 401, description: 'Geçersiz kimlik bilgileri' })
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}