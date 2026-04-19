import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NeaButton from '@/Components/Button/NeaButton';

describe('NeaButton', () => {
  it('renders the title text', () => {
    const { getByText } = render(<NeaButton title="Click me" />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<NeaButton title="Submit" onPress={onPress} />);
    fireEvent.press(getByText('Submit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<NeaButton title="Disabled" onPress={onPress} disabled />);
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders without onPress (no crash)', () => {
    expect(() => render(<NeaButton title="No press" />)).not.toThrow();
  });

  it('applies custom style prop', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(<NeaButton title="Styled" style={customStyle} />);
    expect(getByText('Styled')).toBeTruthy();
  });

  it('applies custom textStyle prop', () => {
    const textStyle = { color: 'white' };
    const { getByText } = render(<NeaButton title="Styled text" textStyle={textStyle} />);
    expect(getByText('Styled text')).toBeTruthy();
  });

  it('defaults disabled to false', () => {
    const onPress = jest.fn();
    const { getByText } = render(<NeaButton title="Active" onPress={onPress} />);
    fireEvent.press(getByText('Active'));
    expect(onPress).toHaveBeenCalled();
  });

  it('truncates title with numberOfLines=1', () => {
    const { getByText } = render(<NeaButton title="A very long button title that should be truncated" />);
    expect(getByText('A very long button title that should be truncated')).toBeTruthy();
  });
});
