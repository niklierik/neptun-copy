CREATE TABLE "marks" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "subject" varchar2(36) NOT NULL,
  CONSTRAINT "PK_users_exams" PRIMARY KEY ("id")
);

ALTER TABLE "marks" ADD CONSTRAINT "FK_marks_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "marks" ADD CONSTRAINT "FK_marks_exam" FOREIGN KEY ("subject") REFERENCES "subjects" ("id");
