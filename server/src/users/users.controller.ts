import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
  Put,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "./decorators/current-user.decorator";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { FinishRegistrationDto } from "./dtos/finish-registration.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { SearchUserDto } from "./dtos/search-user.dto";
import { User } from "./entities/users.entity";
import { JwtToken } from "./interfaces/jwt-token.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @UseGuards(AuthGuard())
  async register(@Body() registerDto: RegisterUserDto) {
    return this.usersService.register(registerDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginUserDto): Promise<JwtToken> {
    return await this.usersService.login(loginDto);
  }

  @Patch("changePassword")
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() changePwd: ChangePasswordDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.usersService.changePwd(changePwd, user);
  }

  @Patch("changePwdByToken")
  async changePwdByToken(
    @Body() finish: FinishRegistrationDto,
    @Query("token") token: string,
  ) {
    return await this.usersService.finishRegister(finish, token);
  }

  @Get("/count")
  @UseGuards(AuthGuard())
  async count(@CurrentUser() user: User, @Query("mode") mode?: string) {
    return this.usersService.count(user, mode);
  }

  @Put("/forgot-password/:email")
  async forgotPassword(@Param("email") email: string) {
    return this.usersService.requestToken(email);
  }

  @Get("/:email")
  @UseGuards(AuthGuard())
  async findUser(@Param("email") email: string) {
    return await this.usersService.getUser(email);
  }

  @Get()
  @UseGuards(AuthGuard())
  async search(@Query() search: SearchUserDto) {
    return this.usersService.search(search);
  }

  @Delete()
  @UseGuards(AuthGuard())
  async deleteCurrentUser(@CurrentUser() user: User) {
    return await this.usersService.deleteUserByEmail(user.email, user);
  }

  @Delete("/:email")
  @UseGuards(AuthGuard())
  async deleteUser(@Param("email") email: string, @CurrentUser() user: User) {
    return await this.usersService.deleteUserByEmail(email, user);
  }

  @Put("/newToken/:email")
  async requestToken(@Param("email") email: string) {
    return await this.usersService.requestToken(email);
  }
}
