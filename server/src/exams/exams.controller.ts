import { Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CreateExamDto } from "./dtos/create-exam.dto";
import { ExamsService } from "./exams.service";

@Controller("exams")
@UseGuards(AuthGuard())
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  async list(@CurrentUser() user: User) {
    return this.examsService.list(user);
  }

  @Post()
  async createExam(@CurrentUser() user: User, create: CreateExamDto) {
    return this.examsService.create(user, create);
  }

  @Patch("/:exam")
  async joinExam(@CurrentUser() user: User, @Param("exam") exam: string) {
    return this.examsService.joinExam(user, exam);
  }
}
