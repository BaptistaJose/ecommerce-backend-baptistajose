import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(3, 15)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;
}
