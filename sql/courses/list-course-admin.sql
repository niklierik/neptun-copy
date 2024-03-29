-- Kurzusok listázására használjuk (ha a felhasználó admin)

SELECT * FROM "SYSTEM"."courses" "c"
-- get teachers
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "c"."id" = "ctu"."coursesId"
-- teachers / students to users
LEFT JOIN "SYSTEM"."users" "tu" ON "tu.email" = "ctu"."usersEmail"
-- get room
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomId" = "r"."id"
-- get subject
LEFT JOIN "SYSTEM"."subject" "s" ON "c"."subjectId" = "s"."id";
