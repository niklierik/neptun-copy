import { Controller, Get, Param, UseGuards } from "@nestjs/common";
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

  @Get("/:id")
  async get(@Param("id") id: string) {
    return this.subjectsService.get(id);
  }
}
