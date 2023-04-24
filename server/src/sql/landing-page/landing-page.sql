-- Landing Page alatt lefutó query-k

-- Params
-- - email: felhasználó emailje

SELECT * FROM "SYSTEM"."courses" "c"
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomId" = "r"."id"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."students" "cs" ON "csu"."usersEmail" = "cs"."email"
LEFT JOIN "SYSTEM"."teachers" "ct" ON "ctu"."usersEmail" = "ct"."email"
LEFT JOIN "SYSTEM"."subject" "s" ON "c"."subjectId" = "s"."id"
WHERE (
    "cs"."email" = :email
)  OR (
    "ct"."email" = :email
); 