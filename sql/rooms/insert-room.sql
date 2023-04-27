-- Szoba hozzáadása
-- Params:
-- - id Szoba ID-je
-- - név Szoba neve
-- - méret Szoba mérete

INSERT INTO "SYSTEM"."rooms"
("id", "name", "size")
VALUES (:id, :name, :size);