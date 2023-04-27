-- Jegyek betöltése a Studies endpointhoz
-- Params:
-- - email: Felhasználó emaile


SELECT * FROM "SYSTEM"."marks" "m"
LEFT JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId"
LEFT JOIN "SYSTEM"."users" "u" ON "u"."email" = "m"."userEmail"
WHERE "m"."userEmail" = :email
ORDER BY "s"."name" ASC;