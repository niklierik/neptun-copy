-- Vizsgaalkalom készítése

-- Params: 
-- - id: a vizsga ID-je
-- - roomId: a szoba ID-je
-- - subjectId: a tantárgy ID-je
-- - when: mikor lesz a vizsga?

INSERT INTO "SYSTEM"."exams" ("id", "when", "subjectId", "roomId")
VALUES(:id, :when, :subjectId, :roomId);