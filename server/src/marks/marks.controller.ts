import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
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
  async giveMark(@CurrentUser() teacher: User, giveMarkDto: GiveMarkDto) {
    return this.marksService.giveMark(giveMarkDto, teacher);
  }

  @Get("/:id")
  async getMarks(@Param("id") course: string, @CurrentUser() teacher: User) {
    return this.marksService.getMarks(course, teacher);
  }
}
