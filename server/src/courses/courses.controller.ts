import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  Query,
  Param,
  Post,
  Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { EditCourseDto } from "./dtos/edit-course.dto";

@Controller("courses")
@UseGuards(AuthGuard())
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() create: CreateCourseDto, @CurrentUser() user: User) {
    return this.coursesService.create(create, user);
  }

  @Get("/:id")
  async find(@Param("id") id: string | undefined, @CurrentUser() user: User) {
    return this.coursesService.list(user, id);
  }

  @Get()
  async list(@Query("id") id: string | undefined, @CurrentUser() user: User) {
    return this.coursesService.list(user, id);
  }

  @Patch("/edit")
  async editCourse(@CurrentUser() user: User, @Body() course: EditCourseDto) {
    return this.coursesService.editCourse(user, course);
  }

  @Patch()
  async joinCourse(@CurrentUser() user: User, @Body("course") course: string) {
    return this.coursesService.joinCourse(user, course);
  }

  @Delete("/leave/:id")
  async removeUser(@CurrentUser() user: User, @Param("id") id: string) {
    return this.coursesService.leave(user, id);
  }

  @Delete("/:id")
  async delete(@CurrentUser() user: User, @Param("id") id: string) {
    return this.coursesService.delete(id, user);
  }
}
