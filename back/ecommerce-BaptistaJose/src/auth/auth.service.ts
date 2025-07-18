import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login( credentials: LoginAuthDto){
      const user = await this.userService.getUserByEmail(credentials.email);
      if(user &&  user.password === credentials.password) {
  
          return { message: 'Login successful', user };
      } 

     throw new HttpException({ message: 'Invalid credentials' }, HttpStatus.UNAUTHORIZED);
  }
}
