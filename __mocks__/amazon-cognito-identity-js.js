const mockAuthenticateUser = jest.fn();
const mockConfirmRegistration = jest.fn();
const mockResendConfirmationCode = jest.fn();
const mockSignUp = jest.fn();
const mockForgotPassword = jest.fn();
const mockConfirmPassword = jest.fn();

const CognitoUser = jest.fn().mockImplementation(() => ({
  authenticateUser: mockAuthenticateUser,
  confirmRegistration: mockConfirmRegistration,
  resendConfirmationCode: mockResendConfirmationCode,
  forgotPassword: mockForgotPassword,
  confirmPassword: mockConfirmPassword,
}));

const CognitoUserPool = jest.fn().mockImplementation(() => ({
  signUp: mockSignUp,
}));

const AuthenticationDetails = jest.fn();
const CognitoUserAttribute = jest.fn().mockImplementation(({ Name, Value }) => ({ Name, Value }));

module.exports = {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute,
  mockAuthenticateUser,
  mockConfirmRegistration,
  mockResendConfirmationCode,
  mockSignUp,
  mockForgotPassword,
  mockConfirmPassword,
};
