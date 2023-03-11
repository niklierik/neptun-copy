import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { serverError } from "src/messages/messages";
import { DataSource, Repository } from "typeorm";
import { Major } from "./entities/majors.entity";

@Injectable()
export class MajorsRepository extends Repository<Major> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }

  async createMajor(data: any) {
    try {
      const major = this.create();
      Object.assign(major, data);
      await this.insert(major);
      return major;
    } catch (err: any) {
      const message: string = err?.message ?? "";
      if (message.startsWith("ORA-00001")) {
        throw new ConflictException(
          `Szak a(z) ${data.majorID} azonosítóval már létezik.`,
        );
      }
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async findById(majorID: string, includeUsers: boolean) {
    try {
      const major = await this.findOne({
        where: { majorID },
        select: { users: includeUsers, displayName: true, majorID: true },
      });
      return major;
    } catch (err: any) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }
}
