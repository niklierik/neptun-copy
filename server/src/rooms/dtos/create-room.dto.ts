import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @Type(() => Number)
  @IsNumber()
  size: number;
  @IsString()
  name: string;
}
