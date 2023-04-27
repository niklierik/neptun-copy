-- Tantárgy információinak lekérése
-- Params:
-- - id: Tantárgy ID-je

SELECT * FROM "SYSTEM"."subjects" "s"
LEFT JOIN "SYSTEM"."courses" "c" ON "s"."id" = "c"."subjectId"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "c"."roomId"
WHERE "s"."id" = :id;

-- Van olyan változata, amelyik a tanárokat és a hallgatókat is betölti

SELECT * FROM "SYSTEM"."subjects" "s"
LEFT JOIN "SYSTEM"."courses" "c" ON "s"."id" = "c"."subjectId"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "c"."roomId"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "c"."id" = "ctu"."coursesId"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "c"."id" = "csu"."coursesId"
LEFT JOIN "SYSTEM"."users" "tu" ON "tu.email" = "ctu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "su" ON "su.email" = "csu"."usersEmail"
WHERE "s"."id" = :id;