import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Room } from "./room.entity";

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
