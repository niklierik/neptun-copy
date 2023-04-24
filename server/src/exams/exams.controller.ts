import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
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
  async list(
    @CurrentUser() user: User,
    @Query("includeFiltered") includeFiltered?: string,
  ) {
    return this.examsService.list(user, includeFiltered === "true");
  }

  @Get("/:examID")
  async getOf(@Param("examID") id: string) {
    return this.examsService.getOf(id);
  }

  @Post()
  async createExam(@CurrentUser() user: User, @Body() create: CreateExamDto) {
    return this.examsService.create(user, create);
  }

  @Patch("/:exam")
  async joinExam(@CurrentUser() user: User, @Param("exam") exam: string) {
    return this.examsService.joinExam(user, exam);
  }
  @Get("/:exam")
  async get(@Param("exam") id: string) {
    return this.examsService.get(id);
  }

  @Delete("/leave/:exam")
  async leave(@Param("exam") id: string, @CurrentUser() user: User) {
    return this.examsService.leave(id, user);
  }

  @Delete("exam")
  async delete(@Param("exam") id: string, @CurrentUser() user: User) {
    return this.examsService.delete(id, user);
  }
}
