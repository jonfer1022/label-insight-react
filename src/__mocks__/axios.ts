// src/__mocks__/axios.ts
const mockAxios: any = {
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => mockAxios),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

export default mockAxios;
