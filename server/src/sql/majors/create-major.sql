-- Szakokat tároló tábla
CREATE TABLE "majors" (
  "majorID" varchar2(128) NOT NULL,
  "displayName" varchar2(128) NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "PK_majors_majorID" PRIMARY KEY ("majorID")
);