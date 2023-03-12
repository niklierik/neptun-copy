INSERT INTO "users"("email", "password", "familyname", "forename", "address", "birthdate", "createdAt", "isValid", "isAdmin", "validationToken", "majorID");
VALUES (:email, NULL, :familyname, :forename, :address, :birthdate, DEFAULT, 0, :isAdmin, :validationToken, :majorID);

--- Paraméterek
-- email: a felhasználó email címe
-- familyname: a felhasználó vezetékneve
-- forename: a felhasználó keresztneve
-- address: a felhasználó lakcíme (stringként)
-- birthdate: a felhasználó születési dátuma
-- (createdAt default értéken van, azaz NOW-on)
-- (isValid false-on van, a felhasználó addig nem valid amíg nem állít be jelszót magának az emailen kapott linken keresztül)
-- isAdmin felhasználó admin-e (mivel adminok regisztrálnak felhasználókat, ezért tudnak egyből admint regisztrálni ha szükséges)
-- validationToken a fiók validálásához szükséges (azaz jelszó beállításához, amíg nincs jelszava a felhasználónak ezzel azonosítsuk), backend generálja 
--     (potenciálisan nem a legbiztonságosabb megoldás)
-- majorID a felhasználó szakának ID-ja, alapból 