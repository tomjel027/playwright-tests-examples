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