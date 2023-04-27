-- Felhasználók
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

-- Terem
CREATE TABLE "rooms" (
    "id" varchar2(36),
    "name" varchar2(256) NOT NULL,
    "size" number(1,0) NOT NULL,
    "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "PK_rooms_id" PRIMARY KEY ("id")
);

-- Tantárgy
CREATE TABLE "subjects" (
  "id" varchar2(36),
  "name" varchar2(256) NOT NULL,
  "credit" number(1,0) NOT NULL,
  "hoursAWeek" number(1,0) NOT NULL,
  "type" number(1, 0) NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "PK_subjects_id" PRIMARY KEY ("id")
);

-- Kurzus
CREATE TABLE "courses" (
  "id" varchar2(36),
  "start" interval day to second NOT NULL,
  "dayOfWeek" number NOT NULL,
  "subjectId" varchar2(36),
  "roomId" varchar2(36),
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "PK_courses_id" PRIMARY KEY ("id")
);

-- Mintatanterv
CREATE TABLE "education_chart" (
  "id" varchar2(36),
  "recommendedSemester" number NOT NULL,
  "requirementType" number NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  "majorId" varchar2(255),
  CONSTRAINT "PK_education_chart_id" PRIMARY KEY ("id")
);

-- Vizsga
CREATE TABLE "exams" (
  "id" varchar2(36),
  "when" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  "roomId" varchar2(36),
  CONSTRAINT "PK_exams_id" PRIMARY KEY ("id")
);

-- Közös fórumüzenetek
CREATE TABLE "common_forum" (
  "id" varchar2(36) NOT NULL,
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "sender" varchar2(255),
  "subjectId" varchar2(36),
  CONSTRAINT "PK_common_forum_id" PRIMARY KEY ("id")
);

-- Fórum üzenetek
CREATE TABLE "forum" (
  "id" varchar2(36),
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "sender" varchar2(255),
  "courseId" varchar2(36),
  CONSTRAINT "PK_forum_id" PRIMARY KEY ("id")
);

-- Jegyek
CREATE TABLE "marks" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "subject" varchar2(36) NOT NULL,
  CONSTRAINT "PK_marks_id" PRIMARY KEY ("id")
);

-- Szakokat tároló tábla
CREATE TABLE "majors" (
  "majorID" varchar2(36) NOT NULL,
  "displayName" varchar2(128) NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "PK_majors_majorID" PRIMARY KEY ("majorID")
);

-- Üzenetek
CREATE TABLE "messages" (
  "id" varchar2(36),
  "message" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "fromEmail" varchar2(255),
  "toEmail" varchar2(255),
  CONSTRAINT "PK_messages_id" PRIMARY KEY ("id")
); 


-- Közös hirdetmény-üzenetek
CREATE TABLE "common_news" (
  "id" varchar2(36),
  "content" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "subjectId" varchar2(36),
  CONSTRAINT "PK_common_news_id" PRIMARY KEY ("id")
);

-- Hirdetmények
CREATE TABLE "news" (
  "id" varchar2(36),
  "content" clob NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "courseId" varchar2(36),
  CONSTRAINT "PK_news_id" PRIMARY KEY ("id")
);

-- Seed tábla


--- Külső kulcsok
-- users tábla
ALTER TABLE "users" ADD CONSTRAINT "FK_users_major" FOREIGN KEY ("major") REFERENCES "majors" ("majorID");

-- courses tábla
ALTER TABLE  "courses" ADD CONSTRAINT "FK_courses_subjectId" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
ALTER TABLE  "courses" ADD CONSTRAINT "FK_courses_roomId" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");

-- education_chart tábla
ALTER TABLE "education_chart" ADD CONSTRAINT "FK_education_chart_major" FOREIGN KEY ("majorMajorID") REFERENCES "majors" ("majorID");
ALTER TABLE "education_chart" ADD CONSTRAINT "FK_education_chart_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");


-- exams tábla
ALTER TABLE "exams" ADD CONSTRAINT "FK_exams_room" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");
ALTER TABLE "exams" ADD CONSTRAINT "FK_exams_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");

-- common_forum tábla
ALTER TABLE "common_forum" ADD CONSTRAINT "FK_common_forum_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");
ALTER TABLE "common_forum" ADD CONSTRAINT "FK_common_forum_sender" FOREIGN KEY ("sender") REFERENCES "users" ("email");

-- forum tábla
ALTER TABLE "forum" ADD CONSTRAINT "FK_forum_course" FOREIGN KEY ("courseId") REFERENCES "courses" ("id");
ALTER TABLE "forum" ADD CONSTRAINT "FK_forum_sender" FOREIGN KEY ("sender") REFERENCES "users" ("email");

-- marks tábla
ALTER TABLE "marks" ADD CONSTRAINT "FK_marks_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "marks" ADD CONSTRAINT "FK_marks_exam" FOREIGN KEY ("subject") REFERENCES "subjects" ("id");

