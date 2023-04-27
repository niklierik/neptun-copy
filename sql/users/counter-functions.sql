-- Select students
SELECT DISTINCT "usersEmail" FROM "courses_students_users";

-- Select teachers
SELECT DISTINCT "usersEmail" FROM "courses_teachers_users";

-- Select intersection
SELECT DISTINCT teacher."usersEmail" FROM "courses_teachers_users" teacher
INNER JOIN (
    SELECT DISTINCT "usersEmail" FROM "courses_students_users"
) student ON teacher."usersEmail" = student."usersEmail";


-- Number of teachers
CREATE OR REPLACE FUNCTION NumberOfTeachers
RETURN NUMBER
IS
    teachers NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO teachers FROM "courses_teachers_users";
    RETURN teachers;
END;

CREATE OR REPLACE FUNCTION NumberOfStudents
RETURN NUMBER
IS
    students NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO students FROM "courses_students_users";
    RETURN students;
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