-- WATCH OUT!
-- This may cause data loss
DELETE FROM "SYSTEM"."courses_students_users";
DELETE FROM "SYSTEM"."courses_teachers_users";
DELETE FROM "SYSTEM"."exams_examiness_users";
DELETE FROM "SYSTEM"."education_chart";
DELETE FROM "SYSTEM"."courses";
DELETE FROM "SYSTEM"."rooms";
DELETE FROM "SYSTEM"."subjects";
DELETE FROM "SYSTEM"."exams";

DELETE FROM "SYSTEM"."users";
DELETE FROM "SYSTEM"."majors";

DELETE FROM "SYSTEM"."seeded";