-- messages tábla
ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_from" FOREIGN KEY ("from") REFERENCES "users" ("email");
ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_to" FOREIGN KEY ("to") REFERENCES "users" ("email");

-- common_news tábla
ALTER TABLE "common_news" ADD CONSTRAINT "FK_common_news_subject" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id");

-- news tábla
ALTER TABLE "news" ADD CONSTRAINT "FK_new_course" FOREIGN KEY ("courseId") REFERENCES "courses" ("id");


--- Kapcsolótáblák
-- Felhasználó-kurzus mint hallgató
CREATE TABLE "courses_students_users" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "course" varchar2(36) NOT NULL,
  CONSTRAINT "PK_courses_students_users_id" PRIMARY KEY ("id")
);

ALTER TABLE "courses_students_users" ADD CONSTRAINT "FK_users_course_student_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "courses_students_users" ADD CONSTRAINT "FK_users_course_student_course" FOREIGN KEY ("course") REFERENCES "courses" ("id");


-- Felhasználó-kurzus mint tanár
CREATE TABLE "courses_teachers_users" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "course" varchar2(36) NOT NULL,
  CONSTRAINT "PK_courses_teachers_users_id" PRIMARY KEY ("id")
);

ALTER TABLE "courses_teachers_users" ADD CONSTRAINT "FK_users_course_teacher_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "courses_teachers_users" ADD CONSTRAINT "FK_users_course_teacher_course" FOREIGN KEY ("course") REFERENCES "courses" ("id");


-- Felhasználó-vizsga (vizsgázó)
CREATE TABLE "exams_examinees_users" (
  "id" varchar(36) NOT NULL,
  "user" varchar2(255) NOT NULL,
  "exam" varchar2(36) NOT NULL,
  CONSTRAINT "PK_exams_examinees_users_id" PRIMARY KEY ("id")
);


ALTER TABLE "exams_examinees_users" ADD CONSTRAINT "FK_users_exams_user" FOREIGN KEY ("user") REFERENCES "users" ("email");
ALTER TABLE "exams_examinees_users" ADD CONSTRAINT "FK_users_exams_exam" FOREIGN KEY ("exam") REFERENCES "exams" ("id");

-- Függvények
CREATE OR REPLACE FUNCTION NumberOfStudents
RETURN NUMBER
IS
    students NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO students FROM "courses_students_users";
    RETURN students;
END;

CREATE OR REPLACE FUNCTION NumberOfTeachers
RETURN NUMBER
IS
    teachers NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO teachers FROM "courses_teachers_users";
    RETURN teachers;
END;

CREATE OR REPLACE FUNCTION NumberOfIntersection
RETURN NUMBER
IS
    users NUMBER;
BEGIN
    SELECT COUNT(DISTINCT teacher."usersEmail") count  INTO users FROM "courses_teachers_users" teacher
    INNER JOIN (
        SELECT DISTINCT "usersEmail" FROM "courses_students_users"
    ) student ON teacher."usersEmail" = student."usersEmail";
    RETURN users;
END;

CREATE OR REPLACE FUNCTION AverageMarkOfUser
(
    user "SYSTEM"."users"."email"%TYPE
)
RETURN FLOAT
IS
    a FLOAT;
BEGIN
    SELECT SUM((m."mark" * s."credit")) / SUM(s."credit") average INTO a FROM "SYSTEM"."marks" m INNER JOIN "SYSTEM"."subjects" s ON m."subjectId" = s."id" WHERE m."userEmail" = user;
    return a;
END;


-- Triggerek

CREATE OR REPLACE TRIGGER MarkValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."marks"
FOR EACH ROW
BEGIN
    IF  (:NEW."mark" > 5) OR (:NEW."mark" < 1) THEN
            RAISE_APPLICATION_ERROR(-20001, 'Mark must be between 1 and 5.');
    END IF;
END;

CREATE OR REPLACE TRIGGER UserValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."users"
FOR EACH ROW
BEGIN
    IF  (LENGTH(:NEW."email") = 0) OR
        (LENGTH(:NEW."address") = 0) OR
        (LENGTH(:NEW."forename") = 0) OR
        (LENGTH(:NEW."familyname") = 0) OR
        (LENGTH(:NEW."isAdmin") NOT IN (0, 1)) THEN
        -- MajorID is checked by DB with foreign key check
            RAISE_APPLICATION_ERROR(-20001, 'User validation failed.');
    END IF;
END;

CREATE OR REPLACE TRIGGER MarkValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."marks"
FOR EACH ROW
BEGIN
    IF  (:NEW."mark" > 5) OR (:NEW."mark" < 1) THEN
            RAISE_APPLICATION_ERROR(-20001, 'Mark must be between 1 and 5.');
    END IF;
END;

CREATE OR REPLACE TRIGGER RoomSizeValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."rooms"
FOR EACH ROW
BEGIN
    IF :NEW."size" <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Room size validation failed. Must be positive integer.');
    END IF;
END;