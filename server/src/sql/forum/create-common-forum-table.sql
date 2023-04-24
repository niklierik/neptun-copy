CREATE TABLE "common_forum" (
  "id" varchar2(36) NOT NULL,
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "sender" varchar2(255),
  "subjectId" varchar2(36),
  CONSTRAINT "PK_common_forum_id" PRIMARY KEY ("id")
);

ALTER TABLE "common_forum" ADD CONSTRAINT "FK_common_forum_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
ALTER TABLE "common_forum" ADD CONSTRAINT "FK_common_forum_sender" FOREIGN KEY ("sender") REFERENCES "users" ("email");
