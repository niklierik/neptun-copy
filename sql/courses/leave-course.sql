-- Kurzus leadása
-- Paraméterek:
-- - courseId: a kurzus ID-je
-- - userEmail: a felhasználó e-mail címe

DELETE FROM "SYSTEM"."courses_students_users" "csu"
WHERE "csu"."usersEmail" = :userEmail AND "csu"."coursesId" = :courseId;