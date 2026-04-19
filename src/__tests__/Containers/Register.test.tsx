import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import Register from '@/Containers/Authentication/Register/Register';
import {FlowProvider} from '@/Context/FlowProvider/FlowProvider';
import {AlertModalProvider} from '@/Context/AlertModal/AlertModalProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockNavigate}),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  register: jest.fn(),
  getTokens: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/Components/Authentication/AuthForm', () => {
  const {View, TextInput, TouchableOpacity, Text} = require('react-native');
  return ({
    onSubmit,
    email,
    username,
    password,
    handleInput,
    handleDropDownChange,
  }: any) => (
    <View>
      <TextInput
        testID="email-input"
        value={email}
        onChangeText={(t: string) => handleInput(t, 'email')}
      />
      <TextInput
        testID="username-input"
        value={username}
        onChangeText={(t: string) => handleInput(t, 'username')}
      />
      <TextInput
        testID="password-input"
        value={password}
        onChangeText={(t: string) => handleInput(t, 'password')}
      />
      <TouchableOpacity
        testID="dropdown"
        onPress={() => handleDropDownChange('United States')}>
        <Text>Country</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="submit-btn" onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
});

const mockShowAlert = jest.fn();
const mockHideModal = jest.fn();
const alertCtxValue = {
  alertModalData: {isShow: false, title: '', description: '', actions: []},
  showAlert: mockShowAlert,
  hideModal: mockHideModal,
};

const renderRegister = (flowType = 'volunteer') =>
  render(
    <FlowProvider.Provider
      value={{flowType: flowType as any, setFlowType: jest.fn()}}>
      <AlertModalProvider.Provider value={alertCtxValue}>
        <Register />
      </AlertModalProvider.Provider>
    </FlowProvider.Provider>,
  );

beforeEach(() => jest.clearAllMocks());

describe('Register screen', () => {
  it('renders without crashing', () => {
    expect(() => renderRegister()).not.toThrow();
  });

  it('renders form inputs', () => {
    const {getByTestId} = renderRegister();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('username-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('updates email via handleInput', () => {
    const {getByTestId} = renderRegister();
    fireEvent.changeText(getByTestId('email-input'), 'alice@test.com');
    expect(getByTestId('email-input').props.value).toBe('alice@test.com');
  });

  it('updates username via handleInput', () => {
    const {getByTestId} = renderRegister();
    fireEvent.changeText(getByTestId('username-input'), 'alice123');
    expect(getByTestId('username-input').props.value).toBe('alice123');
  });

  it('calls register on submit for volunteer flowType', async () => {
    const {register} = require('@/Services/Authentication/AuthService');
    (register as jest.Mock).mockResolvedValue({});

    const {getByTestId} = renderRegister('volunteer');
    fireEvent.changeText(getByTestId('email-input'), 'alice@test.com');
    fireEvent.changeText(getByTestId('username-input'), 'alice123');
    fireEvent.changeText(getByTestId('password-input'), 'Secret123!');
    fireEvent.press(getByTestId('dropdown'));
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(register).toHaveBeenCalled();
  });

  it('shows alert when register fails', async () => {
    const {register} = require('@/Services/Authentication/AuthService');
    (register as jest.Mock).mockRejectedValue({
      code: 'UsernameExistsException',
    });

    const {getByTestId} = renderRegister('lawyer');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).toHaveBeenCalled();
  });

  it('shows confirmation alert for victim flowType', async () => {
    const {getByTestId} = renderRegister('victim');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith(
      true,
      '',
      expect.stringContaining('permission'),
      expect.any(Array),
    );
  });

  it('navigates to Verification after successful registration', async () => {
    const {register} = require('@/Services/Authentication/AuthService');
    (register as jest.Mock).mockResolvedValue({});

    const {getByTestId} = renderRegister('therapist');
    fireEvent.changeText(getByTestId('email-input'), 'alice@test.com');
    fireEvent.changeText(getByTestId('username-input'), 'alice123');
    await act(async () => {
      fireEvent.press(getByTestId('submit-btn'));
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      'Verification',
      expect.any(Object),
    );
  });
});
