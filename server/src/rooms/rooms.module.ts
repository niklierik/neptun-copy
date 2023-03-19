import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./room.entity";
import { RoomsRepository } from "./rooms.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  exports: [RoomsRepository],
})
export class RoomsModule {}
