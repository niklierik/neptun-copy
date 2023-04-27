-- Tantárgy mintatanterv adatainak betöltése
-- (Kurzus felvételkor volt használva, mostmár csak endpoint van rá)
-- Params:
-- - subjectId: a tantárgy ID-ja
-- - majorId: a felhasználó szakja (ID-ja)

SELECT * FROM "SYSTEM"."education_chart" "ec"
LEFT JOIN "SYSTEM"."majors" "m" ON "ec"."majorMajorID" = "m"."majorID"
LEFT JOIN "SYSTEM"."subjects" "s" ON "ec"."subjectId" = "s"."id"
WHERE "ec"."subjectId" = :subjectId AND "ec"."majorMajorID" = :majorID;