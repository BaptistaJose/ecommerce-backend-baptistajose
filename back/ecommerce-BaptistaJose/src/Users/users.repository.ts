import { Injectable } from "@nestjs/common";
import { count } from "console";

@Injectable()
export class UsersRepository{
    private users = [
        {id: 1, name: 'José', email: 'jose@example.com', password: 'password123', address: '123 Main St', phone: '555-1234', country: 'USA', city: 'New York'},
        {id: 2, name: 'Maria', email: 'maria@example.com', password: 'password456', address: '456 Elm St', phone: '555-5678', country: 'USA', city: 'Los Angeles'},
        {id: 3, name: 'Carlos', email: 'carlos@example.com', password: 'password789', address: '789 Oak St', phone: '555-9012', country: 'USA', city: 'Chicago'}
    ]

    getUsers(){
        return this.users;
    }
}