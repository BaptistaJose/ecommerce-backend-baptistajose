import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength,  } from "class-validator";

export class createUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;
    
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

    @IsString()    
    @MinLength(8)
    @MaxLength(80)
    address: string;

    @IsString()
    phone: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    country: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    city: string;
}

