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

#### Szerepkörök:
- Adminisztrátor: Teljeskörű hozzáférése van mindenhez.
- Diszpécser: Új felhasználót tud regisztrálni. Rendelést tud felvenni.
- Futár: "Saját" rendeléseinek listázása.
- Felhasználó: Rendelés leadása. 

#### Végpontok:

Entitások|Típus|Elérés|Leírás
---|---|---|---
Category|GET|category/|Lekérdezi az össze kategóriát.
||GET|category/{id}|Lekérdez egyetlen kategóriát azonosító alapján.
||POST|category/|Új kategóriát hoz létre.
||DELETE|category/{id}|Azonosító alapján kategóriát töröl.
||PUT|category/{id}|Azonosító alapján egy kategória adatain módosít.
Product|GET|product/|Lekérdezi az össze terméket.
||GET|product/{id}|Lekérdez egyetlen terméket azonosító alapján.
||POST|product/|Új termék hoz létre.
||DELETE|product/{id}|Azonosító alapján terméket töröl.
||PUT|product/{id}|Azonosító alapján egy termék adatain módosít.
||PUT|product/{id}/reservation|Azonosító alapján megadja, hogy az adott termék mely rendelésekben szerepel.
Reservation|GET|reservation/|Lekérdezi az össze rendelést.
||GET|reservation/{id}|Lekérdez egyetlen rendelést azonosító alapján.
||POST|reservation/|Új rendelést hoz létre.
||DELETE|reservation/{id}|Azonosító alapján rendelést töröl.
||PUT|reservation/{id}|Azonosító alapján egy rendelés adatain módosít.
||PUT|reservation/{id}/products|Egy már elkészített rendelésthez, további termékeket lehet hozzáadni.
User|GET|user/|Lekérdezi az össze felhasználót.
||GET|user/{id}|Lekérdez egyetlen felhasználót azonosító alapján.
||GET|iser/{id}/reservation|Lekérdeti egy adott felhasználó rendeléseit.
||POST|user/register|Új felhasználót hoz létre.
||DELETE|user/{id}|Azonosító alapján felhasználót töröl.
||PUT|user/{id}|Azonosító alapján egy felhasználó adatain módosít.
||PUT|user/{id}/reservation|Hozzárendeli a rendeléshez a futárt.
