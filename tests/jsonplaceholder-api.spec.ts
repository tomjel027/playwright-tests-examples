import { test, expect, request, APIResponse } from '@playwright/test';
import {
  expectJsonResponse,
  expectArrayWithIds,
  expectEmptyJsonResponse,
  expectMatchingData,
  expectValidationError,
  expectInternalServerError,
  expectNotFoundError,
  expectUnauthorizedError,
  expectForbiddenError,
  expectBadRequestWithMessage,
  expectConflictError,
  expectTimeoutError,
  expectHeadResponse,
  expectHeadNotFoundError,
  expectOptionsResponse,
  expectOptionsDisallow,
  expectOptionsAvailable,
  safeExpectJsonResponse,
  logResponseIfFailed
} from './apiAssertions'; // Import pomocných funkcí pro testování API

let apiContext;

// Vytvoření API kontextu s baseURL

test.beforeAll(async ({ playwright }) => {
  apiContext = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
});

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.error(`Test selhal: ${testInfo.title}`);
  }
});

test.describe('JSONPlaceholder API Tests - Posts', () => {

  // Test: Získání všech příspěvků - error
  
    test('GET /posts - error', async ({}, testInfo) => {
      const response = await apiContext.get('/posts');
      await safeExpectJsonResponse(response, 500);
      const data = await response.json();
      expectArrayWithIds(data);
      await logResponseIfFailed(testInfo, response);
  });
  
  // Test: Získání všech příspěvků

  test('GET /posts', async () => {
    const response = await apiContext.get('/posts');
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expectArrayWithIds(data); // Očekává se, že data budou pole s příspěvky, které mají ID
  });

  // Test: Získání jednoho příspěvku podle ID

  test('GET /posts/1', async () => {
    const response = await apiContext.get('/posts/1');
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data.id).toBe(1); // Očekává se, že příspěvek má ID = 1
  });

  // Test: Vytvoření nového příspěvku

  test('POST /posts', async () => {
    const newPost = {
      title: 'testovací název',
      body: 'testovací tělo',
      userId: 1,
    };

    const response = await apiContext.post('/posts', { data: newPost });
    await expectMatchingData(response, newPost, 201); // Očekává se, že status kód bude 201 (Created)
    const data = await response.json();
    expect(data.id).toBeDefined();  // Očekává se, že ID bude definováno

  });

  // Test: Úplná aktualizace existujícího příspěvku

  test('PUT /posts/1', async () => {
    const updatedPost = {
      id: 1,
      title: 'aktualizovaný název',
      body: 'aktualizované tělo',
      userId: 1,
    };

    const response = await apiContext.put('/posts/1', { data: updatedPost });
    await expectMatchingData(response, updatedPost); // Očekává se, že status kód bude 200 (OK) 
  });

  // Test: Částečná aktualizace příspěvku

  test('PATCH /posts/1', async () => {
    const patchData = { title: 'aktualizovaný název' };
    const response = await apiContext.patch('/posts/1', { data: patchData });
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data.title).toBe(patchData.title); // Očekává se, že název bude aktualizován
    expect(data.body).toBeDefined(); // Očekává se, že tělo zůstane nezměněno
    expect(data.userId).toBeDefined(); // Očekává se, že userId zůstane nezměněno
  });

  // Test: Smazání příspěvku

  test('DELETE /posts/1', async () => {
    const response = await apiContext.delete('/posts/1');
    await expectEmptyJsonResponse(response); // Očekává se, že status kód bude 200 (OK) a odpověď bude prázdná
  });
});

test.describe('JSONPlaceholder API Tests - Photos', () => {

  // Test: Získání všech fotografií

  test('GET /photos', async () => {
    const response = await apiContext.get('/photos');
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expectArrayWithIds(data); // Očekává se, že data budou pole s fotografiemi, které mají ID
  });

  // Test: Získání jedné fotografie podle ID

  test('GET /photos/1', async () => {
    const response = await apiContext.get('/photos/1');
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data.id).toBe(1); // Očekává se, že fotografie má ID = 1
  });

  // Test: Vytvoření nové fotografie

  test('POST /photos', async () => {
    const newPhoto = {
      albumId: 1,
      title: 'testovací název',
      url: 'http://test.web.com/photo.jpg',
      thumbnailUrl: 'http://test.web.com/thumb.jpg'
    };

    const response = await apiContext.post('/photos', { data: newPhoto });
    await expectMatchingData(response, newPhoto, 201); // Očekává se, že status kód bude 201 (Created)
    const data = await response.json();
    expect(data.id).toBeDefined(); // Očekává se, že ID bude definováno
  });

  // Test: Úplná aktualizace existující fotografie

  test('PUT /photos/1', async () => {
    const updatedPhoto = {
      id: 1,
      albumId: 1,
      title: 'aktualizovaný název',
      url: 'http://test.web.com/photo-upraveno.jpg',
      thumbnailUrl: 'http://test.web.com/thumb-upraveno.jpg'
    };

    const response = await apiContext.put('/photos/1', { data: updatedPhoto });
    await expectMatchingData(response, updatedPhoto); // Očekává se, že status kód bude 200 (OK)
  });

  // Test: Částečná aktualizace fotografie

  test('PATCH /photos/1', async () => {
    const patchData = { title: 'aktualizovaný název' };
    const response = await apiContext.patch('/photos/1', { data: patchData });
    await expectJsonResponse(response, 200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data.title).toBe(patchData.title); // Očekává se, že název bude aktualizován
    expect(data.url).toBeDefined(); // Očekává se, že URL zůstane nezměněno
    expect(data.thumbnailUrl).toBeDefined(); // Očekává se, že thumbnail URL zůstane nezměněno 
  });

  // Test: Smazání fotografie

  test('DELETE /photos/1', async () => {
    const response = await apiContext.delete('/photos/1');
    await expectEmptyJsonResponse(response); // Očekává se, že status kód bude 200 (OK) a odpověď bude prázdná
  });
});

