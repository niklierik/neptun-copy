SELECT "m"."mark", COUNT("m"."mark") "noMarks" FROM "SYSTEM"."marks" "m" 
INNER JOIN "SYSTEM"."users" "u" ON "m"."userEmail" = "u"."email" 
INNER JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId" 
INNER JOIN "SYSTEM"."courses" "c" ON "c"."subjectId"="s"."id"
-- WHERE "s"."id" = :subjectId -- tantárgyra szűrés
-- WHERE "c"."id" = :courseId -- kurzusra szűrés
-- WHERE "u"."email" = :email -- emailre szűrés
GROUP BY "m"."mark";