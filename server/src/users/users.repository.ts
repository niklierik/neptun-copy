import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { User } from "./entities/users.entity";
import { v4 } from "uuid";
import { serverError } from "src/messages/messages";
import { MajorsService } from "src/majors/majors.service";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    readonly ds: DataSource,
    private readonly majorsService: MajorsService,
  ) {
    super(User, ds.createEntityManager());
  }

  async getUserPassword(email: string): Promise<string | undefined> {
    try {
      const user = await this.findOne({
        where: {
          email,
          isValid: true,
        },
        select: {
          password: true,
        },
      });
      return user?.password ?? undefined; // may be null, enforcing undefined
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  /**
   *
   * @param token the token that is generated when the user was registered
   * @param hash the hashed password
   * @returns whether the query updated any row
   */
  async setPasswordByToken(token: string, hash: string): Promise<boolean> {
    try {
      const res = await this.update(
        {
          validationToken: token,
        },
        {
          password: hash,
        },
      );
      return (res?.affected ?? 0) > 0;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async setPassword(user: User, newPassword: string): Promise<boolean> {
    try {
      const res = await this.update(
        { email: user.email },
        { password: newPassword },
      );
      return (res?.affected ?? 0) > 0;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async findUser(email: string): Promise<User> {
    try {
      const res = await this.findOne({ where: { email } });
      return res;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async createUser(registerDto: RegisterUserDto) {
    try {
      const user = this.create();
      Object.assign(user, registerDto);
      user.password = "";
      user.isValid = false;
      user.validationToken = v4();
      user.major = {
        majorID: "none",
        displayName: "Nincs",
        users: [],
      };
      await this.insert(user);
      return user.validationToken;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }
}
