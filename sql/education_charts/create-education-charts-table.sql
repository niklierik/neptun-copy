CREATE TABLE "education_chart" (
  "id" varchar2(36),
  "recommendedSemester" number NOT NULL,
  "requirementType" number NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  "majorMajorID" varchar2(255), -- lib miatt ez a neve
  CONSTRAINT "PK_education_chart_id" PRIMARY KEY ("id")
);
ALTER TABLE "education_chart" ADD CONSTRAINT "FK_education_chart_major" FOREIGN KEY ("majorMajorID") REFERENCES "majors" ("majorID");
ALTER TABLE "education_chart" ADD CONSTRAINT "FK_education_chart_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
