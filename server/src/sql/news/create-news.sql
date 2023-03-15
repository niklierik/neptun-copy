CREATE TABLE "news" (
  "id" varchar2(36),
  "content" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "courseId" varchar2(36),
  CONSTRAINT "PK_news_id" PRIMARY KEY ("id")
);
ALTER TABLE "news" ADD CONSTRAINT "FK_new_course" FOREIGN KEY ("courseId") REFERENCES "courses" ("id");
