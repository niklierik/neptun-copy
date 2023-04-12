import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
@UseGuards(AuthGuard())
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async list() {
    return this.roomsService.list();
  }
}
