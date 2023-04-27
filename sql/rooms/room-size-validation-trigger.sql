-- Validates whether a room has a valid size / capacity.
CREATE OR REPLACE TRIGGER RoomSizeValidation
BEFORE INSERT OR UPDATE
ON "SYSTEM"."rooms"
FOR EACH ROW
BEGIN
    IF :NEW."size" <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Room size validation failed. Must be positive integer.');
    END IF;
END;