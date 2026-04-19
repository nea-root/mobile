import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ResetPassword from '@/Containers/Authentication/Reset/ResetPassword';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
const mockPopToTop = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, popToTop: mockPopToTop }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  resetPasswordAfterVerification: jest.fn(),
  getTokens: jest.fn().mockResolvedValue(null),
  signOut: jest.fn(),
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({ login: jest.fn(), authState: { roles: [], users: {}, tokens: {} } }),
}));

jest.mock('@/Components/Authentication/AuthForm', () => {
  const { View, TextInput, TouchableOpacity, Text } = require('react-native');
  return ({ onSubmit, password, confirmPassword, handleInput }: any) => (
    <View>
      <TextInput
        testID="password-input"
        value={password}
        onChangeText={(t: string) => handleInput(t, 'password')}
      />
      <TextInput
        testID="confirm-input"
        value={confirmPassword}
        onChangeText={(t: string) => handleInput(t, 'confirmPassword')}
      />
      <TouchableOpacity testID="submit-btn" onPress={onSubmit}>
        <Text>Reset password</Text>
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
    formData: {
      username: 'alice',
      email: 'alice@test.com',
      tempPassword: 'Temp123!',
      password: 'NewPass1!',
      accessToken: 'access-token',
      role: 'victim',
    },
  },
};

const renderResetPassword = (flowType = 'victim') =>
  render(
    <FlowProvider.Provider value={{ flowType: flowType as any, setFlowType: jest.fn() }}>
      <AlertModalProvider.Provider value={alertCtxValue}>
        <ResetPassword route={mockRoute} />
      </AlertModalProvider.Provider>
    </FlowProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('ResetPassword screen', () => {
  it('renders without crashing', () => {
    expect(() => renderResetPassword()).not.toThrow();
  });

  it('renders password inputs', () => {
    const { getByTestId } = renderResetPassword();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('confirm-input')).toBeTruthy();
  });

  it('updates password state', () => {
    const { getByTestId } = renderResetPassword();
    fireEvent.changeText(getByTestId('password-input'), 'NewPass1!');
    expect(getByTestId('password-input').props.value).toBe('NewPass1!');
  });

  it('updates confirmPassword state', () => {
    const { getByTestId } = renderResetPassword();
    fireEvent.changeText(getByTestId('confirm-input'), 'NewPass1!');
    expect(getByTestId('confirm-input').props.value).toBe('NewPass1!');
  });

  it('calls resetPasswordAfterVerification on submit', async () => {
    const { resetPasswordAfterVerification } = require('@/Services/Authentication/AuthService');
    (resetPasswordAfterVerification as jest.Mock).mockResolvedValue({});

    const { getByTestId } = renderResetPassword('victim');
    fireEvent.changeText(getByTestId('confirm-input'), 'NewPass1!');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(resetPasswordAfterVerification).toHaveBeenCalledWith(
      'alice', 'Temp123!', 'NewPass1!', 'access-token', 'victim'
    );
  });

  it('calls popToTop on success', async () => {
    const { resetPasswordAfterVerification } = require('@/Services/Authentication/AuthService');
    (resetPasswordAfterVerification as jest.Mock).mockResolvedValue({});

    const { getByTestId } = renderResetPassword('volunteer');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockPopToTop).toHaveBeenCalled();
  });

  it('shows alert when reset fails', async () => {
    const { resetPasswordAfterVerification } = require('@/Services/Authentication/AuthService');
    (resetPasswordAfterVerification as jest.Mock).mockRejectedValue({ code: 'InvalidPasswordException' });

    const { getByTestId } = renderResetPassword('lawyer');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'Error', expect.any(String), expect.any(Array));
  });

  it('does not call reset when flowType is invalid', async () => {
    const { resetPasswordAfterVerification } = require('@/Services/Authentication/AuthService');
    const { getByTestId } = renderResetPassword('loading');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(resetPasswordAfterVerification).not.toHaveBeenCalled();
  });
});
