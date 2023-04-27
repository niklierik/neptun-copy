--- Felhasználók nélkül
SELECT * FROM "majors" WHERE "majors"."majorID" = :majorID LIMIT 1;
--- Paraméterek:
-- majorID: a szak ID-ja



--- Felhasználókkal
SELECT * FROM "majors" LEFT JOIN "users" ON "users"."majorMajorID"="majors"."majorID" WHERE "majors"."majorID" = :majorID LIMIT 1;
--- Paraméterek:
-- majorID: a szak ID-ja
