-- Felhasználókat tároló tábla --
CREATE TABLE "users" (
  "email" varchar2(255) NOT NULL,
  "password" varchar2(72),
  "familyname" varchar2(128) NOT NULL,
  "forename" varchar2(128) NOT NULL,
  "address" varchar2(1024) NOT NULL,
  "birthdate" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "isValid" number(1) DEFAULT 0 NOT NULL,
  "isAdmin" number(1) DEFAULT 0 NOT NULL,
  "validationToken" varchar2(36),
  "major" varchar2(255),
  CONSTRAINT "PK_users_email" PRIMARY KEY ("email")
);

-- Külső kulcs felvétele (szakhoz / majorhoz) --
ALTER TABLE "users" ADD CONSTRAINT "FK_users_major" FOREIGN KEY ("major") REFERENCES "majors" ("majorID");
