import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./room.entity";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Room]), UsersModule],
  providers: [RoomsRepository, RoomsService],
  exports: [RoomsRepository],
  controllers: [RoomsController],
})
export class RoomsModule {}
