import { Injectable, UnauthorizedException } from "@nestjs/common";
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

  async validate(payload?: JwtPayload): Promise<User> {
    if (payload == null) {
      throw new UnauthorizedException();
    }
    const { email } = payload;
    if (email == null) {
      throw new UnauthorizedException();
    }
    const user = await this.usersRepository.findUser(email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
