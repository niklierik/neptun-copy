import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID, Max, Min } from "class-validator";

export class EditSubjectDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  credit?: number;
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(3)
  hoursAWeek?: number;
}
