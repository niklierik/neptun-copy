-- Vizsgához csatlakozás
-- Params:
-- - email: a felhasználó emailje
-- - exam: a vizsga ID-je

DELETE FROM
"SYSTEM"."exams_examinees_users" "eeu"
WHERE "eeu"."usersEmail" :email AND "eeu"."examsId" :exam;