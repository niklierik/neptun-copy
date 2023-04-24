CREATE TABLE "courses_students_users" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "course" varchar2(36) NOT NULL,
  CONSTRAINT "PK_users_course_student" PRIMARY KEY ("id")
);

ALTER TABLE "courses_students_users" ADD CONSTRAINT "FK_users_course_student_user" FOREIGN KEY ("users") REFERENCES "users" ("email");
ALTER TABLE "courses_students_users" ADD CONSTRAINT "FK_users_course_student_course" FOREIGN KEY ("courses") REFERENCES "course" ("id");
