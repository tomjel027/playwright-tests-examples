import { test, expect, request } from '@playwright/test';

  let apiContext;

  // Vytvoření API kontextu s baseURL

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

test.describe('JSONPlaceholder API Tests - Posts', () => {
  
  // Test: Získání všech příspěvků

  test('GET /posts', async () => {
    const response = await apiContext.get('/posts');
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy(); // Očekává se pole příspěvků 
    expect(data.length).toBeGreaterThan(0); // Očekává se, že pole není prázdné
    expect(data[0]).toHaveProperty('id'); // Očekává se, že každý příspěvek má ID 
  });

  // Test: Získání jednoho příspěvku podle ID

  test('GET /posts/1', async () => {
    const response = await apiContext.get('/posts/1');
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
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

    const response = await apiContext.post('/posts', {
      data: newPost,
    });

    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(201); // Očekává se, že status kód bude 201 (Created)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    const data = await response.json();
    expect(data).toMatchObject(newPost); // Očekává se, že data budou odpovídat novému příspěvku
    expect(data.title).toBe(newPost.title); // Ověří se, že název odpovídá
    expect(data.body).toBe(newPost.body); // Ověří se, že tělo odpovídá
    expect(data.id).toBeDefined(); // Očekává se, že ID bude definováno
    expect(data.userId).toBe(newPost.userId); // Ověří se, že userId odpovídá 
  });

  // Test: Úplná aktualizace existujícího příspěvku

  test('PUT /posts/1', async () => {
    const updatedPost = {
      id: 1,
      title: 'aktualizovaný název',
      body: 'aktualizované tělo',
      userId: 1,
    };

    const response = await apiContext.put('/posts/1', {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data).toMatchObject(updatedPost); // Očekává se, že data budou odpovídat aktualizovanému příspěvku
  });

  // Test: Částečná aktualizace příspěvku

  test('PATCH /posts/1', async () => {
    const patchData = {
      title: 'aktualizovaný název',
    };
  
    const response = await apiContext.patch('/posts/1', {
      data: patchData,
    });
  
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data.title).toBe(patchData.title); // Očekává se, že název bude aktualizován
    expect(data.body).toBeDefined(); // Očekává se, že tělo zůstane nezměněno
  });

  // Test: Smazání příspěvku

  test('DELETE /posts/1', async () => {
    const response = await apiContext.delete('/posts/1');
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(data).toEqual({}); // Očekává se, že odpověď bude prázdná

  // Ověření, že příspěvek již neexistuje (V reálnám API by to mohlo vrátit 404, pokud by byl příspěvek opravdu smazán)

    /*
    const getResponse = await apiContext.get('/posts/1');
    expect(getResponse.status()).toBe(404); // Očekává se, že status kód bude 404 (Not Found)
    const getData = await getResponse.json();
    expect(getData).toEqual({}); // Očekává se, že odpověď bude prázdná
    */
  });
});

test.describe('JSONPlaceholder API Tests - Photos', () => {

  // Test: Získání všech fotografií

  test('GET /photos', async () => {
    const response = await apiContext.get('/photos');
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy(); // Očekává se pole fotografií
    expect(data.length).toBeGreaterThan(0); // Očekává se, že pole není prázdné
    expect(data[0]).toHaveProperty('id'); // Očekává se, že každá fotografie má ID
  });

  // Test: Získání jedné fotografie podle ID

  test('GET /photos/1', async () => {
    const response = await apiContext.get('/photos/1');
    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    const data = await response.json();
    expect(data.id).toBe(1);  // Očekává se, že fotografie má ID = 1
  });

  // Test: Vytvoření nové fotografie

  test('POST /photos', async () => {
    const newPhoto = {
      albumId: 1,
      title: 'testovací název', 
      url: 'http://test.web.com/photo.jpg',
      thumbnailUrl: 'http://test.web.com/thumb.jpg'
    };

    const response = await apiContext.post('/photos', {
      data: newPhoto,
    });

    expect(response.status()).toBe(201); // Očekává se, že status kód bude 201 (Created)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    const data = await response.json();
    expect(data).toMatchObject(newPhoto); // Očekává se, že data budou odpovídat nové fotografii
    expect(data.title).toBe(newPhoto.title); // Ověří se, že název odpovídá
    expect(data.url).toBe(newPhoto.url); // Ověří se, že URL odpovídá
    expect(data.thumbnailUrl).toBe(newPhoto.thumbnailUrl); // Ověří se, že thumbnailUrl odpovídá
    expect(data).toHaveProperty('id'); // Očekává se, že ID bude definováno
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

    const response = await apiContext.put('/photos/1', {
      data: updatedPhoto,
    });

    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    const data = await response.json();
    expect(data).toMatchObject(updatedPhoto); // Očekává se, že data budou odpovídat aktualizované fotografii
    expect(data.title).toBe(updatedPhoto.title); // Ověří se, že název odpovídá
  });

  // Test: Částečná aktualizace fotografie

  test('PATCH /photos/1', async () => {
    const patchData = {
      title: 'aktualizovaný název'
    };

    const response = await apiContext.patch('/photos/1', {
      data: patchData,
    });

    expect(response.status()).toBe(200); // Očekává se, že status kód bude 200 (OK)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    const data = await response.json();
    expect(data.title).toBe(patchData.title); // Očekává se, že název bude aktualizován
    expect(data.url).toBeDefined(); // Očekává se, že URL zůstane nezměněno
  });

  // Test: Smazání fotografie

  test('DELETE /photos/1', async () => {
    const response = await apiContext.delete('/photos/1');
    expect(response.status()).toBe(200);  // Očekává se, že status kód bude 200 (OK)
    expect(response.headers()['content-type']).toContain('application/json'); // Očekává se JSON odpověď
    expect(response.ok()).toBeTruthy(); // Očekává se, že odpověď bude úspěšná
    const data = await response.json();
    expect(data).toEqual({}); // Očekává se, že odpověď bude prázdná
  });

});
