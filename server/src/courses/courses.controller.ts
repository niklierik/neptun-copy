import { Controller, UseGuards, Get, Patch, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CoursesService } from "./courses.service";

@Controller("courses")
@UseGuards(AuthGuard())
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list(@CurrentUser() user: User) {
    return this.coursesService.list(user);
  }

  @Patch("")
  async joinCourse(@CurrentUser() user: User, @Body("course") course: string) {
    return this.coursesService.joinCourse(user, course);
  }
}
