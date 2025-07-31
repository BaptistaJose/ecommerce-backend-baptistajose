import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/response.user.dto";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { createUserDto } from "./dto/createUser.dto";
import { RolGuard } from "src/guard/rol-guard/rol/rol.guard";
import { Roles } from "src/decorators/role/role.decorator";
import { Role } from "./enum/role.enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolGuard)
  async getUsers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 5
  ) {
    const users = await this.usersService.getUsers();
    return users.map((user) => new UserResponseDto(user));
  }

  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  async getUserById(@Param("id", new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`El usuario con el ID: ${id} no existe`);
    }
    return new UserResponseDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: createUserDto) {
    return this.usersService.createUser(user);
  }

  @ApiBearerAuth()
  @Put("/:id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id", new ParseUUIDPipe()) id: string, @Body() user: createUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth()
  @Delete("/:id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}