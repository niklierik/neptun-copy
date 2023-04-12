import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CoursesService } from "./courses.service";

@Controller("courses")
@UseGuards(AuthGuard())
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list() {
    return this.coursesService.list();
  }
}
