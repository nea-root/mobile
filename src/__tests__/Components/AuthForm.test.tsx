import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AuthForm from '@/Components/Authentication/AuthForm';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn()}),
}));

jest.mock('@/Components/TextField/NEATextField', () => {
  const {TextInput} = require('react-native');
  return ({label, value, onChangeText, onFocus, type, placeholder}: any) => (
    <TextInput
      testID={`field-${label || type || placeholder || 'input'}`}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={placeholder}
    />
  );
});

jest.mock('@/Components/DropDown/NEADropDown', () => {
  const {TouchableOpacity, Text} = require('react-native');
  return ({onSelect}: any) => (
    <TouchableOpacity
      testID="dropdown"
      onPress={() => onSelect('United States')}>
      <Text>Country</Text>
    </TouchableOpacity>
  );
});

jest.mock('@/Assets/icons', () => ({
  Apple: () => null,
  Google: () => null,
}));

jest.mock('@/Assets/icons/NEAHeart', () => () => null);

const mockNavigation = {navigate: jest.fn()};

const buildProps = (
  mode: 'register' | 'login' | 'reset' | 'passwordReset',
  overrides = {},
) => ({
  mode,
  onSubmit: jest.fn(),
  buttonLabel: 'Submit',
  email: '',
  password: '',
  username: '',
  confirmPassword: '',
  place: '',
  handleInput: jest.fn(),
  navigation: mockNavigation,
  handleDropDownChange: jest.fn(),
  ...overrides,
});

describe('AuthForm', () => {
  describe('register mode', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<AuthForm {...buildProps('register')} />),
      ).not.toThrow();
    });

    it('shows register title', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      expect(getByText(/get you started/)).toBeTruthy();
    });

    it('shows Register button label', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      expect(getByText('Register')).toBeTruthy();
    });

    it('shows terms and conditions text', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      expect(getByText(/By registering/)).toBeTruthy();
    });

    it('shows SOS button', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      expect(getByText('SOS')).toBeTruthy();
    });

    it('calls onSubmit when all fields filled', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm
          {...buildProps('register', {
            onSubmit,
            email: 'user@test.com',
            username: 'alice123',
            password: 'Secret123!',
            place: 'United States',
          })}
        />,
      );
      fireEvent.press(getByText('Register'));
      expect(onSubmit).toHaveBeenCalled();
    });

    it('does NOT call onSubmit when fields are empty', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm {...buildProps('register', {onSubmit})} />,
      );
      fireEvent.press(getByText('Register'));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows "Already registered?" link', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      expect(getByText(/Already registered\?/)).toBeTruthy();
    });

    it('navigates to Login when login link pressed', () => {
      const {getByText} = render(<AuthForm {...buildProps('register')} />);
      fireEvent.press(getByText('Login'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
  });

  describe('login mode', () => {
    it('shows "Login to your account" title', () => {
      const {getByText} = render(<AuthForm {...buildProps('login')} />);
      expect(getByText('Login to your account')).toBeTruthy();
    });

    it('shows Login button', () => {
      const {getByText} = render(<AuthForm {...buildProps('login')} />);
      expect(getByText('Login')).toBeTruthy();
    });

    it('shows "Forgot password?" link', () => {
      const {getByText} = render(<AuthForm {...buildProps('login')} />);
      expect(getByText('Forgot password?')).toBeTruthy();
    });

    it('shows SOS button', () => {
      const {getByText} = render(<AuthForm {...buildProps('login')} />);
      expect(getByText('SOS')).toBeTruthy();
    });

    it('calls onSubmit when email and password provided', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm
          {...buildProps('login', {
            onSubmit,
            email: 'user@test.com',
            password: 'Secret123!',
          })}
        />,
      );
      fireEvent.press(getByText('Login'));
      expect(onSubmit).toHaveBeenCalled();
    });

    it('does NOT call onSubmit when fields empty', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm {...buildProps('login', {onSubmit})} />,
      );
      fireEvent.press(getByText('Login'));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('navigates to Reset when Forgot password clicked', () => {
      const {getByText} = render(<AuthForm {...buildProps('login')} />);
      fireEvent.press(getByText('Forgot password?'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Reset');
    });
  });

  describe('reset mode', () => {
    it('shows "Reset password" title', () => {
      const {getByText} = render(<AuthForm {...buildProps('reset')} />);
      expect(getByText('Reset password')).toBeTruthy();
    });

    it('shows description text', () => {
      const {getByText} = render(<AuthForm {...buildProps('reset')} />);
      expect(getByText(/worry/)).toBeTruthy();
    });

    it('shows Send Code button', () => {
      const {getByText} = render(<AuthForm {...buildProps('reset')} />);
      expect(getByText('Send Code')).toBeTruthy();
    });

    it('does NOT call onSubmit when email missing', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm {...buildProps('reset', {onSubmit})} />,
      );
      fireEvent.press(getByText('Send Code'));
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('passwordReset mode', () => {
    it('shows "Create new password" title', () => {
      const {getByText} = render(<AuthForm {...buildProps('passwordReset')} />);
      expect(getByText('Create new password')).toBeTruthy();
    });

    it('shows Reset password button', () => {
      const {getByText} = render(<AuthForm {...buildProps('passwordReset')} />);
      expect(getByText('Reset password')).toBeTruthy();
    });

    it('does NOT call onSubmit when passwords missing', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm {...buildProps('passwordReset', {onSubmit})} />,
      );
      fireEvent.press(getByText('Reset password'));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit when both passwords provided', () => {
      const onSubmit = jest.fn();
      const {getByText} = render(
        <AuthForm
          {...buildProps('passwordReset', {
            onSubmit,
            password: 'NewPass1!',
            confirmPassword: 'NewPass1!',
          })}
        />,
      );
      fireEvent.press(getByText('Reset password'));
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
