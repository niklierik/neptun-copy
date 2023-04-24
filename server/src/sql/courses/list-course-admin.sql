-- Kurzusok listázására használjuk (ha a felhasználó admin)

SELECT * FROM "SYSTEM"."courses" "c"
-- get teachers
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "c"."id" = "ctu"."coursesId"
-- get room
LEFT JOIN "SYSTEM"."rooms" "r" ON "c"."roomsId" = "r"."id"
-- get subject
LEFT JOIN "SYSTEM"."subject" "s" ON "c"."subjectsId" = "s"."id";
