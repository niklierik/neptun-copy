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
import { SearchUserDto } from "./dtos/search-user.dto";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    readonly ds: DataSource, // private readonly majorsService: MajorsService,
  ) {
    super(User, ds.createEntityManager());
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
          isValid: true,
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

  async getUserPassword(email: string): Promise<string> {
    try {
      const res = await this.createQueryBuilder("u")
        .select("u.password")
        .where("u.email = :email", { email })
        .andWhere("u.isValid = 1")
        .getOne();
      return res.password;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async findUser(email: string): Promise<User> {
    try {
      const res = await this.createQueryBuilder("u")
        .where("u.email = :email", { email })
        .andWhere("u.isValid = 1")
        .getOne();
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

  async search({ email, major, limit, name, skip }: SearchUserDto) {
    let query = this.createQueryBuilder("u").where("u.isValid = 1");
    if (email) {
      query = query.andWhere("u.email LIKE :email", {
        email: `%${email}%`,
      });
    }
    if (name) {
      query = query.andWhere(
        "(((u.familyname || ' ' || u.forename) LIKE :name) OR ((u.forename || ' ' || u.familyname) LIKE :name))",
        {
          name: `%${name}%`,
        },
      );
    }
    if (major) {
      query = query.andWhere("u.majorMajorID = :major", { major });
    }
    if (limit) {
      query = query.limit(limit);
    }
    if (skip) {
      query = query.skip(skip);
    }
    return query.getMany();
  }
}
