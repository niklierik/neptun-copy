import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CreateRoomDto } from "./dtos/create-room.dto";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
@UseGuards(AuthGuard())
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @CurrentUser() user: User,
  ) {
    return this.roomsService.create(createRoomDto, user);
  }

  @Get()
  async list() {
    return this.roomsService.list();
  }
}
