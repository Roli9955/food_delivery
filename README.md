## Kotroczó Roland (EA2EEB) - Csizmás Dávid(M2H8A7) : Ételrendelés
###  Készítsük el egy étel-futár vállalat rendeléseket kezelő rendszerét. 

#### Fejlesztői környezet és haszált technológiák:

- NetBeans IDE - BackEnd
- Visual Studio Code - FrontEnd
- GitHub:
	- SourceTree 
- StarUML - UML
- MySQL Workbench - adatbázis-modell
- Balsamiq - drótváz
- Paint 

- Angular keretrendszer
- Java spring boot
- Mvc modell
- JSON

#### A megrendeléseket a vásárlók a webes felületen keresztül adhatják le. 

- A weblap főoldalán megjelennek a kategóriák (pl. levesek, pizzák, üdítők), valamint a 3 legnépszerűbb (legtöbbet rendelt) étel/ital. 
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

#### Teszt Felhasználók:
- admin: admin/admin
- futár: deliver/admin
- felhasználó: guest/admin

#### Adatbázis modell:
![database_sheme](https://user-images.githubusercontent.com/26537226/50056701-40f81880-0160-11e9-9fc2-938faca9e5f1.png)
- A CATEGORY és PRODUCT táblák között 1 az N-hez kapcsoalt áll fenn, mert egy terméknek egy kategóriája lehet, de egy kategóriatöbb termékhez id tartozhat. 
Kapcsolat(ok): CATEGORY(ID) - PRODUCT(Category_ID)
- A PRODUCT és PIECE között is 1 az N-hez kapcsolat áll fent, mert egy termékből nem csak egy lehet.
Kapcsolat(ok): PRODUCT(ID) - PIECE(Product_ID)
- A PIECE a RESERVATION táblával egy RESERVATION_has_PIECE segédtábla segítségével van összekapcsolva. A PIECE és RESERVATION_has_PIECE között 1 az N-hez, míg a RESERVATION_has_PIECE és RESERVATION között N az 1-hez kapcsolat van.
Kapcsolat(ok): PIECE(PIECE_ID) - RESERVATION_has_PIECE(PIECE_ID), RESERVATION_has_PIECE(RESERVATION_ID) - RESERVATION(ID)
- A USER és RESERVATION táblák között is 1 az N-hez kapcsolat van, hiszen 1 felhasználónak töb rendelése is lehet, de 1 rendelés nem tartozhat több felhasználóhoz.
Kapcsolat(ok): USER(ID) - RESERVATION(User-ID)

#### Use-Case:
![food_delivery_use-case](https://user-images.githubusercontent.com/26537226/49343614-2c4e5780-f66d-11e8-860e-11084edc3127.png)

#### Rendelés folyamat:
![rendeles_folyamat](https://user-images.githubusercontent.com/26537226/50057691-32b0f900-016e-11e9-9a87-7a8f2ed7c141.png)

#### Végpontok:

Entitások|Típus|Elérés|Leírás|Ki fér hozzá?
---|---|---|---|---
Category|GET|category/|Lekérdezi az össze kategóriát.|Mindenki
||GET|category/{id}|Lekérdez egyetlen kategóriát azonosító alapján.|Mindenki
||POST|category/|Új kategóriát hoz létre.|Admin
||POST|category/{id}/product|Egy megadott azonosítójú kategóriához, terméket rendel.|Admin
||DELETE|category/{id}|Azonosító alapján kategóriát töröl.|Admin
||PUT|category/{id}|Azonosító alapján egy kategória adatain módosít.|Admin
Product|GET|product/|Lekérdezi az össze terméket.|Mindenki
||GET|product/{id}|Lekérdez egyetlen terméket azonosító alapján.|Admin
||POST|product/|Új termék hoz létre.|Admin
||DELETE|product/{id}|Azonosító alapján terméket töröl.|Admin
||PUT|product/{id}|Azonosító alapján egy termék adatain módosít.|Admin
||PUT|product/{id}/category/{id2}|Egy id azonosítújó termék kategóriáját megváltoztatja egy id2 azonosítójú kategóriára.|Admin
Reservation|GET|reservation/|Lekérdezi az össze rendelést.|Admin, Diszpécser
||GET|reservation/{id}|Lekérdez egyetlen rendelést azonosító alapján.|Admin, Diszpécser, Felhasználó
||POST|reservation/|Új rendelést hoz létre.|Admin, Diszpécser, Felhasználó
||DELETE|reservation/{id}|Azonosító alapján rendelést töröl.|Admin, Diszpécser
||DELETE|reservation/{id}/product|Egy megadott rendelésből töröl termékeket.|Admin, Diszpécser
||PUT|reservation/{id}|Azonosító alapján egy rendelés adatain módosít.|Admin, Diszpécser
||PUT|reservation/{id}/product|Egy már elkészített rendeléshez, további termékeket rendel és meglévőeket módosít.|Admin, Diszpécser
User|GET|user/|Lekérdezi az össze felhasználót.|Admin
||GET|user/{id}|Lekérdez egyetlen felhasználót azonosító alapján.|Admin, Diszpécser, Futár,  Felhasználó
||GET|user/{id}/reservation|Lekérdeti egy adott felhasználó rendeléseit.|Admin, Diszpécser, Futár,  Felhasználó
||POST|user/register|Új felhasználót hoz létre.|Vendég
||DELETE|user/{id}|Azonosító alapján felhasználót töröl.|Admin
||PUT|user/{id}|Azonosító alapján egy felhasználó adatain módosít.|Admin
||PUT|user/{id}/reservation|Hozzárendeli a rendeléshez a futárt.|Admin, Diszpécser

### Felhasználói Dokumentáció

#### Állományok beszerzése
- Látogasson el a https://github.com/Roli9955/food_delivery oldalra
- Itt kattintson a "**Clone and Download**" gombra, és azon belül kattintson a "**Download as Zip**" gombra.
- A letöltött állományt csomagoljuk ki

#### Adatbázis futtatása NetBeans IDE-vel
- Nyissa meg a NetBeans IDE-t
- Nyissa meg a projectet
- A Projects menüben a project fájl legyen kijelőlve, és akkor a navigátorban megtalálható "**spring-boot:run**"-ra kattintson duplán

#### Weboldal futtatása Visual Studio Code-al
- Nyissa meg a Visual Studio Code-ot
- Nyissa meg a Frontend mappát
- Nyisson egy terminált, majd lépjen a food-delivery mappába a **cd food-delivery** kóddal
- Írja be a következőket:
	- **npm install @angular/cli@6.2.5**
	- **npm install**
- Futassa a weboldalt a **ng serve** paranccsal

#### Weboldal elérése:
- Nyisson egy böngészőt
- Írja be a címsorba, hogy **localhost:4200**
