import { APIClient } from '@/Services/Network/Axios/APIClient';

jest.mock('axios', () => {
  const mockGet = jest.fn().mockResolvedValue({ data: { result: 'ok' }, status: 200 });
  const mockPost = jest.fn().mockResolvedValue({ data: { id: 1 }, status: 201 });
  const mockPut = jest.fn().mockResolvedValue({ data: { updated: true }, status: 200 });
  const mockDelete = jest.fn().mockResolvedValue({ data: null, status: 204 });

  const api = {
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    defaults: { timeout: 0 },
  };

  return {
    create: jest.fn(() => api),
    __api: api,
    __mockGet: mockGet,
    __mockPost: mockPost,
    __mockPut: mockPut,
    __mockDelete: mockDelete,
  };
});

const axios = require('axios');

describe('APIClient', () => {
  let client: APIClient;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new APIClient('https://api.example.com');
  });

  it('creates an axios instance with the given base URL', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({ baseURL: 'https://api.example.com' })
    );
  });

  it('sets responseType to json', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({ responseType: 'json' })
    );
  });

  it('get() calls axios get with correct url', async () => {
    await client.get('/users');
    expect(axios.__api.get).toHaveBeenCalledWith('/users', undefined);
  });

  it('get() calls axios get with config', async () => {
    const config = { headers: { Authorization: 'Bearer token' } };
    await client.get('/users', config);
    expect(axios.__api.get).toHaveBeenCalledWith('/users', config);
  });

  it('post() calls axios post with url and data', async () => {
    const data = { name: 'Alice' };
    await client.post('/users', data);
    expect(axios.__api.post).toHaveBeenCalledWith('/users', data, undefined);
  });

  it('post() calls axios post with config', async () => {
    const data = { name: 'Alice' };
    const config = { timeout: 5000 };
    await client.post('/users', data, config);
    expect(axios.__api.post).toHaveBeenCalledWith('/users', data, config);
  });

  it('put() calls axios put with url and data', async () => {
    const data = { name: 'Bob' };
    await client.put('/users/1', data);
    expect(axios.__api.put).toHaveBeenCalledWith('/users/1', data, undefined);
  });

  it('delete() calls axios delete with url', async () => {
    await client.delete('/users/1');
    expect(axios.__api.delete).toHaveBeenCalledWith('/users/1', undefined);
  });

  it('postFormURLEncoded() calls axios post with stringified data', async () => {
    jest.mock('qs', () => ({ stringify: jest.fn((d) => `mocked=${JSON.stringify(d)}`) }), { virtual: true });
    const data = { username: 'alice', password: 'pass' };
    await client.postFormURLEncoded('/auth', data);
    expect(axios.__api.post).toHaveBeenCalledWith(
      '/auth',
      expect.any(String),
      expect.objectContaining({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
    );
  });

  it('exposes the axios instance as .api', () => {
    expect(client.api).toBeDefined();
    expect(client.api.get).toBeDefined();
  });
});
