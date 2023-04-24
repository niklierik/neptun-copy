-- Kurzushoz csatlakozás
-- Paraméterek:
-- - courseId: a kurzus ID-je
-- - userEmail: a felhasználó e-mail címe

-- Terem kapacitásának ellenőrzéséhez
SELECT * FROM "SYSTEM"."courses" "c"
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomsId" = "r"."id"
WHERE "c"."id" = :courseId;

INSERT INTO "SYSTEM"."courses_students_users" ("coursesId", "usersEmail")
VALUES (:courseId, :userEmail);