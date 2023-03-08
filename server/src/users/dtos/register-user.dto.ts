import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 40)
  // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$')
  password: string;

  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$')
  passwordAgain: string;
}
