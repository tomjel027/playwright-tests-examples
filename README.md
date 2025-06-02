# 📘 Playwright API Testy – JSONPlaceholder

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
npm run test:single
```

### Grafické rozhraní (UI runner)
```bash
npm run test:ui
```

---

## Struktura projektu

```
.
├── tests/
│   └── jsonplaceholder-api.spec.ts       # API testy pro CRUD operace
├── playwright.config.ts                  # Konfigurace Playwrightu
├── package.json
└── README.md
```

---

## Co se testuje

| HTTP metoda | Endpoint          | Popis                          |
|-------------|-------------------|---------------------------------|
| GET         | `/posts`          | Seznam příspěvků               |
| GET         | `/posts/1`        | Jeden příspěvek                |
| POST        | `/posts`          | Vytvoření příspěvku            |
| PUT         | `/posts/1`        | Úplná aktualizace příspěvku    |
| PATCH       | `/posts/1`        | Částečná aktualizace příspěvku |
| DELETE      | `/posts/1`        | Smazání příspěvku              |

---

## NPM skripty

V `package.json` jsou nastavené tyto příkazy pro pohodlné spuštění testů:

| Skript           | Popis                                 | Příkaz                    |
|------------------|----------------------------------------|---------------------------|
| `test`           | Spustí všechny testy                   | `npm test`                |
| `test:ui`        | Spustí Playwright GUI runner           | `npm run test:ui`         |
| `test:single`    | Spustí pouze test `jsonplaceholder-api.spec.ts` | `npm run test:single`     |

---

## Požadavky

- Node.js (v16+ doporučeno)
- Playwright (`@playwright/test`)

---

## Licence

Tento projekt je určen pro vzdělávací a testovací účely. JSONPlaceholder je veřejné fake API – neslouží k reálné produkci.
