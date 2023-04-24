-- Közös Fórum üzenetek listázása
-- Params:
-- - subjectId: Tantárgy ID-je

SELECT * FROM "SYSTEM"."common_forum" "f"
LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "f"."subjectId"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
LEFT JOIN "SYSTEM"."users" "sender" ON "f"."senderEmail" = "sender"."email"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."users" "student" ON "student"."email" = "csu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "teacher" ON "teacher"."email" = "ctu"."usersEmail"
WHERE "f"."subjectId" = :subjectId
ORDER BY "f"."createdAt" DESC;