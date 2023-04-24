-- Hirdetményre írás
-- Params:
-- - id: Üzenet ID-je
-- - message: üzenet
-- - course: Kurzus ID-je

INSERT INTO "SYSTEM"."news" ("id", "message", "courseId")
VALUES (:id, :message, :course);