import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy, ExtractJwt } from "passport-jwt";
import { cfg } from "src/config/config";
import { User } from "./entities/users.entity";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      secretOrKey: cfg().jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    return await this.usersRepository.findUser(email);
  }
}
