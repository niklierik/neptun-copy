CREATE TABLE "subjects" (
  "id" varchar2(36),
  "name" varchar2(256) NOT NULL,
  "credit" number(1,0) NOT NULL,
  "hoursAWeek" number(1,0) NOT NULL,
  "type" number(1, 0) NOT NULL,
  CONSTRAINT "PK_subjects_id" PRIMARY KEY ("id")
);
