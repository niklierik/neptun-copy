-- Vizsga törlése
-- Params:
-- - id: vizsga ID-je

DELETE FROM "SYSTEM"."exams" "e"
WHERE "e"."id" = :id;