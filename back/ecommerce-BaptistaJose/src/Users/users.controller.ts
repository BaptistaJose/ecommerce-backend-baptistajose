import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./dto/User.dto";
import { UserResponseDto } from "./dto/response.user.dto";
import { AuthGuard } from "src/guard/auth/auth.guard";

@Controller('users')
export class UsersController{
    constructor(private readonly UserService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    async getUSers(@Query('page') page: number = 1, @Query('limit') limit: number = 5){
        const users = await  this.UserService.getUsers();
        return users.map(user => new UserResponseDto(user));
    }

    @Get(":id")
    async getUserById(@Param('id') id: string){
        const user = await this.UserService.getUserById(Number(id));

        if (!user) {
            throw new NotFoundException(`El usuario con el ID: ${id} no existe`);
        }
        
        return new UserResponseDto(user);
    }

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user:User){
        return this.UserService.createUser(user);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() user: Partial<User>){
        return this.UserService.updateUser(Number(id), user);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.UserService.deleteUser(Number(id));
    }


}