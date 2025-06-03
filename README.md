# Playwright API Testy – JSONPlaceholder

Automatizované testy REST API pro veřejnou službu [JSONPlaceholder](https://jsonplaceholder.typicode.com/) pomocí [Playwright Test Runner](https://playwright.dev/test).

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

### Spuštění konkrétního testu

```bash
npx playwright test tests/posts.spec.ts
npx playwright test tests/photos.spec.ts
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
│   ├── posts.spec.ts          # Testy pro endpointy /posts
│   └── photos.spec.ts         # Testy pro endpointy /photos
├── playwright.config.ts       # Konfigurace Playwrightu
├── package.json
└── README.md
```

---

## Co se testuje

### `/posts`

| HTTP metoda | Endpoint   | Popis                          |
| ----------- | ---------- | ------------------------------ |
| GET         | `/posts`   | Seznam příspěvků               |
| GET         | `/posts/1` | Jeden příspěvek                |
| POST        | `/posts`   | Vytvoření příspěvku            |
| PUT         | `/posts/1` | Úlpná aktualizace příspěvku    |
| PATCH       | `/posts/1` | Částečná aktualizace příspěvku |
| DELETE      | `/posts/1` | Smazání příspěvku              |

### `/photos`

| HTTP metoda | Endpoint    | Popis                      |
| ----------- | ----------- | -------------------------- |
| GET         | `/photos`   | Seznam fotek               |
| GET         | `/photos/1` | Jedna fotka                |
| POST        | `/photos`   | Vytvoření nové fotky       |
| PUT         | `/photos/1` | Úlpná aktualizace fotky    |
| PATCH       | `/photos/1` | Částečná aktualizace fotky |
| DELETE      | `/photos/1` | Smazání fotky              |

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
