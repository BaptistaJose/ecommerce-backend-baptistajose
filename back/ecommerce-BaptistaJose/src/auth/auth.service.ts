import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from './dto/createUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authSignin(email: string, password: string) {
    const userFound = await this.userRepository.getUserByEmail(email);
    if (!userFound)
      throw new BadRequestException('Email o password incorrectos');

    const passwordVerify = await bcrypt.compare(password, userFound.password);

    if (!passwordVerify)
      throw new BadRequestException('Email o password incorrectos');

    const userPayload = {
      sub: userFound.id,
      id: userFound.id,
      email: userFound.email,
      isAdmin: userFound.isAdmin
    };

    const token = await this.jwtService.signAsync(userPayload);
    return { message: 'Usuario logueado con exito!!', token: token };
  }

  async authSignUp(user: CreateUserDto) {
    if (user.confirmPassword !== user.password) {
      throw new BadRequestException('Las contraseñas deben ser iguales');
    }

    const userFound = await this.userRepository.getUserByEmail(user.email);
    if (userFound)
      throw new BadRequestException('El mail ingresado ya se encuentra en uso');

    const hashPassword = await bcrypt.hash(user.password, 10);

    const { confirmPassword, ...userData } = user;

    await this.userRepository.createUser({
      ...userData,
      password: hashPassword,
    });
    const { password, ...userNotPassword } = userData;
    return userNotPassword;
  }
}
