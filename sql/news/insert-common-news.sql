-- Közös Hirdetményre írás
-- Params:
-- - id: Üzenet ID-je
-- - message: üzenet
-- - subject: Tantárgy ID-je

INSERT INTO "SYSTEM"."common_news" ("id", "message", "subjectId")
VALUES (:id, :message, :subject);
