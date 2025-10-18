import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  async authSignin(@Body() credential: any) {
    const { email, password } = credential;
    return await this.authService.authSignin(email, password);
  }
}
