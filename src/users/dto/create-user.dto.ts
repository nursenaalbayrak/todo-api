import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'nursena',
    description: 'Kullanıcının kullanıcı adı',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'nursena@example.com',
    description: 'Kullanıcının e-posta adresi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'sifre123',
    description: 'Kullanıcının şifresi (en az 6 karakter)',
    minLength: 6,
  })
  @MinLength(6)
  password: string;
}