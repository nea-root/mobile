import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '@/Navigators/Header';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock('react-native-vector-icons/FontAwesome', () => {
  const { TouchableOpacity, Text: RNText } = require('react-native');
  return ({ onPress, testID }: any) => (
    <TouchableOpacity onPress={onPress} testID={testID ?? 'icon'}>
      <RNText>←</RNText>
    </TouchableOpacity>
  );
});

jest.mock('@/Hooks', () => ({
  useTheme: () => ({
    MetricsSizes: { large: 24, regular: 16, small: 8, tiny: 4 },
    Colors: {},
    Fonts: {},
    Gutters: {},
    Layout: {},
    Dimens: {},
  }),
}));

describe('Header', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders without crashing', () => {
    expect(() => render(<Header title="Test" />)).not.toThrow();
  });

  it('renders the title', () => {
    const { getByText } = render(<Header title="My Screen" />);
    expect(getByText('My Screen')).toBeTruthy();
  });

  it('renders empty title', () => {
    expect(() => render(<Header title="" />)).not.toThrow();
  });

  it('calls onLeftPress when left button pressed', () => {
    const onLeftPress = jest.fn();
    const { getByTestId } = render(<Header title="Test" onLeftPress={onLeftPress} />);
    fireEvent.press(getByTestId('iconChevronLeft'));
    expect(onLeftPress).toHaveBeenCalled();
  });

  it('calls navigation.goBack when no onLeftPress provided', () => {
    const { UNSAFE_getAllByType } = render(<Header title="Test" />);
    const { TouchableOpacity } = require('react-native');
    const buttons = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(buttons[0]);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('calls onRightPress when right button pressed', () => {
    const onRightPress = jest.fn();
    const rightIcon = <Text testID="right-icon">≡</Text>;
    const { getByTestId } = render(
      <Header title="Test" onRightPress={onRightPress} rightIcon={rightIcon} />
    );
    fireEvent.press(getByTestId('right-icon'));
    expect(onRightPress).toHaveBeenCalled();
  });

  it('renders custom leftIcon when provided', () => {
    const leftIcon = <Text testID="custom-left">Back</Text>;
    const { getByTestId } = render(<Header title="Test" leftIcon={leftIcon} />);
    expect(getByTestId('custom-left')).toBeTruthy();
  });

  it('renders custom rightIcon when provided', () => {
    const rightIcon = <Text testID="custom-right">Menu</Text>;
    const { getByTestId } = render(<Header title="Test" rightIcon={rightIcon} />);
    expect(getByTestId('custom-right')).toBeTruthy();
  });

  it('applies custom style', () => {
    expect(() =>
      render(<Header title="Test" style={{ backgroundColor: 'blue' }} />)
    ).not.toThrow();
  });

  it('applies custom titleStyle', () => {
    expect(() =>
      render(<Header title="Test" titleStyle={{ color: 'white' }} />)
    ).not.toThrow();
  });
});
