-- Kurzus törlése admin által
-- Paraméterek:
-- - courseId: a kurzus ID-je

DELETE FROM "SYSTEM"."courses" "c"
WHERE "c"."id" = :courseId;