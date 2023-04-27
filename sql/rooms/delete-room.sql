-- Szoba törlése
-- Params:
-- - id: szoba ID-je

DELETE FROM "SYSTEM"."rooms" "r"
WHERE "r"."id" = :id;
