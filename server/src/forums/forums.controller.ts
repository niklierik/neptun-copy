import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { ForumsService } from "./forums.service";

@Controller("forums")
@UseGuards(AuthGuard())
export class ForumsController {
  constructor(private readonly forumService: ForumsService) {}

  @Get("courses")
  async list(@CurrentUser() user: User) {
    return this.forumService.list(user);
  }

  @Get("subjects")
  async listCommon(@CurrentUser() user: User) {
    return this.forumService.listCommon(user);
  }

  @Get("courses/:id")
  async listById(@Param("id") id: string, @CurrentUser() user: User) {
    return this.forumService.list(user, id);
  }

  @Get("subjects/:id")
  async listCommonById(@Param("id") id: string, @CurrentUser() user: User) {
    return this.forumService.listCommon(user, id);
  }

  @Post("subjects/:id")
  async post(
    @Param("id") id: string,
    @Body("message") message: string,
    @CurrentUser() user: User,
  ) {
    return this.forumService.postCommon(user, id, message);
  }

  @Post("courses/:id")
  async postCommon(
    @Param("id") id: string,
    @Body("message") message: string,
    @CurrentUser() user: User,
  ) {
    return this.forumService.post(user, id, message);
  }
}
