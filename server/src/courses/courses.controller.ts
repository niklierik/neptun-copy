import { Controller, Get } from "@nestjs/common";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list() {
    return this.coursesService.list();
  }
}
