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
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    const users = await this.usersService.getUsers(validPage, validLimit);
    return users.map((user) => new UserResponse(user));
  }

  @Get(':id')
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard)
  async getUserById(@Req() request: Request) {
    const { id } = request.params;
    const user = await this.usersService.getUserById(id);
    return user;
  }

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
