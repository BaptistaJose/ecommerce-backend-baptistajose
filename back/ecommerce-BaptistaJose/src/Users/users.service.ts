import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./enitities/users.entity";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async getUserById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async createUser(user: Partial<User>) {
    return await this.usersRepository.createUser(user);
  }

  async updateUser(id: string, userUpdate: Partial<User>) {
    return await this.usersRepository.updateUser(id, userUpdate);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }
}
