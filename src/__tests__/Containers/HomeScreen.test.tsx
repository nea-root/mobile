import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { HomeScreen } from '@/Containers/HomeScreen/HomeScreen';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({
    logout: jest.fn(),
    authState: {
      roles: ['victim'],
      users: { victim: { username: 'alice' } },
      tokens: { victim: { idToken: { payload: { exp: '9999999999' } } } },
    },
  }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/Components/StylingComponents/GradientBox', () => {
  const { View } = require('react-native');
  return ({ children }: any) => <View testID="gradient-box">{children}</View>;
});

jest.mock('@/Components/LazyGrid/LazyGrid', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return ({ data, renderItem, ListFooterComponent, onScroll }: any) => (
    <View>
      {data.map((item: any, i: number) => (
        <View key={i}>{renderItem({ item, index: i })}</View>
      ))}
      {ListFooterComponent}
    </View>
  );
});

jest.mock('@/Assets/icons/NEAHome', () => () => null);
jest.mock('@/Assets/icons/NEAHomeTitle', () => () => null);

const renderHomeScreen = (flowType = 'victim') =>
  render(
    <FlowProvider.Provider value={{ flowType: flowType as any, setFlowType: jest.fn() }}>
      <HomeScreen navigation={{ navigate: mockNavigate }} />
    </FlowProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    expect(() => renderHomeScreen()).not.toThrow();
  });

  it('renders the gradient box', () => {
    const { getByTestId } = renderHomeScreen();
    expect(getByTestId('gradient-box')).toBeTruthy();
  });

  it('renders the motivation quote text', () => {
    const { getByText } = renderHomeScreen();
    expect(getByText(/best revenge/)).toBeTruthy();
  });

  it('renders chat now buttons for each item', () => {
    const { getAllByText } = renderHomeScreen();
    expect(getAllByText('Chat now').length).toBeGreaterThan(0);
  });

  it('renders the Logout button', () => {
    const { getByText } = renderHomeScreen();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('calls signOut when Logout is pressed', async () => {
    const { signOut } = require('@/Services/Authentication/AuthService');
    const { getByText } = renderHomeScreen('victim');
    await act(async () => {
      fireEvent.press(getByText('Logout'));
    });
    expect(signOut).toHaveBeenCalledWith('victim');
  });

  it('navigates to ChatScreen when Chat now is pressed', () => {
    const { getAllByText } = renderHomeScreen();
    fireEvent.press(getAllByText('Chat now')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('ChatScreen');
  });
});
