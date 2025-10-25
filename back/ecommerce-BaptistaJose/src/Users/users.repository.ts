import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const usersLimit = await this.userRepository.find();
    return usersLimit.slice(start, end);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user)
      throw new NotFoundException(`El usuario con el id: ${id} no existe`);
    const { password, ...userNotPassword } = user;

    return userNotPassword;
  }

  async createUser(user: Partial<User>): Promise<string> {
    const userCreate = await this.userRepository.create(user);
    const userSave = await this.userRepository.save(userCreate);
    return userSave.id;
  }

  async updateUser(id: string, user: Partial<User>) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound)
      throw new NotFoundException(`El usuario con el id: ${id} no existe`);
    await this.userRepository.update(id, user);
    return id;
  }

  async deleteUser(id: string) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound)
      throw new NotFoundException(`El usuario con el id: ${id} no existe`);
    await this.userRepository.remove(userFound);
    return id;
  }

  async getUserByEmail(email: string) {
    const userFound = await this.userRepository.findOneBy({ email });
    return userFound;
  }
}
