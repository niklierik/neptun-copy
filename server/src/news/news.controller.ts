import { Controller, Get } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller("news")
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
