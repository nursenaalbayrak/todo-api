import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  UsersModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'gizliAnahtar', 
    signOptions: { expiresIn: '1h' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}