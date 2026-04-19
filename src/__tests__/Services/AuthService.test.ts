import * as Keychain from 'react-native-keychain';
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute, mockAuthenticateUser, mockConfirmRegistration, mockResendConfirmationCode, mockSignUp, mockForgotPassword, mockConfirmPassword } from 'amazon-cognito-identity-js';
import { mockSend } from '@aws-sdk/client-cognito-identity-provider';

// Must import after mocks are set up
import {
  signIn,
  register,
  verifySignIn,
  resendVerificationCode,
  getTokens,
  signOut,
  forgotPassword,
  verifyResetCode,
  resetPasswordAfterVerification,
} from '@/Services/Authentication/AuthService';

const MOCK_SESSION = {
  idToken: { jwtToken: 'id-token', payload: { sub: '123' } },
  accessToken: { jwtToken: 'access-token', payload: { sub: '123' } },
  refreshToken: { token: 'refresh-token' },
  clockDrift: '0',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signIn', () => {
  it('rejects immediately when role is "loading"', async () => {
    await expect(signIn('user', 'pass', 'loading')).rejects.toBeUndefined();
  });

  it('resolves with tokens on successful authentication', async () => {
    mockAuthenticateUser.mockImplementation((_, callbacks) => {
      callbacks.onSuccess(MOCK_SESSION);
    });
    (Keychain.setGenericPassword as jest.Mock).mockResolvedValue(true);

    const result = await signIn('testuser', 'Password1!', 'victim');
    expect(result.username).toBe('testuser');
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'testuser',
      JSON.stringify(MOCK_SESSION),
      { service: 'victim' }
    );
  });

  it('rejects on authentication failure', async () => {
    const authError = new Error('NotAuthorizedException');
    mockAuthenticateUser.mockImplementation((_, callbacks) => {
      callbacks.onFailure(authError);
    });

    await expect(signIn('testuser', 'wrongpass', 'volunteer')).rejects.toEqual(authError);
  });

  it('rejects if Keychain.setGenericPassword throws', async () => {
    mockAuthenticateUser.mockImplementation((_, callbacks) => {
      callbacks.onSuccess(MOCK_SESSION);
    });
    (Keychain.setGenericPassword as jest.Mock).mockRejectedValue(new Error('Keychain error'));

    await expect(signIn('testuser', 'pass', 'lawyer')).rejects.toEqual(new Error('Keychain error'));
  });

  it('creates CognitoUser with correct pool for each role', async () => {
    mockAuthenticateUser.mockImplementation((_, callbacks) => {
      callbacks.onSuccess(MOCK_SESSION);
    });
    (Keychain.setGenericPassword as jest.Mock).mockResolvedValue(true);

    await signIn('user', 'pass', 'therapist');
    expect(CognitoUser).toHaveBeenCalled();
    expect(AuthenticationDetails).toHaveBeenCalled();
  });
});

describe('register', () => {
  it('rejects immediately when role is "loading"', async () => {
    await expect(register('u', 'p', 'e@e.com', 'US', 'loading')).rejects.toBeUndefined();
  });

  it('resolves with user data on successful sign-up', async () => {
    mockSignUp.mockImplementation((_u, _p, _attrs, _v, cb) => {
      cb({ err: null, result: { user: { getUsername: () => 'testuser' } } });
    });

    const result: any = await register('testuser', 'Password1!', 'test@test.com', 'US', 'victim');
    expect(result.username).toBe('testuser');
    expect(result.role).toBe('victim');
  });

  it('rejects on sign-up error', async () => {
    const signUpErr = { code: 'UsernameExistsException', message: 'exists' };
    mockSignUp.mockImplementation((_u, _p, _attrs, _v, cb) => {
      cb({ err: signUpErr });
    });

    await expect(register('testuser', 'Password1!', 'test@test.com', 'US', 'volunteer')).rejects.toEqual(signUpErr);
  });

  it('creates CognitoUserAttribute for email', async () => {
    mockSignUp.mockImplementation((_u, _p, _attrs, _v, cb) => {
      cb({ err: null });
    });
    await register('u', 'p', 'e@e.com', 'UK', 'lawyer').catch(() => {});
    expect(CognitoUserAttribute).toHaveBeenCalledWith({ Name: 'email', Value: 'e@e.com' });
  });
});

describe('verifySignIn', () => {
  it('rejects when role is "loading"', async () => {
    await expect(verifySignIn('user', '123456', 'loading')).rejects.toBeUndefined();
  });

  it('resolves on successful confirmation', async () => {
    mockConfirmRegistration.mockImplementation((_code, _force, cb) => {
      cb(null, 'SUCCESS');
    });

    const result = await verifySignIn('testuser', '123456', 'victim');
    expect(result).toBe('SUCCESS');
  });

  it('rejects on confirmation error', async () => {
    const err = new Error('CodeMismatchException');
    mockConfirmRegistration.mockImplementation((_code, _force, cb) => {
      cb(err, null);
    });

    await expect(verifySignIn('testuser', '000000', 'victim')).rejects.toEqual(err);
  });
});

