import { IsString, Length } from "class-validator";
import { pwdLenMessage } from "src/messages/messages";

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(8, 40, { message: pwdLenMessage })
  newPassword: string;

  @IsString()
  newPasswordAgain: string;
}
