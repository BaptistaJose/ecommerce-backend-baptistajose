import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { singUpDto } from './dto/singUp.dto';
import { AuthResponseDto } from './dto/responseAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() credentials: LoginAuthDto) {
    return this.authService.login(credentials);
  }

  @Post('signup')
  async register(@Body() credentials: singUpDto) {
   const user =  await this.authService.register(credentials);
    return new AuthResponseDto(user)  }
}
