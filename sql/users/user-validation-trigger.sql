-- Validates user's data (mostly empty string check)
CREATE OR REPLACE TRIGGER UserValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."users"
FOR EACH ROW
BEGIN
    IF  (LENGTH(:NEW."email") = 0) OR
        (LENGTH(:NEW."address") = 0) OR
        (LENGTH(:NEW."forename") = 0) OR
        (LENGTH(:NEW."familyname") = 0) OR
        (LENGTH(:NEW."isAdmin") NOT IN (0, 1)) THEN
        -- MajorID is checked by DB with foreign key check
            RAISE_APPLICATION_ERROR(-20001, 'User validation failed.');
    END IF;
END;