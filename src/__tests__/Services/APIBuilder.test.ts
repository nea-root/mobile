import { APIBuilder } from '@/Services/Network/Axios/APIBuilder';
import { APIClient } from '@/Services/Network/Axios/APIClient';

jest.mock('@/Services/Network/Axios/APIClient', () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockRequestInterceptorUse = jest.fn();
  const mockResponseInterceptorUse = jest.fn();
  const mockApi = {
    interceptors: {
      request: { use: mockRequestInterceptorUse },
      response: { use: mockResponseInterceptorUse },
    },
    defaults: { timeout: 0 },
    get: mockGet,
    post: mockPost,
  };
  const APIClientMock = jest.fn().mockImplementation(() => ({
    api: mockApi,
    get: mockGet,
    post: mockPost,
  }));
  return { APIClient: APIClientMock, __mockApi: mockApi, __mockRequestUse: mockRequestInterceptorUse, __mockResponseUse: mockResponseInterceptorUse };
});

const { __mockApi, __mockRequestUse, __mockResponseUse } = require('@/Services/Network/Axios/APIClient');

describe('APIBuilder', () => {
  let builder: APIBuilder;

  beforeEach(() => {
    jest.clearAllMocks();
    builder = new APIBuilder('https://api.example.com');
  });

  it('creates an APIClient on construction', () => {
    expect(APIClient).toHaveBeenCalledWith('https://api.example.com');
  });

  it('exposes the client property', () => {
    expect(builder.client).toBeDefined();
  });

  it('attachRequestInterceptor uses request interceptors and returns builder', () => {
    const onFulfill = jest.fn(req => req);
    const result = builder.attachRequestInterceptor(onFulfill);
    expect(__mockApi.interceptors.request.use).toHaveBeenCalledWith(onFulfill);
    expect(result).toBe(builder);
  });

  it('attachResponseInterceptor uses response interceptors and returns builder', () => {
    const onFulfilled = jest.fn(res => res);
    const onError = jest.fn(err => Promise.reject(err));
    const result = builder.attachResponseInterceptor(onFulfilled, onError);
    expect(__mockApi.interceptors.response.use).toHaveBeenCalledWith(onFulfilled, onError);
    expect(result).toBe(builder);
  });

  it('attachResponseInterceptor with null onError defaults to null', () => {
    const onFulfilled = jest.fn(res => res);
    builder.attachResponseInterceptor(onFulfilled);
    expect(__mockApi.interceptors.response.use).toHaveBeenCalledWith(onFulfilled, null);
  });

  it('setTimeout sets api default timeout and returns builder', () => {
    const result = builder.setTimeout(5000);
    expect(__mockApi.defaults.timeout).toBe(5000);
    expect(result).toBe(builder);
  });

  it('build() returns the APIClient instance', () => {
    const client = builder.build();
    expect(client).toBe(builder.client);
  });

  it('supports method chaining', () => {
    const onFulfill = jest.fn(req => req);
    const onResponse = jest.fn(res => res);
    const client = builder
      .attachRequestInterceptor(onFulfill)
      .attachResponseInterceptor(onResponse)
      .setTimeout(3000)
      .build();
    expect(client).toBe(builder.client);
    expect(__mockApi.defaults.timeout).toBe(3000);
  });
});
