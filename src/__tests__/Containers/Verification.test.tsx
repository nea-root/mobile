import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Verification from '@/Containers/Verification/Verification';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  verifySignIn: jest.fn(),
  resendVerificationCode: jest.fn().mockResolvedValue('CODE_SENT'),
}));

jest.mock('@/Components/OTPInput/OTPInput', () => {
  const { View, TouchableOpacity, Text } = require('react-native');
  return ({ onSubmit, handleReset }: any) => (
    <View>
      <TouchableOpacity testID="submit-otp" onPress={() => onSubmit('123456')}>
        <Text>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="resend-otp" onPress={handleReset}>
        <Text>Resend</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="submit-short" onPress={() => onSubmit('12345')}>
        <Text>Short</Text>
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

const renderVerification = () =>
  render(
    <AlertModalProvider.Provider value={alertCtxValue}>
      <Verification route={mockRoute} />
    </AlertModalProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('Verification screen', () => {
  it('renders without crashing', () => {
    expect(() => renderVerification()).not.toThrow();
  });

  it('calls verifySignIn with username, OTP, and role', async () => {
    const { verifySignIn } = require('@/Services/Authentication/AuthService');
    (verifySignIn as jest.Mock).mockResolvedValue('SUCCESS');

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(verifySignIn).toHaveBeenCalledWith('alice', '123456', 'victim');
  });

  it('navigates to Login on SUCCESS response', async () => {
    const { verifySignIn } = require('@/Services/Authentication/AuthService');
    (verifySignIn as jest.Mock).mockResolvedValue('SUCCESS');

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('does not navigate when response is not SUCCESS', async () => {
    const { verifySignIn } = require('@/Services/Authentication/AuthService');
    (verifySignIn as jest.Mock).mockResolvedValue('PENDING');

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows alert when verifySignIn throws', async () => {
    const { verifySignIn } = require('@/Services/Authentication/AuthService');
    (verifySignIn as jest.Mock).mockRejectedValue({ code: 'CodeMismatchException' });

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-otp'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'Error', expect.any(String), expect.any(Array));
  });

  it('does not call verifySignIn when OTP length is wrong', async () => {
    const { verifySignIn } = require('@/Services/Authentication/AuthService');

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('submit-short'));
    });
    expect(verifySignIn).not.toHaveBeenCalled();
  });

  it('calls resendVerificationCode on handleReset', async () => {
    const { resendVerificationCode } = require('@/Services/Authentication/AuthService');

    const { getByTestId } = renderVerification();
    await act(async () => {
      fireEvent.press(getByTestId('resend-otp'));
    });
    expect(resendVerificationCode).toHaveBeenCalledWith('alice', 'victim');
  });
});
