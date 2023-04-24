--- Admin ezzel készít kurzust
-- Paraméterek: 
-- - id: A kurzus ID-je
-- - roomId: Szoba ID-je 
-- - subjectId: Tantárgy ID-je
-- - year: Melyik évben van tartva a kurzus?
-- - semester: Melyik félévben van a kurzus?
-- - dayOfWeek: Hét melyik napján lesz a kurzus?
-- - startAt: Mikor kezdődik a kurzus?

-- Teremelérhetőség vizsgálatához kell
SELECT * FROM "SYSTEM"."rooms" "r", "SYSTEM"."subjects" "s" 
WHERE "r"."id" = :roomId AND "s"."id" = :subjectId;

INSERT INTO "SYSTEM"."courses" 
("id", "dayOfWeek","roomId","subjectId","year","startAt","semester")
VALUES (:id, :dayOfWeek,:roomId, :subjectId, :year, :startAt, :semester)