--- Without users
SELECT * FROM "majors" WHERE "majors"."majorID" = :majorID LIMIT 1;
-- :majorID the ID that is searched



--- With users
SELECT * FROM "majors" LEFT JOIN "users" ON "users"."majorMajorID"="majors"."majorID" WHERE "majors"."majorID" = :majorID LIMIT 1;
-- :majorID the ID that is searched
