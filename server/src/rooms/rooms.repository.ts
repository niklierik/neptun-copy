import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Room } from "./room.entity";

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }

  async findById(id: string) {
    const res = await this.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  async findByName(name: string) {
    const res = await this.findOne({
      where: {
        name,
      },
    });
    return res;
  }
}
