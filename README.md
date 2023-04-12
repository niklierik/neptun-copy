# Neptun++

Neptun++ Elektronikus Tanulmányi Rendszer
Inspirálva a Neptunból és a CooSpace-ből

## Konfiguráció
### Kliens
client/env.json fájlban egy opciót kell megadnunk, ez pedig, hogy milyen elérhetőségen lehet elérni a szervert. 
(Fontos, hogy ha lehetőségünk van, akkor statikus IP címet használjunk, mert kliens oldalon fut a kód, így ha localhost-ot adunk meg, az más gépeken is
a localhoston fogja keresni a szervert.)

### Szerver
Itt már több opciót kell megadnunk a server/env.json fájlban:

  - port: ezen a porton fog futni a szerver, a kliens szerverelérhetőségénél is változtassuk meg, ha ezt változtatjuk
  
  - saltingRounds: jelszavak hashelésénél mennyiszer fut le a salt generálás
  
  - jwtSecret: JWT generálásnál milyen secretet használunk
  
  - sessionExpiresIn: Mennyi idő után járjon le a JWT token
  
  - seed: seed-eljük-e az adatbázist, ha szükséges
  
  - db: Adatbázis elérhetősége
  
    - host: az adatbázis elérhetősége, pl. `localhost`
  
    - port: milyen porton fut az adatbázis
  
    - name: az adatbázis neve
  
    - user: a felhasználó
  
    - schema: a séma / felhasználó (oracle esetén ez megegyezik)
  
    - password: a DB felhasználó jelszava


## Elindításhoz:
### Kliens
A klienst indítsuk el a client mappában ezzel a paranccsal:

    npm run dev




### Szerver
Kétféle képpen indíthatjuk:

	npm run start:debug

ezzel debug módban, azonban ha fájl változást észlel, akkor újra compile-ol. Ez problémás, mert ha seedelünk, akkor az adatbázis
kezelő library (a TypeORM) log-ol, és ez miatt is újracompile-ol.

    npm run start

ezzel nem érjük el a debug eszközöket, azonban nem is fog újra fordulni a kód, ha fájlváltozás lenne