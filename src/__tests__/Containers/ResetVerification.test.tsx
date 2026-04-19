import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ResetVerification from '@/Containers/Authentication/Reset/ResetVerification';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  verifyResetCode: jest.fn(),
  signIn: jest.fn(),
  getTokens: jest.fn().mockResolvedValue({
    tokens: { accessToken: { jwtToken: 'access-token', payload: {} } },
    username: 'alice',
  }),
  signOut: jest.fn().mockResolvedValue(undefined),
  resendVerificationCode: jest.fn().mockResolvedValue('CODE_SENT'),
}));

jest.mock('@/Services/Authentication/utils', () => ({
  cognitoErrorHandler: jest.fn((e) => e?.code || 'Unknown error'),
  generateComplexPassword: jest.fn(() => 'TempPass123!'),
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({ login: jest.fn() }),
}));

jest.mock('@/Components/OTPInput/OTPInput', () => {
  const { View, TouchableOpacity, Text } = require('react-native');
  return ({ onSubmit, handleReset }: any) => (
    <View>
      <TouchableOpacity testID="submit-otp" onPress={() => onSubmit('123456')}>
        <Text>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="submit-short" onPress={() => onSubmit('12345')}>
        <Text>Short</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="resend-otp" onPress={handleReset}>
        <Text>Resend</Text>
      </TouchableOpacity>
    </View>
  );
});

const mockShowAlert = jest.fn();
const mockHideModal = jest.fn();
const alertCtxValue = {
  alertModalData: { isShow: false, title: '', description: '', actions: [] },
  showAlert: mockShowAlert,
  hideModal: mockHideModal,
};

const mockRoute = {
  params: {
    formData: { username: 'alice', email: 'alice@test.com', password: 'Pass1!', role: 'victim' },
  },
};

const renderResetVerification = () =>
  render(
    <AlertModalProvider.Provider value={alertCtxValue}>
      <ResetVerification route={mockRoute} />
    </AlertModalProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('ResetVerification screen', () => {
  it('renders without crashing', () => {
    expect(() => renderResetVerification()).not.toThrow();
  });

  it('calls verifyResetCode with OTP on full-length submit', async () => {
    const { verifyResetCode } = require('@/Services/Authentication/AuthService');
    const { signIn } = require('@/Services/Authentication/AuthService');
    (verifyResetCode as jest.Mock).mockResolvedValue(undefined);
    (signIn as jest.Mock).mockResolvedValue({});

    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(verifyResetCode).toHaveBeenCalledWith('alice', '123456', 'TempPass123!', 'victim');
  });

  it('navigates to ResetPassword after successful verification', async () => {
    const { verifyResetCode, signIn } = require('@/Services/Authentication/AuthService');
    (verifyResetCode as jest.Mock).mockResolvedValue(undefined);
    (signIn as jest.Mock).mockResolvedValue({});

    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(mockNavigate).toHaveBeenCalledWith('ResetPassword', expect.any(Object));
  });

  it('does not call verifyResetCode for short OTP', async () => {
    const { verifyResetCode } = require('@/Services/Authentication/AuthService');
    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-short'));
    });
    expect(verifyResetCode).not.toHaveBeenCalled();
  });

  it('shows alert when verifyResetCode fails', async () => {
    const { verifyResetCode } = require('@/Services/Authentication/AuthService');
    (verifyResetCode as jest.Mock).mockRejectedValue({ code: 'CodeMismatchException' });

    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'Error', expect.any(String), expect.any(Array));
  });

  it('calls resendVerificationCode on handleReset', async () => {
    const { resendVerificationCode } = require('@/Services/Authentication/AuthService');
    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('resend-otp'));
    });
    expect(resendVerificationCode).toHaveBeenCalledWith('alice', 'victim');
  });

  it('shows alert when resend fails', async () => {
    const { resendVerificationCode } = require('@/Services/Authentication/AuthService');
    (resendVerificationCode as jest.Mock).mockRejectedValue({ code: 'LimitExceededException' });

    const { getByTestId } = renderResetVerification();
    await act(async () => {
      fireEvent.press(getByTestId('resend-otp'));
    });
    expect(mockShowAlert).toHaveBeenCalled();
  });
});
