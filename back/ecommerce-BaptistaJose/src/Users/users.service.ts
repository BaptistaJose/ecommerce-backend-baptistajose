import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./enitities/users.entity";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  createUser(user: Partial<User>) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, userUpdate: Partial<User>) {
    return this.usersRepository.updateUser(id, userUpdate);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
