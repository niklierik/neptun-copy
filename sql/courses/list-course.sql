-- Kurzusok listázására használjuk (ha a felhasználó nem admin)

SELECT * FROM "SYSTEM"."courses" "c"
-- get teachers
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "c"."id" = "ctu"."coursesId"
-- get students
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "c"."id" = "csu"."coursesId"
-- teachers / students to users
LEFT JOIN "SYSTEM"."users" "tu" ON "tu.email" = "ctu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "su" ON "su.email" = "csu"."usersEmail"
-- get room
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomId" = "r"."id"
-- get subject
LEFT JOIN "SYSTEM"."subject" "s" ON "c"."subjectId" = "s"."id"
ORDER BY 
"c"."year" DESC, 
"c"."semester" ASC, 
"s"."name" ASC,
"s"."type" ASC,
"c"."dayOfWeek" ASC,
"c"."startAt" ASC;
