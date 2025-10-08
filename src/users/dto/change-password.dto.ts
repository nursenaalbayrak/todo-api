import {  IsNotEmpty, IsString } from "class-validator";
import {Type} from "class-transformer";

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
  
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}