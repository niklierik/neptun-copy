import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class EditRoomDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size?: number;
  @IsUUID()
  id: string;
}
