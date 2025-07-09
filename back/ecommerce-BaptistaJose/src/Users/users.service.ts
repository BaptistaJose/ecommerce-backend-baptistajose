import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./dto/User.dto";

@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository) {}
    
    getUsers(){
        return this.usersRepository.getUsers();
    }
    
    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }
    
    createUser (user: User): Promise<User>{
        return this.usersRepository.createUser(user)
    }
    
    updateUser(id: number, user: Partial<User>) {
        return this.usersRepository.updateUser(id,user);
    }
    
    deleteUser(id: number) {
        return this.usersRepository.deleteUser(id)
    }

    getUserByEmail(email: string) {
        return this.usersRepository.getUserByEmail(email);
    }
}