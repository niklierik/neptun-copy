import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login({ email, password }: LoginUserDto) {
    const storedPasswd = this.usersRepository.getUserPassword(email);
  }

  async register(registerDto: RegisterUserDto) {}
}
