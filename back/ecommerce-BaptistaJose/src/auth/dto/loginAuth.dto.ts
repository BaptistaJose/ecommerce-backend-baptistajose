import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,{
      message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.'
  })
  password: string;

}