--- Admin ezzel szerkeszt kurzust
-- Paraméterek: 
-- - roomId: Szoba ID-je 
-- - courseId: Kurzus ID-je
-- - dayOfWeek: Hét melyik napján lesz a kurzus?
-- - startAt: Mikor kezdődik a kurzus?
-- Ezek közül csak azokat állítjuk be, amelyeknek van értéke. 
-- Ha a roomId-nak nincs értéke, a select statement nem fog lefutni

-- Teremelérhetőség vizsgálatához kell
SELECT * FROM "SYSTEM"."rooms" "r" 
WHERE "r"."id" = :roomId AND "s"."id" = :subjectId;

UPDATE "SYSTEM"."courses" SET 
"dayOfWeek" = :dayOfWeek,
"roomId" = :roomId,
"startAt" = :startAt
WHERE 
"courseId" = :courseId;