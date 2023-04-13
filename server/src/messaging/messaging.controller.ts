import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { MessagingService } from "./messaging.service";

@Controller("messaging")
@UseGuards(AuthGuard())
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  async list(
    @CurrentUser() user: User,
    @Query("u1") u1?: string,
    @Query("u2") u2?: string,
  ) {
    return this.messagingService.list(user, u1, u2);
  }
}
