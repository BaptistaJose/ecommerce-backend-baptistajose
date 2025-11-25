import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(page: number, limit: number) {
    return await this.usersRepository.getUsers(page, limit);
  }

  async getUserById(id: string) {
    if(!id){
      throw new BadRequestException('El id es obligatorio');
    }
    return await this.usersRepository.getUserById(id);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }

  async updateUser(id: string, user: Partial<User>) {
    return await this.usersRepository.updateUser(id, user);
  }

  async createUser(user: Partial<User>) {
    const { email } = user;
    if (!email) {
      throw new BadRequestException('El email es obligatorio');
    }
    const userExists = await this.usersRepository.getUserByEmail(email);
    if (userExists) {
      throw new BadRequestException('El usuario ya existe');
    }
    return await this.usersRepository.createUser(user);
  }
}
