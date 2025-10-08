import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      // Şifre doğruysa manuel olarak gerekli alanları döndür
      return {
        id: user.id,
        email: user.email,
        role: user.role, // Role EKLENDİ!
        username: user.username,
      };
    }

    return null;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Geçersiz giriş bilgileri');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role, 
    };

    console.log('TOKEN PAYLOAD:', payload); 

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}