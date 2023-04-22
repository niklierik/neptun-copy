import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsUUID } from "class-validator";
import { DayOfWeek, Semester } from "../entities/course.entity";

export class CreateCourseDto {
  @IsUUID()
  subjectID: string;
  @IsNumber()
  @Type(() => Number)
  year: number;
  @IsEnum(DayOfWeek)
  @Type(() => Number)
  day: DayOfWeek;
  @IsEnum(Semester)
  @Type(() => Number)
  semester: Semester;
  @IsUUID()
  roomID: string;
  @IsNumber()
  start: number;
}
