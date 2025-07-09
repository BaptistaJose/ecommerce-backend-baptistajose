import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./dto/User.dto";

@Injectable()
export class UsersRepository{
    private users: User[] = [
        { id: 1, name: "John Doe", email: "jhon@example.com", password:"password123", address: "123 Main St" , phone: "123-456-7890", country: "USA", city: "New York" },
        { id: 2, name: "Jane Doe", email: "jane@example.com", password:"password123", address: "456 Elm St", phone: "987-654-3210", country: "USA", city: "Los Angeles" },
        { id: 3, name: "Alice Smith", email: "alice@example.com", password:"password123", address: "789 Oak St", phone: "555-555-5555", country: "USA", city: "Chicago" },
    ];
    
    async getUsers(){
        return this.users;
    }
    
    async getUserByEmail(email: string) {
        const user = this.users.find(user => user.email === email);
        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }
        return user;
    
    }
    
    async getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }
    
    async createUser(user: User ): Promise<User>{
        const newId = this.users.length > 0
        ? Math.max(...this.users.map(u => u.id)) + 1
        : 1;
        
        user.id = newId;
        this.users.push(user)
        return user;
    }
    
    async updateUser(id: number, userUpdate: Partial<User>): Promise<User> {
        
        const index = this.users.findIndex(user => user.id === id);
        
        if(index === -1){
            throw new NotFoundException("El usuario no existe")
        }
        
        this.users[index] = { ...this.users[index], ...userUpdate };
        
        return this.users[index]
    }
    
    async deleteUser(id: number): Promise<number> {
        
        const index = this.users.findIndex(user => user.id === id)
        
        if(index === -1){
            throw new NotFoundException("El usuario no existe")
        }
        
        this.users.splice(index,1);
        
        return id;
    }

}