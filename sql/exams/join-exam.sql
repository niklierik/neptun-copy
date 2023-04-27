-- Vizsgához csatlakozás
-- Params:
-- - email: a felhasználó emailje
-- - exam: a vizsga ID-je

-- Terem kapacitás ellenőrzéséhez használjuk
SELECT * FROM "exams" "e"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "e"."roomId" 
WHERE "e"."id" = :exam;

INSERT INTO 
"SYSTEM"."exams_examinees_users"("usersEmail","examsId")
VALUES (:email, :exam);