import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterUserDto): Promise<void> {
    return await this.usersService.register(registerDto);
  }

  @Post("login")
  async get(@Body() loginDto: LoginUserDto): Promise<void> {
    return await this.usersService.login(loginDto);
  }
}
