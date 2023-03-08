import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async login(email: string, password: string) {}

  async register(registerDto: RegisterDto) {}
}
