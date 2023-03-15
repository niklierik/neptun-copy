CREATE TABLE "forum" (
  "id" varchar2(36),
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "sender" varchar2(255),
  "courseId" varchar2(36),
  CONSTRAINT "PK_forum_id" PRIMARY KEY ("id")
);
ALTER TABLE "forum" ADD CONSTRAINT "FK_forum_course" FOREIGN KEY ("courseId") REFERENCES "courses" ("id");
ALTER TABLE "forum" ADD CONSTRAINT "FK_forum_sender" FOREIGN KEY ("sender") REFERENCES "users" ("email");
