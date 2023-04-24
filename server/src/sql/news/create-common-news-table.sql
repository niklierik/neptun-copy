CREATE TABLE "common_news" (
  "id" varchar2(36),
  "content" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  CONSTRAINT "PK_common_news_id" PRIMARY KEY ("id")
);

ALTER TABLE "common_news" ADD CONSTRAINT "FK_common_news_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
