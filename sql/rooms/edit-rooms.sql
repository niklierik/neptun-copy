-- Szoba szerkesztése
-- Params:
-- - id: szoba ID-je
-- - méret: szoba mérete


UPDATE "SYSTEM"."rooms" "r"
SET "r"."size" = :size
WHERE "r"."id" = :id;
