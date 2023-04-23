import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { PreconditionFailedException } from "@nestjs/common/exceptions/precondition-failed.exception";
import { RoomsRepository } from "src/rooms/rooms.repository";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { User } from "src/users/entities/users.entity";
import { CoursesRepository, defaultConstOrder } from "./courses.repository";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { EditCourseDto } from "./dtos/edit-course.dto";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly roomsRepository: RoomsRepository,
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  async create(create: CreateCourseDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    const room = await this.roomsRepository.findOne({
      where: {
        id: create.roomID,
      },
      loadEagerRelations: false,
      relations: {
        courses: {
          subject: true,
        },
      },
    });
    const subject = await this.subjectsRepository.findOne({
      where: {
        id: create.subjectID,
      },
    });
    if (subject == null) {
      throw new BadRequestException("Tantárgy a megadott ID-val nem létezik.");
    }
    if (room == null) {
      throw new BadRequestException("Terem a megadott ID-val nem létezik.");
    }
    const other = room.courses.find((c) => {
      const start1 = c.startAt;
      const end1 = c.startAt + c.subject.hoursAWeek;
      const start2 = create.start;
      const end2 = create.start + subject.hoursAWeek;
      // https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-if-two-ranges-overlap
      return start1 <= end2 && end1 >= start2;
    });
    if (other) {
      throw new PreconditionFailedException(
        "A terem ebben az időpontban le van foglalva már: " +
          JSON.stringify(other) +
          ".",
      );
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
      loadEagerRelations: false,
      relations: {
        students: true,
        room: true,
      },
    });
    if (course == null) {
      throw new NotFoundException("Nincs ilyen kurzus.");
    }
    if (course.room.size <= course.students.length) {
      throw new PreconditionFailedException("A kurzus megtelt.");
    }
    course.students.push(user);
    return this.coursesRepository.save(course);
  }

  async leave(user: User, id: string) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
      loadEagerRelations: false,
      relations: {
        students: true,
        room: true,
      },
    });
    course.students = course.students.filter((u) => u.email !== user.email);
    return this.coursesRepository.save(course);
  }

  async delete(id: string, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    return this.coursesRepository.delete({ id });
  }
}
