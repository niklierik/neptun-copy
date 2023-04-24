CREATE TABLE "messages" (
  "id" varchar2(36),
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "from" varchar2(255),
  "to" varchar2(255),
  CONSTRAINT "PK_messages_id" PRIMARY KEY ("id")
); 

ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_from" FOREIGN KEY ("from") REFERENCES "users" ("email");
ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_to" FOREIGN KEY ("to") REFERENCES "users" ("email");
