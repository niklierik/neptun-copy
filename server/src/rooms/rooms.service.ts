import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { CreateRoomDto } from "./dtos/create-room.dto";
import { RoomsRepository } from "./rooms.repository";

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    return this.roomsRepository.save(
      this.roomsRepository.create({
        name: createRoomDto.name,
        size: createRoomDto.size,
      }),
    );
  }

  async list() {
    return this.roomsRepository.find({
      loadEagerRelations: false,
      order: {
        name: "ASC",
      },
    });
  }
}
