-- Vizsgaalkalom keresése ID alapján
-- Params:
-- - examID: a vizsga ID-ja

SELECT * FROM "SYSTEM"."exams" "e"
LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "e"."subjectId"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "e"."roomId"
LEFT JOIN "SYSTEM"."exams_examinees_users" "eeu" ON "eeu"."examsId" = "e"."id"
LEFT JOIN "SYSTEM"."users" "eu" ON "eu"."email" = "eeu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "t" ON  "t"."email" = "ctu"."usersEmail"
WHERE "e"."id" = :examID;