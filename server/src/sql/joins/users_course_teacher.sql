CREATE TABLE "users_course_teacher" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "course" varchar2(36) NOT NULL,
  CONSTRAINT "PK_users_course_teacher" PRIMARY KEY ("id")
);

ALTER TABLE "users_course_teacher" ADD CONSTRAINT "FK_users_course_teacher_user" FOREIGN KEY ("users") REFERENCES "users" ("email");
ALTER TABLE "users_course_teacher" ADD CONSTRAINT "FK_users_course_teacher_course" FOREIGN KEY ("courses") REFERENCES "course" ("id");