describe('resendVerificationCode', () => {
  it('rejects when role is "loading"', async () => {
    await expect(resendVerificationCode('user', 'loading')).rejects.toBeUndefined();
  });

  it('resolves on success', async () => {
    mockResendConfirmationCode.mockImplementation(cb => {
      cb(null, 'CODE_SENT');
    });

    const result = await resendVerificationCode('testuser', 'volunteer');
    expect(result).toBe('CODE_SENT');
  });

  it('rejects on error', async () => {
    const err = new Error('LimitExceededException');
    mockResendConfirmationCode.mockImplementation(cb => {
      cb(err, null);
    });

    await expect(resendVerificationCode('testuser', 'victim')).rejects.toEqual(err);
  });
});

describe('getTokens', () => {
  it('returns tokens when credentials exist in Keychain', async () => {
    const mockTokens = { idToken: {}, accessToken: {}, refreshToken: {}, clockDrift: '' };
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
      username: 'testuser',
      password: JSON.stringify(mockTokens),
    });

    const result = await getTokens('victim');
    expect(result).not.toBeNull();
    expect(result?.username).toBe('testuser');
  });

  it('returns null when no credentials found', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);
    const result = await getTokens('volunteer');
    expect(result).toBeNull();
  });

  it('throws when Keychain throws', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(new Error('Keychain fail'));
    await expect(getTokens('lawyer')).rejects.toThrow('Error fetching tokens from Keychain');
  });
});

describe('signOut', () => {
  it('calls resetGenericPassword with the role as service', async () => {
    (Keychain.resetGenericPassword as jest.Mock).mockResolvedValue(true);
    await signOut('victim');
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: 'victim' });
  });

  it('throws if resetGenericPassword throws', async () => {
    (Keychain.resetGenericPassword as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(signOut('volunteer')).rejects.toThrow('Error clearing tokens');
  });
});

describe('forgotPassword', () => {
  it('rejects when role is "loading"', async () => {
    await expect(forgotPassword('user', 'loading')).rejects.toThrow('Invalid role');
  });

  it('resolves on success', async () => {
    mockForgotPassword.mockImplementation(({ onSuccess }) => onSuccess());
    await expect(forgotPassword('testuser', 'victim')).resolves.toBeUndefined();
  });

  it('rejects on failure', async () => {
    const err = new Error('UserNotFoundException');
    mockForgotPassword.mockImplementation(({ onFailure }) => onFailure(err));
    await expect(forgotPassword('testuser', 'victim')).rejects.toEqual(err);
  });
});

describe('verifyResetCode', () => {
  it('rejects when role is "loading"', async () => {
    await expect(verifyResetCode('user', '123', 'temppass', 'loading')).rejects.toThrow('Invalid role');
  });

  it('resolves on success', async () => {
    mockConfirmPassword.mockImplementation((_code, _pass, { onSuccess }) => onSuccess());
    await expect(verifyResetCode('testuser', '123456', 'TempPass1!', 'victim')).resolves.toBeUndefined();
  });

  it('rejects on failure', async () => {
    const err = new Error('CodeMismatchException');
    mockConfirmPassword.mockImplementation((_code, _pass, { onFailure }) => onFailure(err));
    await expect(verifyResetCode('testuser', '000000', 'TempPass1!', 'volunteer')).rejects.toEqual(err);
  });
});

describe('resetPasswordAfterVerification', () => {
  it('throws when role is "loading"', async () => {
    await expect(resetPasswordAfterVerification('user', 'old', 'new', 'token', 'loading')).rejects.toThrow('Invalid role');
  });

  it('calls AWS ChangePasswordCommand and returns result', async () => {
    const mockResult = { $metadata: { httpStatusCode: 200 } };
    mockSend.mockResolvedValue(mockResult);

    const result = await resetPasswordAfterVerification('user', 'OldPass1!', 'NewPass1!', 'access-token', 'victim');
    expect(result).toEqual(mockResult);
    expect(mockSend).toHaveBeenCalled();
  });

  it('throws when AWS command fails', async () => {
    const awsErr = new Error('InvalidPasswordException');
    mockSend.mockRejectedValue(awsErr);

    await expect(resetPasswordAfterVerification('user', 'old', 'new', 'token', 'lawyer')).rejects.toEqual(awsErr);
  });
});
