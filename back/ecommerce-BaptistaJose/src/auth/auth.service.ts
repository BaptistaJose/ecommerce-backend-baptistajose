import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { UsersService } from 'src/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from 'src/Users/enitities/users.entity';
import { singUpDto } from './dto/singUp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}
  
  async login( credentials: LoginAuthDto){
    const user = await this.userService.getUserByEmail(credentials.email);
    if(!user) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
    } 
    
    const ispasswordvalid = await compare(credentials.password, user.password);

    if(!ispasswordvalid) {
      throw new HttpException({ message: 'Invalid credentials' }, HttpStatus.UNAUTHORIZED);
    }

    const token = await this.generateToken(user);  
    return token;
  }
 
  async register(credentials: singUpDto) {
    const existingUser = await this.userService.getUserByEmail(credentials.email);
    if (existingUser) {
      throw new HttpException({ message: 'Email already exists' }, HttpStatus.BAD_REQUEST);
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new HttpException({ message: 'Passwords do not match' }, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(credentials.password, 10);
    
    const newUser = await this.userService.createUser({
      ...credentials,
      password: hashedPassword,
    });
    return newUser
    
  }

   private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
