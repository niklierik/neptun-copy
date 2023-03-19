import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { serverError } from "src/messages/messages";
import { throwIfUniqueConstraint } from "src/utils/errors";
import { DataSource, Repository } from "typeorm";
import { CreateMajorDto } from "./dto/create-major.dto";
import { Major } from "./entities/majors.entity";

@Injectable()
export class MajorsRepository extends Repository<Major> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }

  async createMajor(data: CreateMajorDto) {
    try {
      const major = this.create();
      Object.assign(major, data);
      await this.insert(major);
      return major;
    } catch (err: any) {
      throwIfUniqueConstraint(
        err,
        `Szak a(z) ${data.majorID} azonosítóval már létezik.`,
      );
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }

  async findById(majorID: string, includeUsers: boolean) {
    try {
      if (!includeUsers) {
        return await this.findOne({
          where: {
            majorID,
          },
          loadEagerRelations: false,
        });
      }
      const major = await this.createQueryBuilder("m")
        .select()
        .where("m.majorID = :majorID", { majorID })
        .leftJoinAndSelect("m.users", "u")
        .getOne();
      return major;
    } catch (err: any) {
      Logger.error(err);
      throw new InternalServerErrorException(serverError);
    }
  }
}
