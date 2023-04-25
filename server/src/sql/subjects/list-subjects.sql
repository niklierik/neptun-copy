-- Tárgyfelvételnél a tárgyak listázása
-- Params:
-- - majorID: felhasználó szakának ID-ja

SELECT * FROM "SYSTEM"."subjects" "s"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "c"."roomId"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."users" "su" ON "su"."email" = "csu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "tu" ON "tu"."email" = "ctu"."usersEmail"
LEFT JOIN "SYSTEM"."educhart" "ec" ON "ec"."subjectId" = "s"."id"
WHERE
-- TODO: use current_timestamp / NOW()
"c"."year" = 2023 AND
"c"."semester" = 1 AND -- spring
("ec"."majorMajorID" IS NULL OR "ec"."majorMajorID" IN (:majorID, ""))
ORDER BY 
"s"."name" ASC,
"s"."type" ASC,
"s"."id" ASC,
"c"."year" DESC,
"c"."semester" ASC,
"c"."dayOfWeek" ASC,
"c"."startAt" ASC
;