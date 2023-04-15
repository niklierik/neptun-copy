CREATE OR REPLACE FUNCTION AverageMarkOfUser
(
    user "SYSTEM"."users"."email"%TYPE
)
RETURN FLOAT
IS
    a FLOAT;
BEGIN
    SELECT SUM((m."mark" * s."credit")) / SUM(s."credit") average INTO a FROM "SYSTEM"."marks" m INNER JOIN "SYSTEM"."subjects" s ON m."subjectId" = s."id" WHERE m."userEmail" = user;
    return a;
END;