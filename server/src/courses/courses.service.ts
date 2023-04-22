import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { CoursesRepository, defaultConstOrder } from "./courses.repository";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { EditCourseDto } from "./dtos/edit-course.dto";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(create: CreateCourseDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    return this.coursesRepository.save(
      this.coursesRepository.create({
        dayOfWeek: create.day,
        room: {
          id: create.roomID,
        },
        subject: {
          id: create.subjectID,
        },
        year: create.year,
        startAt: create.start,
        semester: create.semester,
      }),
    );
  }

  async editCourse(user: User, dto: EditCourseDto) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    const course = await this.coursesRepository.findOne({
      loadEagerRelations: false,
      relations: {
        students: true,
        teachers: true,
        forum: true,
        news: true,
        room: true,
        subject: true,
      },
      where: {
        id: dto.id,
      },
    });
    if (dto.day) {
      course.dayOfWeek = dto.day;
    }
    if (dto.roomID) {
      course.room.id = dto.roomID;
    }
    if (dto.start) {
      course.startAt = dto.start;
    }
    return this.coursesRepository.save(course);
  }

  async list(user: User, id?: string) {
    if (id) {
      const course = await this.coursesRepository.findOne({
        loadEagerRelations: false,
        relations: {
          students: true,
          teachers: true,
          forum: true,
          news: true,
          room: true,
          subject: true,
        },
        where: {
          id,
        },
      });
      if (course == null) {
        throw new NotFoundException();
      }
      return course;
    }
    if (!user.isAdmin && id == null) {
      return this.getCourses(user.email);
    }
    return this.coursesRepository.find({
      relations: {
        room: true,
        subject: true,
        teachers: true,
        forum: false,
        news: false,
        students: false,
      },
    });
  }

  async getCourses(user: string): Promise<Course[]> {
    if (user === "sysadmin") {
      return this.coursesRepository.find({
        order: defaultConstOrder,
      });
    }
    const courses = await this.coursesRepository.findFor(
      user,
      defaultConstOrder,
    );
    return courses;
  }

  async joinCourse(user: User, id: string) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
    });
    course.students.push(user);
    return this.coursesRepository.save(course);
  }

  async delete(id: string) {
    return this.coursesRepository.delete({ id });
  }
}
