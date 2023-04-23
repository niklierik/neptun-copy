import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { GiveMarkDto } from "./dtos/give-mark.dto";
import { MarksService } from "./marks.service";

@Controller("marks")
@UseGuards(AuthGuard())
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  async giveMark(
    @CurrentUser() teacher: User,
    @Body() giveMarkDto: GiveMarkDto,
  ) {
    return this.marksService.giveMark(giveMarkDto, teacher);
  }

  @Get("/stats/course/:course")
  async statsOfCourse(@Param("course") course?: string) {
    return this.marksService.stats(course);
  }

  @Get("/stats/subject/:subject")
  async statsOfSubject(@Param("subject") subject?: string) {
    return this.marksService.stats(undefined, subject);
  }

  @Get("/stats")
  async stats() {
    return this.marksService.stats();
  }

  @Get("/:id")
  async getMarks(@Param("id") course: string, @CurrentUser() teacher: User) {
    return this.marksService.getMarks(course, teacher);
  }
}
