import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CreateRoomDto } from "./dtos/create-room.dto";
import { EditRoomDto } from "./dtos/edit-room.dto";
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

  @Patch()
  async edit(@Body() edit: EditRoomDto) {
    return this.roomsService.edit(edit);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return this.roomsService.delete(id);
  }
}
