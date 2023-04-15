-- Validates if mark is between 1 and 5
CREATE OR REPLACE TRIGGER MarkValidationTrigger
BEFORE INSERT OR UPDATE
ON "SYSTEM"."marks"
FOR EACH ROW
BEGIN
    IF  (:NEW."mark" > 5) OR (:NEW."mark" < 1) THEN
            RAISE_APPLICATION_ERROR(-20001, 'Mark must be between 1 and 5.');
    END IF;
END;