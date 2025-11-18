import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../auth/dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  async authSignin(@Body() credential: LoginUserDto) {
    const { email, password } = credential;
    return await this.authService.authSignin(email, password);
  }

    @Post('signUp')
  async authSignUp(@Body() user:CreateUserDto) {
    return await this.authService.authSignUp(user);
  }
}
