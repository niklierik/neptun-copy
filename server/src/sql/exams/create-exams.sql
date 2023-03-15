CREATE TABLE "exams" (
  "id" varchar2(36),
  "when" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  "roomId" varchar2(36),
  CONSTRAINT "PK_exams_id" PRIMARY KEY ("id")
);

ALTER TABLE "exams" ADD CONSTRAINT "FK_exams_room" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");
ALTER TABLE "exams" ADD CONSTRAINT "FK_exams_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
