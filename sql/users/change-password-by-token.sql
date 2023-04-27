UPDATE "SYSTEM"."users" SET "password" = :password, "validationToken" = NULL WHERE "validationToken" = :validationToken;
--- Paraméterek
-- password: hashelt jelszó, amit beállítunk
-- validationToken: token ami a kiküldött linkben szerepel