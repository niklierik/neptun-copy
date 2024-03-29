CREATE TABLE "exams_examinees_users" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "exam" varchar2(36) NOT NULL,
  CONSTRAINT "PK_users_exams" PRIMARY KEY ("id")
);

ALTER TABLE "exams_examinees_users" ADD CONSTRAINT "FK_users_exams_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "exams_examinees_users" ADD CONSTRAINT "FK_users_exams_exam" FOREIGN KEY ("exam") REFERENCES "exams" ("id");
