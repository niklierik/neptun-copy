import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, IsNull, Repository } from "typeorm";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { User } from "./entities/users.entity";
import { v4 as uuid } from "uuid";
import { serverError } from "src/messages/messages";
import { throwIfUniqueConstraint } from "src/utils/errors";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    readonly ds: DataSource, // private readonly majorsService: MajorsService,
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
          validationToken: null,
        },
      );
      return (res?.affected ?? 0) > 0;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async requestToken(email: string) {
    try {
      const res = await this.update(
        {
          email,
          validationToken: IsNull(),
        },
        { validationToken: uuid() },
      );
      const affected = res?.affected ?? 0;
      if (affected <= 0) {
        throw new ForbiddenException(
          "Ezzel az email címmel már kértek jelszó helyreállítást.",
        );
      }
      return res;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async setPassword(user: User, newPassword: string): Promise<boolean> {
    try {
      const res = await this.update(
        { email: user.email },
        { password: newPassword, validationToken: null },
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
      const majorID = registerDto.majorID;
      delete registerDto.majorID; // utólag adjuk hozzá a user objecthez a majort
      const user = this.create(registerDto);
      user.password = null;
      user.isValid = false;
      user.validationToken = uuid();
      user.major = {
        majorID,
      } as any;
      await this.insert(user);
      return user.validationToken;
    } catch (err) {
      throwIfUniqueConstraint(
        err,
        `Ez az e-mail cím már foglalt: ${registerDto.email}.`,
      );
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async deleteUserByEmail(email: string) {
    try {
      const res = await this.delete({ email });
      if (res.affected === 0) {
        throw new NotFoundException();
      }
      return true;
    } catch (err) {
      // if no row was affected the above code throws NotFoundException, we need to continue that throw
      if (err instanceof NotFoundException) {
        throw err;
      }
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }
}
