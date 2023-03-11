import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsString()
  address: string;

  @IsString()
  forename: string;

  @IsString()
  familyname: string;

  @IsBoolean()
  @Type(() => Boolean)
  isAdmin: boolean;
}
