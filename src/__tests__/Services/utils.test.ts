import {
  cognitoErrorHandler,
  generateComplexPassword,
} from '@/Services/Authentication/utils';

describe('cognitoErrorHandler', () => {
  it('returns unknown error message when error is null', () => {
    expect(cognitoErrorHandler(null)).toBe(
      'An unknown error occurred. Please try again.',
    );
  });

  it('returns unknown error message when error has no code', () => {
    expect(cognitoErrorHandler({})).toBe(
      'An unknown error occurred. Please try again.',
    );
    expect(cognitoErrorHandler({message: 'oops'})).toBe(
      'An unknown error occurred. Please try again.',
    );
  });

  it('maps NotAuthorizedException correctly', () => {
    expect(cognitoErrorHandler({code: 'NotAuthorizedException'})).toBe(
      'Incorrect username or password.',
    );
  });

  it('maps UserNotFoundException correctly', () => {
    expect(cognitoErrorHandler({code: 'UserNotFoundException'})).toBe(
      'User does not exist. Please check your username or sign up.',
    );
  });

  it('maps UserNotConfirmedException correctly', () => {
    expect(cognitoErrorHandler({code: 'UserNotConfirmedException'})).toBe(
      'Your account is not confirmed. Check your email for the confirmation link.',
    );
  });

  it('maps PasswordResetRequiredException correctly', () => {
    expect(cognitoErrorHandler({code: 'PasswordResetRequiredException'})).toBe(
      'Password reset is required. Please reset your password before signing in.',
    );
  });

  it('maps InvalidPasswordException correctly', () => {
    expect(cognitoErrorHandler({code: 'InvalidPasswordException'})).toBe(
      'Your password does not meet the complexity requirements. Try a stronger password.',
    );
  });

  it('maps UsernameExistsException correctly', () => {
    expect(cognitoErrorHandler({code: 'UsernameExistsException'})).toBe(
      'This username is already taken. Please choose a different one.',
    );
  });

  it('maps CodeMismatchException correctly', () => {
    expect(cognitoErrorHandler({code: 'CodeMismatchException'})).toBe(
      'Invalid verification code. Please check your email or phone and try again.',
    );
  });

  it('maps ExpiredCodeException correctly', () => {
    expect(cognitoErrorHandler({code: 'ExpiredCodeException'})).toBe(
      'The verification code has expired. Please request a new one.',
    );
  });

  it('maps LimitExceededException correctly', () => {
    expect(cognitoErrorHandler({code: 'LimitExceededException'})).toBe(
      'Too many attempts. Please try again later.',
    );
  });

  it('maps TooManyFailedAttemptsException correctly', () => {
    expect(cognitoErrorHandler({code: 'TooManyFailedAttemptsException'})).toBe(
      'Too many failed attempts. Please try again later.',
    );
  });

  it('maps InternalErrorException correctly', () => {
    expect(cognitoErrorHandler({code: 'InternalErrorException'})).toBe(
      'An internal error occurred. Please try again later.',
    );
  });

  it('maps NetworkError correctly', () => {
    expect(cognitoErrorHandler({code: 'NetworkError'})).toBe(
      'A network error occurred. Please check your internet connection and try again.',
    );
  });

  it('maps InvalidParameterException correctly', () => {
    expect(cognitoErrorHandler({code: 'InvalidParameterException'})).toBe(
      'Invalid input provided. Please check your details and try again.',
    );
  });

  it('maps TooManyRequestsException correctly', () => {
    expect(cognitoErrorHandler({code: 'TooManyRequestsException'})).toBe(
      'Too many requests. Please try again later.',
    );
  });

  it('maps ResourceNotFoundException correctly', () => {
    expect(cognitoErrorHandler({code: 'ResourceNotFoundException'})).toBe(
      'The requested resource was not found.',
    );
  });

  it('maps MFAMethodNotFoundException correctly', () => {
    expect(cognitoErrorHandler({code: 'MFAMethodNotFoundException'})).toBe(
      'No valid MFA method found. Please contact support.',
    );
  });

  it('maps NotAuthorized correctly', () => {
    expect(cognitoErrorHandler({code: 'NotAuthorized'})).toBe(
      'You are not authorized to perform this action.',
    );
  });

  it('maps Unauthorized correctly', () => {
    expect(cognitoErrorHandler({code: 'Unauthorized'})).toBe(
      'You are not authorized to perform this action.',
    );
  });

  it('maps UserLambdaValidationException correctly', () => {
    expect(cognitoErrorHandler({code: 'UserLambdaValidationException'})).toBe(
      'The input failed server validation. Please try again later.',
    );
  });

  it('returns fallback for unknown error code', () => {
    expect(cognitoErrorHandler({code: 'SomeRandomCode'})).toBe(
      'An unexpected error occurred. Please try again.',
    );
  });

  it('returns unknown error when error is undefined', () => {
    expect(cognitoErrorHandler(undefined)).toBe(
      'An unknown error occurred. Please try again.',
    );
  });
});

describe('generateComplexPassword', () => {
  it('generates a password of the specified length', () => {
    expect(generateComplexPassword(12)).toHaveLength(12);
    expect(generateComplexPassword(20)).toHaveLength(20);
    expect(generateComplexPassword(8)).toHaveLength(8);
  });

  it('uses default length of 12', () => {
    expect(generateComplexPassword()).toHaveLength(12);
  });

  it('generates a string from the allowed charset', () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    const pwd = generateComplexPassword(50);
    for (const char of pwd) {
      expect(charset).toContain(char);
    }
  });

  it('generates different passwords on each call (probabilistic)', () => {
    const p1 = generateComplexPassword(16);
    const p2 = generateComplexPassword(16);
    expect(p1).not.toBe(p2);
  });

  it('generates a password of length 1', () => {
    expect(generateComplexPassword(1)).toHaveLength(1);
  });
});
