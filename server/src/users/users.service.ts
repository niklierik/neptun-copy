import {
  Injectable,
  Logger,
  PreconditionFailedException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcrypt";
import { cfg } from "src/config/config";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { FinishRegistrationDto } from "./dtos/finish-registration.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { User } from "./entities/users.entity";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtToken } from "./interfaces/jwt-token.interface";
import { UsersRepository } from "./users.repository";

const invalidLoginData = "Érvénytelen belépési adatok.";
const passwordsMustMatch = "A jelszavaknak egyezniük kell.";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<JwtToken> {
    Logger.log(`User logged in: ${email}`);
    const storedPasswd = await this.usersRepository.getUserPassword(email);
    const login = await compare(password, storedPasswd ?? "");
    if (!login) {
      throw new UnauthorizedException(invalidLoginData);
    }
    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async register(registerDto: RegisterUserDto) {
    Logger.log(`User created: ${registerDto.email}`);
    return await this.usersRepository.createUser(registerDto);
  }

  async changePwd(
    { oldPassword, newPassword, newPasswordAgain }: ChangePasswordDto,
    user: User,
  ): Promise<boolean> {
    const login = await compare(oldPassword, user.password);
    if (!login) {
      throw new UnauthorizedException(invalidLoginData);
    }
    if (newPassword !== newPasswordAgain) {
      throw new PreconditionFailedException(passwordsMustMatch);
    }
    return await this.usersRepository.setPassword(user, newPassword);
  }

  async finishRegister({
    newPassword,
    newPasswordAgain,
    token,
  }: FinishRegistrationDto): Promise<boolean> {
    if (newPassword !== newPasswordAgain) {
      throw new PreconditionFailedException(passwordsMustMatch);
    }
    const hash = await this.hashPwd(newPassword);
    return await this.usersRepository.setPasswordByToken(token, hash);
  }

  async hashPwd(pwd: string) {
    const salt = await genSalt(cfg().saltingRounds);
    const hashedPwd = await hash(pwd, salt);
    return hashedPwd;
  }
}
