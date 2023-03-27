import { Controller, Get } from "@nestjs/common";
import { ForumsService } from "./forums.service";

@Controller("forums")
export class ForumsController {
  constructor(private readonly forumService: ForumsService) {}

  @Get("courses")
  async list() {
    return this.forumService.list();
  }

  @Get("subjects")
  async listCommon() {
    return this.forumService.listCommon();
  }
}
