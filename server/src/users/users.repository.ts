import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/users.entity";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /*
  SELECT password FROM users WHERE users.email = :email LIMIT 1;
  */
  async getUserPassword(email: string): Promise<string> {
    const user = await this.findOne({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });
    return user.password;
  }
}
