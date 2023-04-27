-- If one fails, try again till every one is executed
DELETE FROM "SYSTEM"."courses_teachers_users";
DELETE FROM "SYSTEM"."courses_students_users";
DELETE FROM "SYSTEM"."exams_examinees_users";
DELETE FROM "SYSTEM"."education_chart";
DELETE FROM "SYSTEM"."marks";
DELETE FROM "SYSTEM"."news";
DELETE FROM "SYSTEM"."common_news";
DELETE FROM "SYSTEM"."forum";
DELETE FROM "SYSTEM"."common_forum";
DELETE FROM "SYSTEM"."messages";
DELETE FROM "SYSTEM"."exams";
DELETE FROM "SYSTEM"."users";
DELETE FROM "SYSTEM"."majors";
DELETE FROM "SYSTEM"."courses";
DELETE FROM "SYSTEM"."subjects";
DELETE FROM "SYSTEM"."rooms";
DELETE FROM "SYSTEM"."seeded";

DROP TRIGGER UserValidationTrigger;
DROP TRIGGER RoomSizeValidationTrigger;
DROP TRIGGER MarkValidationTrigger;

DROP FUNCTION AverageMarkOfUser;
DROP FUNCTION NumberOfTeachers;
DROP FUNCTION NumberOfStudents;
DROP FUNCTION NumberOfIntersection;
