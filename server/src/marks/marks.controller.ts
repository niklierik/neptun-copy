import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("marks")
@UseGuards(AuthGuard())
export class MarksController {}
