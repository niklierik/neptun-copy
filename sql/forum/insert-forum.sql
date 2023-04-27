-- Fórumra írás
-- Params:
-- - id: üzenet ID-je
-- - message: üzenet
-- - sender: Küldő emailje
-- - course: Kurzus ID-je

INSERT INTO "SYSTEM"."forum" ("id", "message", "senderEmail", "courseId")
VALUES (:id, :message, :sender, :course);