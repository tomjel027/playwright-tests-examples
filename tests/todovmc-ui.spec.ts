const { test, expect } = require('@playwright/test');

// Testy pro TodoMVC aplikaci
// Základní testy pro přidání, označení a smazání úkolů, filtrování atd.

test.describe('TodoMVC - základní UI testy', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  // Ověření, že se aplikace správně načte a zobrazí základní seznam úkolů
  test('Základní načtení aplikace', async ({ page }) => {
    await expect(page).toHaveTitle('React • TodoMVC'); // Ověření názvu stránky
    await expect(page.locator('.new-todo')).toBeVisible(); // Ověření, že vstup pro nový úkol je viditelný
  });

  // Test přidání nového úkolu do seznamu
  test('Přidání úkolu', async ({ page }) => {
    await page.locator('.new-todo').fill('Programovat'); // Vyplnění vstupu pro nový úkol
    await page.keyboard.press('Enter'); // Stisknutí Enter pro přidání úkolu
    await expect(page.locator('.todo-list li')).toHaveCount(1); // Ověření, že byl přidán jeden úkol
    await expect(page.locator('.todo-list li')).toHaveText(['Programovat']); // Ověření, že text úkolu odpovídá
    await expect(page.locator('.todo-count')).toHaveText('1 item left'); // Ověření počtu zbývajících úkolů
  });

  // Test označení úkolu jako hotový (checkbox)
  test('Označení úkolu jako hotový', async ({ page }) => {
    await page.locator('.new-todo').fill('Testovat'); // Přidání nového úkolu
    await page.keyboard.press('Enter'); // Stisknutí Enter pro přidání úkolu
    await page.locator('.todo-list li .toggle').click();  // Kliknutí na checkbox pro označení úkolu jako hotový
    await expect(page.locator('.todo-list li')).toHaveClass(/completed/); // Ověření, že úkol má třídu "completed"
    await expect(page.locator('.todo-count')).toHaveText('0 items left'); // Ověření, že počet zbývajících úkolů je 0
  });

  // Test smazání úkolu ze seznamu
  test('Smazání úkolu', async ({ page }) => {
    await page.locator('.new-todo').fill('Odpočívat'); // Přidání nového úkolu
    await page.keyboard.press('Enter'); // Stisknutí Enter pro přidání úkolu
    await expect(page.locator('.todo-list li')).toHaveCount(1); // Ověření, že byl přidán jeden úkol
    await page.hover('.todo-list li'); // Najetí myší na úkol, aby se zobrazilo tlačítko pro smazání
    await page.locator('.destroy').click({ force: true });  // Kliknutí na tlačítko pro smazání úkolu
    await expect(page.locator('.todo-list li')).toHaveCount(0); // Ověření, že úkol byl smazán
  });

  // Test filtrování úkolů podle stavu (All / Active / Completed)
  test('Filtrování All / Active / Completed', async ({ page }) => {
    await page.locator('.new-todo').fill('Programovat'); // Přidání aktivního úkolu
    await page.keyboard.press('Enter'); // Stisknutí Enter pro přidání úkolu
    await page.locator('.new-todo').fill('Testovat'); // Přidání hotového úkolu
    await page.keyboard.press('Enter'); // Stisknutí Enter pro přidání úkolu
    await expect(page.locator('.todo-list li')).toHaveCount(2); // Ověření, že byly přidány dva úkoly
    await expect(page.locator('.todo-list li')).toHaveText(['Programovat', 'Testovat']); // Ověření textu obou úkolů
    await expect(page.locator('.todo-count')).toHaveText('2 items left'); // Ověření, že počet zbývajících úkolů je 2
    await page.locator('.todo-list li >> nth=1 >> .toggle').click(); // Kliknutí na checkbox pro označení druhého úkolu jako hotový

    // Filtrovat na "Active"
    await page.locator('text=Active').click(); // Kliknutí na filtr "Active"
    await expect(page.locator('.todo-list li')).toHaveText(['Programovat']); // Ověření, že zobrazený úkol je pouze aktivní
    await expect(page.locator('.todo-count')).toHaveText('1 item left'); // Ověření, že počet zbývajících úkolů je 1

    // Filtrovat na "Completed"
    await page.locator('.filters a:has-text("Completed")').click(); // Kliknutí na filtr "Completed"
    await expect(page.locator('.todo-list li')).toHaveCount(1); // Ověření, že je zobrazen pouze jeden hotový úkol
    await expect(page.locator('.todo-list li')).toHaveText(['Testovat']); // Ověření textu hotového úkolu
    await expect(page.locator('.todo-count')).toHaveText('1 item left'); // Ověření, že počet zbývajících úkolů je 1

    // Filtrovat na "All"
    await page.locator('.filters a:has-text("All")').click(); // Kliknutí na filtr "All"
    await expect(page.locator('.todo-list li')).toHaveCount(2); // Ověření, že jsou zobrazeny oba úkoly
    await expect(page.locator('.todo-list li')).toHaveText(['Programovat', 'Testovat']); // Ověření textu obou úkolů
  });
});
