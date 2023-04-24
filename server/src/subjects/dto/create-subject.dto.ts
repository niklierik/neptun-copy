import { Type } from "class-transformer";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { SubjectType } from "../entities/subject-type.enum";

export class CreateSubjectDto {
  @IsString()
  displayName: string;
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  credit: number;
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(3)
  hoursAWeek: number;
  @IsNumber()
  @Type(() => Number)
  type: SubjectType;
}
