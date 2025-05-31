# 📘 Playwright API Testy – JSONPlaceholder

Automatizované testy REST API pro veřejnou službu [JSONPlaceholder](https://jsonplaceholder.typicode.com/) pomocí [Playwright Test Runner](https://playwright.dev/test).

---

## 📦 Instalace

Nejprve nainstaluj závislosti:

```bash
npm install
```

---

## 🚀 Spuštění testů

### ✅ Spuštění všech testů
```bash
npx playwright test
```

### 🧪 Spuštění konkrétního testu
```bash
npx playwright test tests/jsonplaceholder-api.spec.ts
```

### 👀 Grafické rozhraní (UI runner)
```bash
npx playwright test --ui
```

---

## 🧱 Struktura projektu

```
.
├── tests/
│   └── jsonplaceholder-api.spec.ts       # API testy pro CRUD operace
├── playwright.config.ts                  # Konfigurace Playwrightu
├── package.json
└── README.md
```

---

## 🧪 Co se testuje

| HTTP metoda | Endpoint          | Popis                   |
|-------------|-------------------|--------------------------|
| GET         | `/posts`          | Seznam příspěvků        |
| GET         | `/posts/1`        | Jeden příspěvek         |
| POST        | `/posts`          | Vytvoření příspěvku     |
| PUT         | `/posts/1`        | Úprava příspěvku        |
| DELETE      | `/posts/1`        | Smazání příspěvku       |

---

## 📚 Požadavky

- Node.js (v16+ doporučeno)
- Playwright (`@playwright/test`)

---

## 📄 Licence

Tento projekt je určen pro vzdělávací a testovací účely. JSONPlaceholder je veřejné fake API – neslouží k reálné produkci.