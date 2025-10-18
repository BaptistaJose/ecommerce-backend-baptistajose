import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthService{
    constructor(private readonly userRepository: UsersRepository){}

    async authSignin(email:string, password:string){
        if(!email || !password) return `Faltan las credenciales`;

        const userFound = await this.userRepository.getUserByEmail(email);
        if(!userFound) `El usuario con el email: ${email} no existe`;

        if(userFound?.email !== email || userFound.password !== password) return "Email o password incorrectos";

        return userFound;
    }
}