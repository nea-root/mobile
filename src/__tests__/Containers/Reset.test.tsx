import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Reset from '@/Containers/Authentication/Reset/Reset';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  forgotPassword: jest.fn(),
  getTokens: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({ login: jest.fn(), authState: { roles: [], users: {}, tokens: {} } }),
}));

jest.mock('@/Components/Authentication/AuthForm', () => {
  const { View, TextInput, TouchableOpacity, Text } = require('react-native');
  return ({ mode, onSubmit, email, handleInput }: any) => (
    <View>
      <TextInput testID="email-input" value={email} onChangeText={(t: string) => handleInput(t, 'email')} />
      <TouchableOpacity testID="submit-btn" onPress={onSubmit}>
        <Text>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
});

const mockShowAlert = jest.fn().mockImplementation((_isShow, _title, _desc, actions) => {
  // Simulate clicking "Yes" to trigger the reset password flow
});
const mockHideModal = jest.fn();
const alertCtxValue = {
  alertModalData: { isShow: false, title: '', description: '', actions: [] },
  showAlert: mockShowAlert,
  hideModal: mockHideModal,
};

const renderReset = (flowType = 'victim') =>
  render(
    <FlowProvider.Provider value={{ flowType: flowType as any, setFlowType: jest.fn() }}>
      <AlertModalProvider.Provider value={alertCtxValue}>
        <Reset />
      </AlertModalProvider.Provider>
    </FlowProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('Reset screen', () => {
  it('renders without crashing', () => {
    expect(() => renderReset()).not.toThrow();
  });

  it('renders email input', () => {
    const { getByTestId } = renderReset();
    expect(getByTestId('email-input')).toBeTruthy();
  });

  it('updates email when input changes', () => {
    const { getByTestId } = renderReset();
    fireEvent.changeText(getByTestId('email-input'), 'user@test.com');
    expect(getByTestId('email-input').props.value).toBe('user@test.com');
  });

  it('shows permission alert when submit pressed with valid flowType', async () => {
    const { getByTestId } = renderReset('victim');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(
      true,
      'Email Alert',
      expect.stringContaining('permission'),
      expect.any(Array)
    );
  });

  it('does not show alert when flowType is "loading"', async () => {
    const { getByTestId } = renderReset('loading');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).not.toHaveBeenCalled();
  });

  it('calls forgotPassword when "Yes" action is triggered', async () => {
    const { forgotPassword } = require('@/Services/Authentication/AuthService');
    (forgotPassword as jest.Mock).mockResolvedValue(undefined);

    mockShowAlert.mockImplementation((_isShow, _title, _desc, actions) => {
      // Simulate pressing "Yes"
      actions[1].action();
    });

    const { getByTestId } = renderReset('volunteer');
    fireEvent.changeText(getByTestId('email-input'), 'user@test.com');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(forgotPassword).toHaveBeenCalledWith('user@test.com', 'volunteer');
  });

  it('shows error alert when forgotPassword fails after Yes', async () => {
    const { forgotPassword } = require('@/Services/Authentication/AuthService');
    (forgotPassword as jest.Mock).mockRejectedValue({ code: 'UserNotFoundException' });

    let yesAction: any;
    mockShowAlert.mockImplementation((_isShow, _title, _desc, actions) => {
      yesAction = actions[1]?.action;
    });

    const { getByTestId } = renderReset('lawyer');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    await act(async () => {
      yesAction?.();
    });
    // Error alert is triggered
    expect(mockShowAlert).toHaveBeenCalled();
  });
});
