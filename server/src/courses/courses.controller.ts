import { Controller, UseGuards, Get, Query } from "@nestjs/common";
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

  /*@Get("/:user")
  async getCourses(@Param("user") user: string) {
    return this.coursesService.getCourses(user);
  }*/

  @Get()
  async getCourses(@Query("subject") subject: string) {
    return this.coursesService.getCoursesOf(subject);
  }
}
