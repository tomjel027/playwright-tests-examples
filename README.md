# Playwright Testy – JSONPlaceholder & TodoMVC

Automatizované testy REST API pro veřejnou službu [JSONPlaceholder](https://jsonplaceholder.typicode.com/) a UI testy pro [TodoMVC demo](https://demo.playwright.dev/todomvc/#/) pomocí [Playwright Test Runner](https://playwright.dev/test).

---

## Instalace

Nejprve nainstaluj závislosti:

```bash
npm install
```

---

## Spuštění testů

### Spuštění všech testů

```bash
npm test
```

### Spuštění konkrétního API nebo UI testu

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts
npx playwright test tests/todovmc-ui.spec.ts
```
### Spuštění pouze testů pro /posts

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts -g "/posts"
```

### Spuštění pouze testů pro /photos

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts -g "/photos"
```

### Spuštění pouze HEAD testů

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts -g "HEAD"
```

### Spuštění pouze OPTIONS testů

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts -g "OPTIONS"
```

### Spuštění pouze negativních testů

```bash
npx playwright test tests/jsonplaceholder-api.spec.ts -g "Negative"
```

### Grafické rozhraní (UI runner)

```bash
npm run test:ui
```

### Zobrazení testovacího reportu

```bash
npm run test:report
```

---

## Struktura projektu

```
.
├── tests/
│   ├── posts.spec.ts               # Testy pro endpointy /posts
│   ├── photos.spec.ts              # Testy pro endpointy /photos
│   ├── todovmc-ui.spec.ts          # UI testy pro TodoMVC demo
│   └── jsonplaceholder-api.spec.ts # Komplexní API testy včetně negativních testů, HEAD a OPTIONS
├── playwright.config.ts            # Konfigurace Playwrightu
├── package.json
└── README.md
```

---

## Co se testuje

### `/posts` (API)

| HTTP metoda | Endpoint         | Popis                                    |
| ----------- | ----------------| ----------------------------------------- |
| GET         | `/posts`        | Seznam příspěvků                         |
| GET         | `/posts/1`      | Jeden příspěvek                          |
| POST        | `/posts`        | Vytvoření příspěvku                      |
| PUT         | `/posts/1`      | Úplná aktualizace příspěvku              |
| PATCH       | `/posts/1`      | Částečná aktualizace příspěvku           |
| DELETE      | `/posts/1`      | Smazání příspěvku                        |
| HEAD        | `/posts`        | Ověření hlaviček pro všechny příspěvky   |
| HEAD        | `/posts/1`      | Ověření hlaviček pro konkrétní příspěvek |
| OPTIONS     | `/posts`        | Ověření povolených metod                 |

### `/photos` (API)

| HTTP metoda | Endpoint         | Popis                                    |
| ----------- | ----------------| ----------------------------------------- |
| GET         | `/photos`       | Seznam fotek                             |
| GET         | `/photos/1`     | Jedna fotka                              |
| POST        | `/photos`       | Vytvoření nové fotky                     |
| PUT         | `/photos/1`     | Úplná aktualizace fotky                  |
| PATCH       | `/photos/1`     | Částečná aktualizace fotky               |
| DELETE      | `/photos/1`     | Smazání fotky                            |
| HEAD        | `/photos`       | Ověření hlaviček pro všechny fotografie  |
| HEAD        | `/photos/1`     | Ověření hlaviček pro konkrétní fotografii|
| OPTIONS     | `/photos`       | Ověření povolených metod                 |

### Testy hlaviček (API)

| Testovací případ                  | Očekávané chování                                 |
| ----------------------------------| -------------------------------------------------|
| HEAD /posts                       | Ověření hlaviček pro všechny příspěvky            |
| HEAD /posts/1                     | Ověření hlaviček pro konkrétní příspěvek          |
| HEAD /photos                      | Ověření hlaviček pro všechny fotografie           |
| HEAD /photos/1                    | Ověření hlaviček pro konkrétní fotografii         |
| HEAD /unknown                     | Ověření chybové odpovědi pro neexistující endpoint|

### Testy OPTIONS (API)

| Testovací případ                  | Očekávané chování                                 |
| ----------------------------------| -------------------------------------------------|
| OPTIONS /posts                    | Ověření povolených metod pro endpoint /posts      |
| OPTIONS /posts TRACE              | Ověření, že metoda TRACE není povolena            |

### Negativní scénáře (API)

| Testovací případ                  | Očekávané chování                                 |
| ----------------------------------| -------------------------------------------------|
| GET /posts/9999                   | Vrací 404 pro neexistující příspěvek              |
| POST /posts s prázdným tělem      | Vrací 201 (v reálném API by měl být 400)          |
| PUT /posts/1 s neúplnými daty     | Vrací 200 (v reálném API by měl být 400)          |
| PATCH /photos/abc                 | Vrací 200 (v reálném API by měl být 400/404)      |
| DELETE /photos/9999               | Vrací 200 (v reálném API by měl být 404)          |

### TodoMVC (UI)

| Funkce                | Popis                                                                 |
|-----------------------|-----------------------------------------------------------------------|
| Načtení aplikace      | Ověření, že se TodoMVC načte a zobrazí základní prvky                 |
| Přidání úkolu         | Otestuje přidání nového úkolu do seznamu                              |
| Označení jako hotový  | Otestuje označení úkolu jako hotový (checkbox)                       |
| Smazání úkolu         | Otestuje smazání úkolu ze seznamu                                     |
| Filtrování úkolů      | Otestuje filtrování úkolů podle stavu (All / Active / Completed)      |

---

## NPM skripty

V `package.json` jsou nastavené tyto příkazy pro pohodlné spuštění testů:

| Skript        | Popis                                 | Příkaz                |
| ------------- | ------------------------------------- | --------------------- |
| `test`        | Spustí všechny testy                  | `npm test`            |
| `test:ui`     | Spustí Playwright GUI runner          | `npm run test:ui`     |
| `test:single` | Spustí jeden test ručně (dle potřeby) | `npm run test:single` |
| `test:report` | Zobrazí testovací report              | `npm run test:report` |

>  Spuštění konkrétního souboru: `npx playwright test tests/<soubor>.spec.ts`.

---

## Požadavky

* Node.js (v16+ doporučeno)
* Playwright (`@playwright/test`)

---

## Licence

Tento projekt je určen pro vzdělávací a testovací účely. JSONPlaceholder je veřejné fake API – neslouží k reálné produkci.

UI testy využívají veřejnou demo aplikaci TodoMVC na adrese https://demo.playwright.dev/todomvc/#/.
