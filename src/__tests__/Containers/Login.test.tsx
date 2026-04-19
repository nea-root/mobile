import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Login from '@/Containers/Authentication/Login/Login';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  signIn: jest.fn(),
  getTokens: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({ login: jest.fn(), authState: { roles: [], users: {}, tokens: {} } }),
}));

jest.mock('@/Components/Authentication/AuthForm', () => {
  const { View, TextInput, TouchableOpacity, Text } = require('react-native');
  return ({ mode, onSubmit, email, password, handleInput }: any) => (
    <View>
      <TextInput
        testID="email-input"
        value={email}
        onChangeText={(text: string) => handleInput(text, 'email')}
      />
      <TextInput
        testID="password-input"
        value={password}
        onChangeText={(text: string) => handleInput(text, 'password')}
      />
      <TouchableOpacity testID="submit-btn" onPress={onSubmit}>
        <Text>Login</Text>
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

const renderLogin = (flowType = 'victim') =>
  render(
    <FlowProvider.Provider value={{ flowType: flowType as any, setFlowType: jest.fn() }}>
      <AlertModalProvider.Provider value={alertCtxValue}>
        <Login />
      </AlertModalProvider.Provider>
    </FlowProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('Login screen', () => {
  it('renders without crashing', () => {
    expect(() => renderLogin()).not.toThrow();
  });

  it('renders email and password inputs', () => {
    const { getByTestId } = renderLogin();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('updates email state when input changes', () => {
    const { getByTestId } = renderLogin();
    fireEvent.changeText(getByTestId('email-input'), 'user@test.com');
    expect(getByTestId('email-input').props.value).toBe('user@test.com');
  });

  it('updates password state when input changes', () => {
    const { getByTestId } = renderLogin();
    fireEvent.changeText(getByTestId('password-input'), 'Secret123!');
    expect(getByTestId('password-input').props.value).toBe('Secret123!');
  });

  it('calls signIn on submit for valid flowType', async () => {
    const { signIn } = require('@/Services/Authentication/AuthService');
    (signIn as jest.Mock).mockResolvedValue({ username: 'user', tokens: {} });

    const { getByTestId } = renderLogin('victim');
    fireEvent.changeText(getByTestId('email-input'), 'user@test.com');
    fireEvent.changeText(getByTestId('password-input'), 'Secret123!');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(signIn).toHaveBeenCalledWith('user@test.com', 'Secret123!', 'victim');
  });

  it('shows alert when signIn throws', async () => {
    const { signIn } = require('@/Services/Authentication/AuthService');
    (signIn as jest.Mock).mockRejectedValue({ code: 'NotAuthorizedException' });

    const { getByTestId } = renderLogin('volunteer');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'Error', expect.any(String), expect.any(Array));
  });

  it('does not call signIn when flowType is invalid', async () => {
    const { signIn } = require('@/Services/Authentication/AuthService');
    const { getByTestId } = renderLogin('loading');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(signIn).not.toHaveBeenCalled();
  });
});
