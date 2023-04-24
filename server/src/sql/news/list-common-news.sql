-- Közös Hirdetmények listázása
-- Params:
-- - subjectId: Tantárgy ID-je

SELECT * FROM "SYSTEM"."common_news" "n"
LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "n"."subjectId"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."users" "student" ON "student"."email" = "csu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "teacher" ON "teacher"."email" = "ctu"."usersEmail"
WHERE "n"."subjectId" = :subjectId
ORDER BY "n"."createdAt" DESC;