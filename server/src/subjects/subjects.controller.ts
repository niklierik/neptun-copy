import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SubjectsService } from "./subjects.service";

@Controller("subjects")
@UseGuards(AuthGuard())
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async list() {
    return this.subjectsService.list();
  }
}
