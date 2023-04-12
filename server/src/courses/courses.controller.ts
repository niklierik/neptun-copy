import { Controller, Get, Param } from "@nestjs/common";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list() {
    return this.coursesService.list();
  }

  @Get("/:user")
  async getCourses(@Param("user") user: string) {
    return this.coursesService.getCourses(user);
  }
}
