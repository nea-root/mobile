module.exports = {
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue({
    username: 'testuser',
    password: JSON.stringify({ idToken: {}, accessToken: {}, refreshToken: {}, clockDrift: '' }),
  }),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
};
