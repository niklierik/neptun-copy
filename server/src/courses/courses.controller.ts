import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  Query,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CoursesService } from "./courses.service";

@Controller("courses")
@UseGuards(AuthGuard())
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get("/:id")
  async find(@Param("id") id: string | undefined, @CurrentUser() user: User) {
    return this.coursesService.list(user, id);
  }

  @Get()
  async list(@Query("id") id: string | undefined, @CurrentUser() user: User) {
    return this.coursesService.list(user, id);
  }

  @Patch()
  async joinCourse(@CurrentUser() user: User, @Body("course") course: string) {
    return this.coursesService.joinCourse(user, course);
  }
}
