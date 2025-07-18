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

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 5
  ) {
    const users = await this.usersService.getUsers();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(":id")
  async getUserById(@Param("id", new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`El usuario con el ID: ${id} no existe`);
    }
    return new UserResponseDto(user);
  }

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: createUserDto) {
    return this.usersService.createUser(user);
  }

  @Put("/:id")
  updateUser(@Param("id", new ParseUUIDPipe()) id: string, @Body() user: createUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete("/:id")
  deleteUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}