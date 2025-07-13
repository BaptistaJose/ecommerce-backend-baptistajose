import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./enitities/users.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
 const user = await this.userRepository.findOne({
  where: { id },
  relations: ['orders'],
});  
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: string, userUpdate: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    Object.assign(user, userUpdate);
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.getUserById(id);
    await this.userRepository.delete(id);
    return user.id;
  }
}
