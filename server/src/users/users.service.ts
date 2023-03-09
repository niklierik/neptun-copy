import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Injectable()
export class UsersService {
  async login(email: string, password: string) {}

  async register(registerDto: RegisterUserDto) {}
}
