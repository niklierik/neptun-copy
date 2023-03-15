CREATE TABLE "education_chart" (
  "id" varchar2(36),
  "recommendedSemester" number NOT NULL,
  "requirementType" number NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  "majorId" varchar2(255),
  CONSTRAINT "PK_education_chart_id" PRIMARY KEY ("id")
);
ALTER TABLE "education-chart" ADD CONSTRAINT "FK_education_chart_major" FOREIGN KEY ("majorId") REFERENCES "majors" ("majorID");
ALTER TABLE "education-chart" ADD CONSTRAINT "FK_education_chart_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
