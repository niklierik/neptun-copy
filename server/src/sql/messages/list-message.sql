-- Üzenetek kilistázása két felhasználó között
-- Adminnak van lehetősége a where feltételt elhagyni
-- Params:
-- - u1: egyik felhasználó (email)
-- - u2: másik felhasználó (email)

SELECT * FROM "SYSTEM"."messages" "m"
LEFT JOIN "SYSTEM"."users" "from" ON "from"."email" = "m"."fromEmail"
LEFT JOIN "SYSTEM"."users" "to" ON "to"."email" = "m"."toEmail"
WHERE (
    "m"."fromEmail" = :u1 AND "m"."toEmail" = :u2
) OR (
    "m"."fromEmail" = :u2 AND "m"."toEmail" = :u1
)
ORDER BY "m"."createdAt" ASC;