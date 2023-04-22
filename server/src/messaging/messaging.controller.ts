import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { MessagingService } from "./messaging.service";

@Controller("messaging")
@UseGuards(AuthGuard())
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post()
  async write(
    @CurrentUser() user: User,
    @Query("to") to?: string,
    @Body("message") msg?: string,
  ) {
    return this.messagingService.write(user, to, msg);
  }

  @Get()
  async list(
    @CurrentUser() user: User,
    @Query("u1") u1?: string,
    @Query("u2") u2?: string,
  ) {
    return this.messagingService.list(user, u1, u2);
  }
}
