import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../entities/users.entity";

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
