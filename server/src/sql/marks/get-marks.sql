-- Jegyek kilistázása tanárnak (jegybeíráshoz)
-- TODO: ezt ténylegesen implementálni (jelenleg máshogy működik)
-- Params:
-- - kurzus ID


-- Azért használunk right join-okat, mert előfordulhat
-- hogy valakinek még nem írtak be jegyet
SELECT * FROM "SYSTEM"."marks" "m"
RIGHT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId"
RIGHT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
RIGHT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
WHERE "c"."id" = :courseId;