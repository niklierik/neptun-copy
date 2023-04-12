import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("exams")
@UseGuards(AuthGuard())
export class ExamsController {}
