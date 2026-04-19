import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OTPInput from '@/Components/OTPInput/OTPInput';

jest.mock('@/Services/Authentication/AuthService', () => ({
  resendVerificationCode: jest.fn(),
}));

describe('OTPInput', () => {
  it('renders without crashing', () => {
    expect(() => render(<OTPInput onSubmit={jest.fn()} />)).not.toThrow();
  });

  it('renders the correct number of input boxes (default 6)', () => {
    const { UNSAFE_getAllByType } = render(<OTPInput onSubmit={jest.fn()} />);
    const { TextInput } = require('react-native');
    expect(UNSAFE_getAllByType(TextInput)).toHaveLength(6);
  });

  it('renders custom length input boxes', () => {
    const { UNSAFE_getAllByType } = render(<OTPInput length={4} onSubmit={jest.fn()} />);
    const { TextInput } = require('react-native');
    expect(UNSAFE_getAllByType(TextInput)).toHaveLength(4);
  });

  it('shows "Verify your email" title', () => {
    const { getByText } = render(<OTPInput onSubmit={jest.fn()} />);
    expect(getByText('Verify your email')).toBeTruthy();
  });

  it('shows subtitle with correct digit count', () => {
    const { getByText } = render(<OTPInput length={6} onSubmit={jest.fn()} />);
    expect(getByText(/6-digit code/)).toBeTruthy();
  });

  it('shows Verify button', () => {
    const { getByText } = render(<OTPInput onSubmit={jest.fn()} />);
    expect(getByText('Verify')).toBeTruthy();
  });

  it('shows Resend Code link', () => {
    const { getByText } = render(<OTPInput onSubmit={jest.fn()} />);
    expect(getByText('Resend Code')).toBeTruthy();
  });

  it('shows Face ID switch in register mode', () => {
    const { getByText } = render(<OTPInput onSubmit={jest.fn()} mode="register" />);
    expect(getByText('Enable Face ID app lock')).toBeTruthy();
  });

  it('does not show Face ID switch in reset mode', () => {
    const { queryByText } = render(<OTPInput onSubmit={jest.fn()} mode="reset" />);
    expect(queryByText('Enable Face ID app lock')).toBeNull();
  });

  it('calls onSubmit when Verify is pressed with current OTP value', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<OTPInput onSubmit={onSubmit} />);
    fireEvent.press(getByText('Verify'));
    expect(onSubmit).toHaveBeenCalledWith('');
  });

  it('calls handleReset when Resend Code is pressed', () => {
    const handleReset = jest.fn();
    const { getByText } = render(<OTPInput onSubmit={jest.fn()} handleReset={handleReset} />);
    fireEvent.press(getByText('Resend Code'));
    expect(handleReset).toHaveBeenCalled();
  });

  it('accepts only numeric input in OTP fields', () => {
    const onSubmit = jest.fn();
    const { UNSAFE_getAllByType } = render(<OTPInput onSubmit={onSubmit} />);
    const { TextInput } = require('react-native');
    const inputs = UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(inputs[0], 'a');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit automatically when all digits filled', () => {
    const onSubmit = jest.fn();
    const { UNSAFE_getAllByType } = render(<OTPInput length={6} onSubmit={onSubmit} />);
    const { TextInput } = require('react-native');
    const inputs = UNSAFE_getAllByType(TextInput);
    ['1', '2', '3', '4', '5', '6'].forEach((digit, i) => {
      fireEvent.changeText(inputs[i], digit);
    });
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });
});
