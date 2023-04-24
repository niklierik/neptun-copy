-- Vizsgaalkalmak listázása user-eknek
-- Params:
-- - subjectIDs: a felhasználó tantárgyainak ID-ja (v1-hez)
-- - user: A felhasználó email címe (v2-höz)

SELECT * FROM "SYSTEM"."exams" "e"

LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "e"."subjectId"
LEFT JOIN "SYSTEM"."courses" "c" ON "c"."subjectId" = "s"."id"
LEFT JOIN "SYSTEM"."courses_teachers_users" "ctu" ON "ctu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."courses_students_users" "csu" ON "csu"."coursesId" = "c"."id"
LEFT JOIN "SYSTEM"."rooms" "r" ON "r"."id" = "e"."roomId"
LEFT JOIN "SYSTEM"."exams_examinees_users" "eeu" ON "eeu"."examsId" = "e"."id"
LEFT JOIN "SYSTEM"."users" "eu" ON "eu"."email" = "eeu"."usersEmail"
LEFT JOIN "SYSTEM"."users" "t" ON  "t"."email" = "ctu"."usersEmail"

-- LEFT JOIN "SYSTEM"."users" "cs" ON  "cs"."email" = "csu"."usersEmail"

-- adminnál annyi változik, hogy nincsen szűrés (WHERE)

-- régi vizsgák kiszűrése
WHERE "e"."when" >= sysdate 

-- azokat a vizsgákat jelenítsük meg, amiknek a kurzusát felvette a user
-- Első változat (Ezt használjuk)

AND "s"."id" IN :subjectIds;

-- Második változat
-- AND "csu"."usersEmail" = :user;



