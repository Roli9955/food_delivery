## Kotroczó Roland (EA2EEB) - Csizmás Dávid(M2H8A7) : Ételrendelés
###  Készítsük el egy étel-futár vállalat rendeléseket kezelő rendszerét. 

#### A megrendeléseket a vásárlók a webes felületen keresztül adhatják le. 

- A weblap főoldalán megjelennek a kategóriák (pl. levesek, pizzák, üdítők), valamint a 10 legnépszerűbb (legtöbbet rendelt) étel/ital. 
- A kategóriát kiválasztva listázódnak a tételek (név és ár kíséretében), amelyek szűrhetőek név(részlet)re. Ételek esetén leírás is van. Külön meg vannak jelölve a csípős, illetve vegetáriánus ételek. 
- Ételek és italok tetszőleges számban helyezhetőek a kosárba egy adott felső korlátig (20.000 Ft), afelett több terméket nem lehet a kosárba helyezni. 
- A kosár tartalma bármikor megtekinthető, ekkor látszódnak a felvett tételek, illetve látható az összár. Bármely tétel kivehető a kosárból. 
- A rendelést törölhetjük, illetve leadhatjuk. Utóbbi esetben meg kell adnunk a nevünket, címünket, illetve telefonszámunkat, majd elküldhetjük a rendelést. 

#### A grafikus felületet az alkalmazottak használják a rendelések, illetve a weblap tartalmának adminisztrálására. 

- Az alkalmazott bejelentkezhet (felhasználónév és jelszó megadásával) a programba, illetve kijelentkezhet. 
- Bejelentkezve listázódnak a leadott, illetve teljesített rendeléseket (leadás időpontja, teljesítés időpontja, név, cím, telefonszám, összeg), egy rendelést kiválasztva pedig listázódnak a tételeket. A leadott rendelés teljesítettnek jelölhető, ekkor a rendszer rögzíti a teljesítés időpontját is. A lista szűrhető csak teljesített, illetve csak leadott rendelésekre, továbbá a rendelő nevére, illetve cím(részlet)re.
- Lehetőség van új étel, illetve ital hozzáadására (név, ár, illetve étel esetén leírás, csípős/vegetáriánus tulajdonságok megadásával). Az egyértelműség miatt nem engedélyezett több ugyanolyan nevű étel/ital felvitele.

#### Az adatbázis az alábbi adatokat tárolja:

- kategóriák (név);
- ételek és italok (név, kategória, leírás, ár, csípős-e, vegetáriánus-e);
- munkatársak (teljes név, felhasználónév, jelszó);
- rendelések (felhasználói azonosító, megrendelt ételek és italok, teljesített-e)
- felhasználó (név, cím, telefonszám)

#### Végpontok:

- GET / Főoldal
- GET /login Bejelentkező oldal
- POST /login Bejelentkezés
- GET /logout Kijelentkezés
- GET /register Regisztrációs oldal
- POST /register Regisztrációs adatok elküldése
- GET /user Tagok listázása

- PUT /user/... Jogok kezelése

- GET /food Étlap listázása
- POST /food/add Új étel hozzáadása az étlaphoz
- Get /drink Itallap listázása
- POST /drink/add Új ital hozzáadása az itallaophoz
- GET /container Kosár listázása
