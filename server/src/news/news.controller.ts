import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NewsService } from "./news.service";

@Controller("news")
@UseGuards(AuthGuard())
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get("courses")
  async list() {
    return this.newsService.list();
  }

  @Get("subjects")
  async listCommon() {
    return this.newsService.listCommon();
  }
}
