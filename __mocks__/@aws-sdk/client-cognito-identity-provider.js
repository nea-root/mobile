const mockSend = jest.fn().mockResolvedValue({ $metadata: { httpStatusCode: 200 } });

const CognitoIdentityProviderClient = jest.fn().mockImplementation(() => ({
  send: mockSend,
}));

const ChangePasswordCommand = jest.fn();

module.exports = { CognitoIdentityProviderClient, ChangePasswordCommand, mockSend };