// Testy pro hlavičky API

test.describe('JSONPlaceholder API Tests - Headers', () => {

  // Test: Ověření hlaviček pro všechny příspěvky

  test(`HEAD /posts`, async () => {
    const response = await apiContext.fetch('/posts', { method: 'HEAD' });
    await expectHeadResponse(response); // Očekává se, že hlavičky budou správně nastaveny
  });

  // Test: Ověření hlaviček pro konkrétní příspěvek

  test(`HEAD /posts/1`, async () => {
    const response = await apiContext.fetch('/posts/1', { method: 'HEAD' });
    await expectHeadResponse(response); // Očekává se, že hlavičky budou správně nastaveny
  });

  // Test: Ověření hlaviček pro všechny fotografie

  test(`HEAD /photos`, async () => {
    const response = await apiContext.fetch('/photos', { method: 'HEAD' });
    await expectHeadResponse(response); // Očekává se, že hlavičky budou správně nastaveny
  });

  // Test: Ověření hlaviček pro konkrétní fotografii

  test(`HEAD /photos/1`, async () => {
    const response = await apiContext.fetch('/photos/1', { method: 'HEAD' });
    await expectHeadResponse(response); // Očekává se, že hlavičky budou správně nastaveny
  });

  // Test: Ověření hlaviček pro neexistující endpoint

  test(`HEAD /unknown` , async () => {
    const response = await apiContext.fetch('/unknown', { method: 'HEAD' });
    await expectHeadNotFoundError(response); // Očekává se, že status kód bude 404 (Not Found)
  });
});

// Testy pro OPTIONS metody

test.describe('JSONPlaceholder API Tests - Options', () => {

  // Test: Ověření povolených metod

  test('OPTIONS /posts', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'OPTIONS',
    });

    await expectOptionsAvailable(response); // Očekává se, že server vrátí povolené metody
  });

  // Test: Ověření, že OPTIONS /posts neobsahuje metodu TRACE

  test('OPTIONS /posts TRACE', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'OPTIONS',
    });

    await expectOptionsDisallow(response, ['TRACE']); // Očekává se, že server neumožňuje metodu TRACE
  });
});

// Testy pro negativní scénáře

test.describe('JSONPlaceholder API Tests - Negative', () => {

  // Test: Neexistující příspěvek

  test('GET /posts/9999', async () => {
    const response = await apiContext.get('/posts/9999');
    //await expectNotFoundError(response);
    //expect(response.status()).toBe(404); // Očekává se, že status kód bude 404 (Not Found)
    expect(response.status()).toBe(404);
  });

  // Test: Volání s empty body

  test('POST /posts', async () => {
    const response = await apiContext.post('/posts', {
      data: {},
    });
    // JSONPlaceholder vrací 201, ale v reálném API by to byl 400
    // await expectValidationError(response, ['title', 'body', 'userId']);
    expect(response.status()).toBeGreaterThanOrEqual(200); // Očekává se, že status kód bude 200 nebo vyšší
  });

  // Test: Bez kompletních dat

  test('PUT /posts/1', async () => {
    const response = await apiContext.put('/posts/1', {
      data: { title: 'neplatný update' },
    });
    // JSONPlaceholder vrací 200, ale v reálném API by to byl 400
    // await expectBadRequestWithMessage(response, 'Invalid input data');
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
  });

  // Test: Nevalidní ID

  test('PATCH /photos/abc', async () => {
    const response = await apiContext.patch('/photos/abc', {
      data: { title: 'aktualizovaný název' },
    });
    // JSONPlaceholder vrací 200, ale v reálném API by to byl 500
    // await expectInternalServerError(response);
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
  });

  // Test: Smazání neexistující fotografie

  test('DELETE /photos/9999', async () => {
    const response = await apiContext.delete('/photos/9999');
    // JSONPlaceholder vrací 200, ale v reálném API by to byl 404
    // await expectNotFoundError(response);
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK) 
  });
});
