import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserResponse } from './Dto/user.response';
import type { Request } from 'express';
import { CreateUserDto } from '../auth/dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    const users = await this.usersService.getUsers(validPage, validLimit);
    return users.map((user) => new UserResponse(user));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Req() request: Request) {
    const { id } = request.params;
    const user = await this.usersService.getUserById(id);
    return user;
  }

/*  @Post()
  createUSer(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }*/

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
