UPDATE "SYSTEM"."users" SET "password" = :password, "validationToken" = NULL WHERE "email" = :email; 
--- Paraméterek: 
-- password: jelszó hashelve
-- email: email cím amihez tartozó fiók jelszavát állítjuk