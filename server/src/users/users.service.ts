import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcrypt";
import { cfg } from "src/config/config";
import {
  invalidLoginData,
  passwordsMustMatch,
  pwdReqMessage,
} from "src/messages/messages";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { FinishRegistrationDto } from "./dtos/finish-registration.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { SearchUserDto } from "./dtos/search-user.dto";
import { User } from "./entities/users.entity";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtToken } from "./interfaces/jwt-token.interface";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<JwtToken> {
    Logger.log(`User logging in: ${email}...`);
    const storedPasswd = await this.usersRepository.getUserPassword(email);
    const login = await compare(password, storedPasswd ?? "");
    if (!login) {
      throw new UnauthorizedException(invalidLoginData);
    }
    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    Logger.log(`User logged in: ${email}.`);
    return { accessToken };
  }

  async register(registerDto: RegisterUserDto) {
    Logger.log(`User creating: ${registerDto.email}...`);
    const res = await this.usersRepository.createUser(registerDto);
    Logger.log(`User created: ${registerDto.email}.`);
    return res;
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
    return await this.usersRepository.setPassword(
      user,
      await this.hashPwd(newPassword),
    );
  }

  async finishRegister(
    { newPassword, newPasswordAgain }: FinishRegistrationDto,
    token: string,
  ): Promise<void> {
    if (newPassword !== newPasswordAgain) {
      throw new PreconditionFailedException(passwordsMustMatch);
    }
    const hash = await this.hashPwd(newPassword);
    const res = await this.usersRepository.setPasswordByToken(token, hash);
    if (!res) {
      throw new UnauthorizedException("Ez a validációs token nem megfelelő!");
    }
  }

  async getUser(email: string) {
    const res = await this.usersRepository.findUser(email);
    if (res == null) {
      throw new NotFoundException("Felhasználó nem található.");
    }
    return res;
  }

  async deleteUserByEmail(email: string, user: User) {
    if (!user.isAdmin && user.email !== email) {
      throw new ForbiddenException(
        "Csak adminok vagy a fiók tulajdonosa törölheti a fiókot.",
      );
    }
    return await this.usersRepository.deleteUserByEmail(email);
  }

  async hashPwd(pwd: string) {
    const salt = await genSalt(cfg().saltingRounds);
    const hashedPwd = await hash(pwd, salt);
    return hashedPwd;
  }

  async requestToken(email: string) {
    await this.usersRepository.requestToken(email);
  }

  async search(search: SearchUserDto) {
    const res = this.usersRepository.search(search);
    if (res == null) {
      throw new NotFoundException("Felhasználó nem található.");
    }
    return res;
  }

  /**
   * Validates whether the password has at least on upper-, one lowercase letter and one digit
   * @param pwd password to check
   * @throws BadRequest exception if the password is not okay
   */
  checkPasswordReqs(pwd: string): void {
    let lowercase = false;
    let uppercase = false;
    let digit = false;
    for (let i = 0; i < pwd.length; i++) {
      const ch = pwd.charAt(i);
      if (ch.toLowerCase() === ch) {
        lowercase = true;
        continue;
      }
      if (ch.toUpperCase() === ch) {
        uppercase = true;
        continue;
      }
      if (!Number.isNaN(ch)) {
        digit = true;
        continue;
      }
    }
    if (lowercase && uppercase && digit) {
      return;
    }
    throw new BadRequestException(pwdReqMessage);
  }
}
