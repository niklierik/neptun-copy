-- Adott kurzus adatai
-- Paraméterek:
-- - courseId: string

SELECT * FROM "SYSTEM"."courses" "c"
-- get students
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "c"."id" = "csu"."coursesId"
-- get teachers
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "c"."id" = "ctu"."coursesId"
-- teachers / students to users
LEFT JOIN "SYSTEM"."users" "tu" ON "tu.email" = "ctu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "su" ON "su.email" = "csu"."usersEmail"
-- get forum
LEFT JOIN "SYSTEM"."forum" "f" ON "c"."id" = "f"."coursesId"
-- get common forum
LEFT JOIN "SYSTEM"."common_forum" "cf" ON "cf"."coursesId" = "c"."id"
-- get news
LEFT JOIN "SYSTEM"."news" "n" ON "c"."id" = "n"."coursesId"
-- get common news
LEFT JOIN "SYSTEM"."common_news" "cn" ON "cn"."coursesId" = "c"."id"
-- get room
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomId" = "r"."id"
-- get subject
LEFT JOIN "SYSTEM"."subject" "s" ON "c"."subjectId" = "s"."id"
WHERE "c"."id" = :courseId;
