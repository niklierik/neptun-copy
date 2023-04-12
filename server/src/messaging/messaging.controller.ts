import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessagingService } from "./messaging.service";

@Controller("messaging")
@UseGuards(AuthGuard())
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  async list() {
    return this.messagingService.list();
  }
}
