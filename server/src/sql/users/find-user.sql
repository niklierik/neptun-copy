SELECT * FROM "SYSTEM"."users" LEFT JOIN "SYSTEM"."majors" ON "users"."majorID"="majors"."majorID" WHERE "users"."email" = :email; 
--- Paraméterek:
-- email: az email ami alapján megkeressük a felhasználót

-- A kérést sok esetben módosítjuk az alapján, hogy mire használjuk (pl. loginnál csak a jelszót kérjük le)