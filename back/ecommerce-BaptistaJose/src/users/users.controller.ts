import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserResponse } from './Dto/user.response';
import type { Request } from 'express';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesEnum } from '../auth/enums/roles.enum';
import { UserUpdateDto } from './Dto/userUpdate.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponse,
    isArray: true,
  })
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

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponse
  })
  @Get(':id')
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getUserById(id);
    return new UserResponse(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponse
  })
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() user: UserUpdateDto) {
    return this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
