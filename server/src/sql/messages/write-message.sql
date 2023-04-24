-- Üzenet írása
-- Params:
-- - id: üzenet ID-je
-- - message: üzenet
-- - from: küldő emailje
-- - to: fogadó emailje

INSERT INTO ("id", "message", "fromEmail", "toEmail") 
VALUES (:id, :message, :from, :to);
