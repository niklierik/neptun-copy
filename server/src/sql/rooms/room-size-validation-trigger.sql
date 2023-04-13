CREATE OR REPLACE TRIGGER RoomSizeValidation
BEFORE INSERT OR UPDATE
ON "SYSTEM"."rooms"
BEGIN
    IF NEW.size <= 0 THEN
        RAISE_APPLICATION_EXCEPTION(-20001, 'Room size validation failed. Must be positive integer.');
    ENDIF;
END;