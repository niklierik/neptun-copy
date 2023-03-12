CREATE TABLE "courses" (
  "id" varchar2(36),
  "start" interval day to second NOT NULL,
  "dayOfWeek" number NOT NULL,
  "subjectId" varchar2(36),
  "roomId" varchar2(36),
  CONSTRAINT "PK_courses_id" PRIMARY KEY ("id")
);
ALTER TABLE  "courses" ADD CONSTRAINT "FK_courses_subjectId" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
ALTER TABLE  "courses" ADD CONSTRAINT "FK_courses_roomId" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");
