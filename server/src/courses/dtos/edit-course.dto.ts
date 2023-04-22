import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { DayOfWeek } from "../entities/course.entity";

export class EditCourseDto {
  @IsUUID()
  id: string;
  @IsEnum(DayOfWeek)
  @Type(() => Number)
  @IsOptional()
  day?: DayOfWeek;
  @IsUUID()
  @IsOptional()
  roomID?: string;
  @IsNumber()
  @IsOptional()
  start?: number;
}
