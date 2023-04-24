-- Fórum üzenetek listázása
-- Params:
-- - courseId: Kurzus ID-je

SELECT * FROM "SYSTEM"."forum" "f"
LEFT JOIN "SYSTEM"."users" "sender" ON "f"."senderEmail" = "sender"."email"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."id" = "f"."courseId"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."users" "student" ON "student"."email" = "csu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "teacher" ON "teacher"."email" = "ctu"."usersEmail"
LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "c"."subjectId"
WHERE "f"."courseId" = :courseId
ORDER BY "f"."createdAt" DESC;