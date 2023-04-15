import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { NewsService } from "./news.service";

@Controller("news")
@UseGuards(AuthGuard())
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get("courses")
  async list(@CurrentUser() user: User) {
    return this.newsService.list(user);
  }

  @Get("subjects")
  async listCommon(@CurrentUser() user: User) {
    return this.newsService.listCommon(user);
  }

  @Get("courses/:id")
  async listById(@Param("id") id: string, @CurrentUser() user: User) {
    return this.newsService.list(user, id);
  }

  @Get("subjects/:id")
  async listCommonById(@Param("id") id: string, @CurrentUser() user: User) {
    return this.newsService.listCommon(user, id);
  }

  @Post("subjects/:id")
  async post(
    @Param("id") id: string,
    @Body("message") message: string,
    @CurrentUser() user: User,
  ) {
    return this.newsService.post(user, id, message);
  }

  @Post("courses/:id")
  async postCommon(
    @Param("id") id: string,
    @Body("message") message: string,
    @CurrentUser() user: User,
  ) {
    return this.newsService.postCommon(user, id, message);
  }
}
