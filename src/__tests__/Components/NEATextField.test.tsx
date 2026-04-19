import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import NEATextField from '@/Components/TextField/NEATextField';

describe('NEATextField', () => {
  it('renders without crashing', () => {
    expect(() => render(<NEATextField />)).not.toThrow();
  });

  it('renders label when provided', () => {
    const {getByText} = render(<NEATextField label="Email address" />);
    expect(getByText('Email address')).toBeTruthy();
  });

  it('renders required asterisk when required=true', () => {
    const {getByText} = render(<NEATextField label="Email" required />);
    expect(getByText('*')).toBeTruthy();
  });

  it('does not render required asterisk when required=false', () => {
    const {queryByText} = render(
      <NEATextField label="Email" required={false} />,
    );
    expect(queryByText('*')).toBeNull();
  });

  it('renders error message when error prop is provided', () => {
    const {getByText} = render(<NEATextField error="Email is required" />);
    expect(getByText('Email is required')).toBeTruthy();
  });

  it('does not render error message when error is empty string', () => {
    const {queryByText} = render(<NEATextField error="" />);
    expect(queryByText('Email is required')).toBeNull();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const {UNSAFE_getByType} = render(
      <NEATextField
        value=""
        onChangeText={onChangeText}
        placeholder="Enter email"
      />,
    );
    const {TextInput} = require('react-native');
    fireEvent.changeText(UNSAFE_getByType(TextInput), 'test@test.com');
    expect(onChangeText).toHaveBeenCalledWith('test@test.com');
  });

  it('calls onFocus callback when focused', () => {
    const onFocus = jest.fn();
    const {UNSAFE_getByType} = render(<NEATextField onFocus={onFocus} />);
    const {TextInput} = require('react-native');
    fireEvent(UNSAFE_getByType(TextInput), 'focus');
    expect(onFocus).toHaveBeenCalled();
  });

  it('uses email-address keyboardType for type="email"', () => {
    const {UNSAFE_getByProps} = render(<NEATextField type="email" />);
    expect(UNSAFE_getByProps({keyboardType: 'email-address'})).toBeTruthy();
  });

  it('uses numeric keyboardType for type="number"', () => {
    const {UNSAFE_getByProps} = render(<NEATextField type="number" />);
    expect(UNSAFE_getByProps({keyboardType: 'numeric'})).toBeTruthy();
  });

  it('uses secureTextEntry for type="password"', () => {
    const {UNSAFE_getByProps} = render(<NEATextField type="password" />);
    expect(UNSAFE_getByProps({secureTextEntry: true})).toBeTruthy();
  });

  it('does not use secureTextEntry for type="text"', () => {
    const {UNSAFE_getByProps} = render(<NEATextField type="text" />);
    expect(UNSAFE_getByProps({secureTextEntry: false})).toBeTruthy();
  });

  it('displays current value', () => {
    const {getByDisplayValue} = render(<NEATextField value="hello@test.com" />);
    expect(getByDisplayValue('hello@test.com')).toBeTruthy();
  });

  it('applies custom style prop', () => {
    expect(() =>
      render(<NEATextField style={{backgroundColor: '#fff'}} />),
    ).not.toThrow();
  });
});
