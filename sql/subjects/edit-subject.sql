-- Tantárgy szerkesztése
-- Params:
-- - id: tantárgy ID-je
-- - credit: Kredit
-- - hoursAWeek: Heti óraszám

UPDATE "SYSTEM"."subjects" "s"
SET "s"."credit" = :credit,
"s"."hoursAWeek" = :hoursAWeek
WHERE "s"."id" = :id;