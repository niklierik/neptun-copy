-- Közös Fórumra írás
-- Params:
-- - id: üzenet ID-ja
-- - message: üzenet
-- - sender: Küldő emailje
-- - subject: Tantárgy ID-je

INSERT INTO "SYSTEM"."common_forum" ("id", "message", "senderEmail", "subjectId")
VALUES (:id, :message, :sender, :subject);
