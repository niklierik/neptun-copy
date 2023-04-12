import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ForumsService } from "./forums.service";

@Controller("forums")
@UseGuards(AuthGuard())
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
