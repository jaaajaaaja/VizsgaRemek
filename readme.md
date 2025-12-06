# 🍻 BarSonar Backend API

A **BarSonar** backend API-ja, amely egy NestJS-alapú RESTful szolgáltatást nyújt a kocsma- és bárkereső alkalmazáshoz. Az API felhasználókezelést, helyek (bárok/kocsmák) kezelését, értékeléseket, kommenteket és fotófeltöltést biztosít.

---

## 📋 Tartalomjegyzék

- [Technológiai stack](#-technológiai-stack)
- [Előfeltételek](#-előfeltételek)
- [Telepítés](#-telepítés)
- [Környezeti változók](#-környezeti-változók)
- [Adatbázis beállítása](#-adatbázis-beállítása)
- [Futtatás](#-futtatás)
- [API dokumentáció](#-api-dokumentáció)
- [Projekt struktúra](#-projekt-struktúra)
- [Tesztelés](#-tesztelés)
- [Biztonsági megjegyzések](#-biztonsági-megjegyzések)

---

## 🛠 Technológiai stack

- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Programozási nyelv:** TypeScript
- **Adatbázis:** MySQL
- **ORM:** Prisma
- **Autentikáció:** JWT (JSON Web Tokens)
- **Jelszó titkosítás:** bcrypt
- **Fájlfeltöltés:** Multer
- **Validáció:** class-validator, class-transformer
- **Template engine:** EJS

---

## 📦 Előfeltételek

A projekt futtatásához szükséges:

- **Node.js** (v18 vagy újabb)
- **npm** vagy **yarn**
- **MySQL** adatbázis szerver
- **Prisma CLI** (automatikusan települ a függőségekkel)

---

## 🚀 Telepítés

### 1. Klónozás és függőségek telepítése

```bash
# Klónozd a repository-t
git clone <repository-url>
cd VizsgaRemek_Backend

# Telepítsd a függőségeket
npm install
```

### 2. Környezeti változók beállítása

Hozz létre egy `.env` fájlt a projekt gyökerében:

```env
DATABASE_URL="mysql://felhasznalonev:jelszo@localhost:3306/adatbazis_nev"
JWT_SECRET="titkos_kulcs_ide"
PORT=3000
```

> **Megjegyzés:** A `JWT_SECRET` egy erős, véletlenszerű karakterlánc legyen ha publikálni akarod a weboldalt.

### 3. Adatbázis beállítása

```bash
# Prisma migrációk futtatása
npx prisma migrate dev

# Prisma Client generálása
npx prisma generate
```

---

## 🔧 Környezeti változók

| Változó | Leírás | Kötelező |
|---------|--------|----------|
| `DATABASE_URL` | MySQL adatbázis kapcsolati string | ✅ Igen |
| `JWT_SECRET` | JWT token aláíráshoz használt titkos kulcs | ✅ Igen |
| `PORT` | Szerver port (alapértelmezett: 3000) | ❌ Nem |

---

## 🗄 Adatbázis beállítása

### Adatmodell

Az alkalmazás a következő főbb entitásokat tartalmazza:

- **User** - Felhasználók (id, userName, email, password)
- **Place** - Helyek/Bárok (id, googleplaceID, name, address)
- **Comment** - Kommentek/Értékelések (id, commentText, rating, createdAt, updatedAt)
- **Photo** - Fotók (id, location, type)

### Migrációk

```bash
# Új migráció létrehozása
npx prisma migrate dev --name migracio_neve

# Prisma Studio indítása (adatbázis böngésző, Prisma fiók szükséges hozzá)
npx prisma studio
```

---

## ▶️ Futtatás

### Fejlesztői mód

```bash
npm run start:dev
```

A szerver a `http://localhost:3000` címen lesz elérhető (vagy a `PORT` környezeti változóban megadott porton).

## 📚 API dokumentáció

### Alap URL

```
http://localhost:3000
```

### Autentikáció

A védett végpontokhoz JWT token szükséges. A token a `Authorization` header-ben kell küldeni:

```
Authorization: Bearer <token>
```

---

### 🔐 Autentikáció (`/auth`)

#### Bejelentkezés

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "jelszo123"
}
```

**Válasz:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Profil lekérése

```http
GET /auth/profile
Authorization: Bearer <token>
```

**Válasz:**
```json
{
  "sub": 1,
  "username": "felhasznalonev"
}
```

---

### 👤 Felhasználók (`/user`)

#### Összes felhasználó lekérése

```http
GET /user
```

#### Felhasználó lekérése email alapján

```http
GET /user/:email
```

#### Új felhasználó regisztrálása

```http
POST /user
Content-Type: application/json

{
  "userName": "FelhasznaloNev",
  "email": "user@example.com",
  "password": "jelszo123"
}
```

#### Felhasználó frissítése

```http
PUT /user/:id
Content-Type: application/json

{
  "userName": "UjNev",
  "email": "ujemail@example.com"
}
```

#### Felhasználó törlése

```http
DELETE /user/:id
```

---

### 📍 Helyek (`/place`)

#### Összes hely lekérése

```http
GET /place
```

#### Hely lekérése ID alapján

```http
GET /place/:id
```

#### Új hely hozzáadása

```http
POST /place
Content-Type: application/json

{
  "googleplaceID": "ChIJN1t_tDeuEmsRUsoyG83frY4",
  "name": "Kocsma Neve",
  "address": "Budapest, Fő utca 1."
}
```

#### Hely frissítése

```http
PUT /place/:id
Content-Type: application/json

{
  "name": "Frissített Név",
  "address": "Új cím"
}
```

#### Hely törlése

```http
DELETE /place/:id
```

---

### 💬 Kommentek (`/comment`)

#### Összes komment lekérése

```http
GET /comment
```

#### Komment lekérése ID alapján

```http
GET /comment/:id
```

#### Felhasználó összes kommentje

```http
GET /comment/findAllByUser/:userID
```

#### Hely összes kommentje

```http
GET /comment/findAllByPlace/:placeID
```

#### Új komment hozzáadása

```http
POST /comment
Content-Type: application/json

{
  "commentText": "Nagyszerű hely!",
  "rating": 5,
  "userID": 1,
  "placeID": 1
}
```

#### Komment frissítése

```http
PUT /comment/:id
Content-Type: application/json

{
  "commentText": "Frissített komment",
  "rating": 4
}
```

#### Komment törlése

```http
DELETE /comment/:id
```

---

### 📸 Fotók (`/photo`)

#### Összes fotó lekérése

```http
GET /photo
```

#### Fotó lekérése ID alapján

```http
GET /photo/:id
```

#### Felhasználó összes fotója

```http
GET /photo/getAllByUser/:userID
```

#### Hely összes fotója

```http
GET /photo/getAllByPlace/:placeID
```

#### Fotó feltöltése

```http
POST /photo
Content-Type: multipart/form-data

file: [kép fájl]
userID: 1
placeID: 1
```

**Megjegyzések:**
- Maximum 3 fájl tölthető fel egyszerre
- Engedélyezett formátumok: JPEG, PNG, GIF
- Maximum fájlméret: 2 MB
- A feltöltött fájlok az `uploads/` mappában kerülnek tárolásra

**Válasz:**
```json
{
  "message": "File uploaded successfully",
  "images": [
    {
      "id": 1,
      "location": "1234567890.jpg",
      "type": "image/jpeg",
      "userID": 1,
      "placeID": 1
    }
  ]
}
```

#### Fotó törlése

```http
DELETE /photo/:id
```

---

### Statikus fájlok

A feltöltött képek elérése:

```
http://localhost:3000/uploads/<fájlnév>
```

---

## 📁 Projekt struktúra

```
VizsgaRemek_Backend/
├── src/
│   ├── auth/              # Autentikáció modul
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── auth.module.ts
│   ├── user/              # Felhasználó modul
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.module.ts
│   │   └── dto/
│   ├── place/             # Helyek modul
│   │   ├── place.controller.ts
│   │   ├── place.service.ts
│   │   ├── place.module.ts
│   │   └── dto/
│   ├── comment/           # Komment modul
│   │   ├── comment.controller.ts
│   │   ├── comment.service.ts
│   │   ├── comment.module.ts
│   │   └── dto/
│   ├── photo/             # Fotó modul
│   │   ├── photo.controller.ts
│   │   ├── photo.service.ts
│   │   ├── photo.module.ts
│   │   └── dto/
│   ├── prisma/            # Prisma modul
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── common/            # Közös validátorok
│   ├── app.module.ts      # Fő modul
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts            # Alkalmazás belépési pont
├── prisma/
│   ├── schema.prisma      # Prisma séma
│   └── migrations/        # Adatbázis migrációk
├── uploads/               # Feltöltött fájlok
├── public/                # Statikus fájlok
├── views/                 # EJS template-ek
├── test/                  # E2E tesztek
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Tesztelés

### Unit tesztek

```bash
npm run test
```

### Tesztek watch módban

```bash
npm run test:watch
```

### Teszt lefedettség

```bash
npm run test:cov
```

### E2E tesztek

```bash
npm run test:e2e
```

---

## 🔒 Biztonsági megjegyzések

### ⚠️ Fontos!

1. **CORS:** A jelenlegi beállítás minden eredetű kérést engedélyez (`origin: '*'`). Éles környezetben korlátozd a megengedett eredeteket.

2. **JWT Secret:** Használj erős, véletlenszerű JWT secret-et éles környezetben.

3. **Fájlfeltöltés:** 
   - A fájlméret korlátozva van (2 MB)
   - Csak bizonyos fájltípusok engedélyezettek
   - Érdemes lehet vírusellenőrzést is implementálni

4. **Validáció:** A DTO-k validációja a `ValidationPipe` segítségével történik.

---

---

## 📝 További információk

- **NestJS dokumentáció:** https://docs.nestjs.com/
- **Prisma dokumentáció:** https://www.prisma.io/docs
- **JWT:** https://jwt.io/

---

## 👥 Hozzájárulás

A projekt fejlesztése során kérjük, hogy:
1. Fork-old a repository-t
2. Hozz létre egy feature branch-et (`git checkout -b feature/uj-funkcio`)
3. Commit-old a változtatásaidat (`git commit -m 'Hozzáadva: új funkció'`)
4. Push-old a branch-et (`git push origin feature/uj-funkcio`)
5. Nyiss egy Pull Request-et

---

## 📄 Licenc

Ez a projekt privát és nem licencelt.


**Készítve:** BarSonar fejlesztői csapat  
**Verzió:** 0.0.1
