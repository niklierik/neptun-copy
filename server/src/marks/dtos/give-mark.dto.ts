import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class GiveMarkDto {
  @Type(() => Number)
  @IsNumber()
  mark: number;
  @IsString()
  target: string;
  @IsUUID()
  course: string;
}
