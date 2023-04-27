-- Jegybeírás
-- Params:
-- - id: Jegy ID-je
-- - user: Felhasználó email-je
-- - subject: Tantárgy ID-je
-- - mark: Jegy (1-5)
-- - year: Év
-- - semester: Szemeszter (ezzel jelöljük, hogy mikor teljesítette a felhsaználó a tárgyat)


INSERT INTO "SYSTEM"."marks" 
VALUES("id", "userEmail", "subjectId", "mark", "year", "semester")
(:id, :user, :subject, :mark, :year, :semester);
