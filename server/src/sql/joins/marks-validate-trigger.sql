-- Validates user's data (mostly empty string check)
CREATE OR REPLACE TRIGGER UserValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."marks"
FOR EACH ROW
BEGIN
    IF  (:NEW."mark" > 5) OR (:NEW."mark" < 1) THEN
        -- MajorID is checked by DB with foreign key check
            RAISE_APPLICATION_ERROR(-20001, 'Mark must be between 1 and 5.');
    END IF;
END;