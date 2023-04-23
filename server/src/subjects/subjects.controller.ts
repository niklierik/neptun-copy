import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { EditSubjectDto } from "./dto/edit-subject.dto";
import { SubjectsService } from "./subjects.service";

@Controller("subjects")
@UseGuards(AuthGuard())
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() create: CreateSubjectDto) {
    return this.subjectsService.create(create);
  }

  @Get()
  async list(@CurrentUser() user: User) {
    return this.subjectsService.list(user);
  }

  @Get("/:id")
  async get(@Param("id") id: string) {
    return this.subjectsService.get(id);
  }

  @Patch()
  async edit(@Body() edit: EditSubjectDto) {
    return this.subjectsService.edit(edit);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return this.subjectsService.delete(id);
  }
}
