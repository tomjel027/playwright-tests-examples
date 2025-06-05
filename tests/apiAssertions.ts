import { expect, APIResponse } from '@playwright/test';

export async function expectJsonResponse(response, expectedStatus) {
  expect(response.ok(), `Expected ok() to be true but got status ${response.status()}`).toBeTruthy();
  expect(response.status(), `Expected status ${expectedStatus} but got ${response.status()}`).toBe(expectedStatus);
  expect(response.headers()['content-type']).toContain('application/json');
}

export function expectArrayWithIds(data) {
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty('id');
}

export async function expectEmptyJsonResponse(response, expectedStatus = 200) {
  await expectJsonResponse(response, expectedStatus);
  const data = await response.json();
  expect(data).toEqual({});
}

export async function expectMatchingData(response, expected, status = 200) {
  await expectJsonResponse(response, status);
  const data = await response.json();
  expect(data).toMatchObject(expected);
}

export async function expectValidationError(response, expectedFields: string[] = []) {
  expect(response.status()).toBe(400);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error).toHaveProperty('code', 'VALIDATION_ERROR');
  expect(data.error).toHaveProperty('details');

  for (const field of expectedFields) {
    const fieldError = data.error.details.find((d: any) => d.field === field);
    expect(fieldError).toBeDefined();
  }
}

export async function expectNotFoundError(response) {
  expect(response.status()).toBe(404);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('NOT_FOUND');
}

export async function expectUnauthorizedError(response) {
  expect(response.status()).toBe(401);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('UNAUTHORIZED');
}

export async function expectForbiddenError(response) {
  expect(response.status()).toBe(403);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('FORBIDDEN');
}

export async function expectInternalServerError(response) {
  expect(response.status()).toBe(500);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('INTERNAL_SERVER_ERROR');
}

export async function expectConflictError(response) {
  expect(response.status()).toBe(409);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('CONFLICT');
}

export async function expectTimeoutError(response) {
  expect(response.status()).toBe(504);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.code).toBe('TIMEOUT');
}

export async function expectBadRequestWithMessage(response, message) {
  expect(response.status()).toBe(400);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  expect(data.error.message).toContain(message);
}

export async function expectHeadResponse(response, expectedStatus = 200) {
  expect(response.status()).toBe(expectedStatus);
  expect(response.ok()).toBeTruthy();
  const headers = response.headers();
  expect(headers['content-type']).toContain('application/json');
  //expect(headers['content-length']).toBeDefined();
  const body = await response.body();
  expect(body.length).toBe(0);
}

export async function expectHeadNotFoundError(response) {
  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
  const body = await response.body();
  expect(body.length).toBe(0);
}