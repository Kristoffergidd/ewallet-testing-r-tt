import { describe, it, expect } from 'vitest';

describe('MSW Handlers', () => {
  it('should return success for valid card data', async () => {
    // Mock fetch or any other HTTP client if necessary
    const response = await fetch('http://localhost/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: '1234 5678 1234 5678',
        name: 'John Doe',
        expire: '12/34',
        ccv: '123',
        vendor: 'Visa',
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(201); // Check the status code
    expect(data).toEqual({
      Message: "New card created!",
      Response: 'True',
    });
  });

  it('should return error for invalid card data', async () => {
    // For example, sending an empty body
    const response = await fetch('http://localhost/api/cards', {
      method: 'POST',
    });

    const data = await response.json();

    expect(response.status).toBe(400); // Check the status code
    expect(data).toEqual({
      Response: 'False',
      Message: 'Failed to create a new card!',
    });
  });
});