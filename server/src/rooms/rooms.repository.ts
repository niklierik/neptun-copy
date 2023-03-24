import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Room } from "./room.entity";

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(ds: DataSource) {
    super(Room, ds.createEntityManager());
  }

  async findById(id: string) {
    const res = await this.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  /**
   * Mostly used for seeding
   */
  async findByName(name: string) {
    const res = await this.findOne({
      where: {
        name,
      },
    });
    return res;
  }
}
