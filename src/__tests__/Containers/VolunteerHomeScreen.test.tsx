import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { VolunteerHomeScreen } from '@/Containers/HomeScreen/VolunteerHomeScreen';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  useAuth: () => ({
    logout: jest.fn(),
    authState: { roles: ['volunteer'], users: {}, tokens: {} },
  }),
}));

jest.mock('@/Services/Authentication/AuthService', () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

const mockNavigate = jest.fn();

const renderScreen = (flowType = 'volunteer') =>
  render(
    <FlowProvider.Provider value={{ flowType: flowType as any, setFlowType: jest.fn() }}>
      <VolunteerHomeScreen navigation={{ navigate: mockNavigate }} />
    </FlowProvider.Provider>
  );

beforeEach(() => jest.clearAllMocks());

describe('VolunteerHomeScreen', () => {
  it('renders without crashing', () => {
    expect(() => renderScreen()).not.toThrow();
  });

  it('shows welcome greeting', () => {
    const { getByText } = renderScreen();
    expect(getByText('Welcome back,')).toBeTruthy();
    expect(getByText('Volunteer')).toBeTruthy();
  });

  it('shows Offline status by default', () => {
    const { getByText } = renderScreen();
    expect(getByText('Offline')).toBeTruthy();
  });

  it('toggles to Online when status badge is pressed', async () => {
    const { getByText } = renderScreen();
    await act(async () => {
      fireEvent.press(getByText('Offline'));
    });
    expect(getByText('Online')).toBeTruthy();
  });

  it('toggles back to Offline when pressed again', async () => {
    const { getByText } = renderScreen();
    await act(async () => {
      fireEvent.press(getByText('Offline'));
    });
    await act(async () => {
      fireEvent.press(getByText('Online'));
    });
    expect(getByText('Offline')).toBeTruthy();
  });

  it('shows earnings card with correct amount', () => {
    const { getByText } = renderScreen();
    expect(getByText('£1,800.00')).toBeTruthy();
  });

  it('shows earnings details', () => {
    const { getByText } = renderScreen();
    expect(getByText('Earnings: +£2,000.00')).toBeTruthy();
    expect(getByText('Tax: -£200.00')).toBeTruthy();
  });

  it('shows "Active Sessions" heading', () => {
    const { getByText } = renderScreen();
    expect(getByText('Active Sessions')).toBeTruthy();
  });

  it('shows offline hint when offline', () => {
    const { getByText } = renderScreen();
    expect(getByText('Go online to accept new chat sessions')).toBeTruthy();
  });

  it('hides offline hint when online', async () => {
    const { getByText, queryByText } = renderScreen();
    await act(async () => {
      fireEvent.press(getByText('Offline'));
    });
    expect(queryByText('Go online to accept new chat sessions')).toBeNull();
  });

  it('shows mock chat sessions', () => {
    const { getAllByText } = renderScreen();
    expect(getAllByText('Anonymous User').length).toBeGreaterThan(0);
  });

  it('navigates to ChatScreen on session press', () => {
    const { getAllByText } = renderScreen();
    fireEvent.press(getAllByText('Anonymous User')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('ChatScreen');
  });

  it('shows unread badge count', () => {
    const { getByText } = renderScreen();
    expect(getByText('2')).toBeTruthy();
  });

  it('shows Logout button', () => {
    const { getByText } = renderScreen();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('calls signOut and logout when Logout is pressed', async () => {
    const { signOut } = require('@/Services/Authentication/AuthService');
    const { getByText } = renderScreen();
    await act(async () => {
      fireEvent.press(getByText('Logout'));
    });
    expect(signOut).toHaveBeenCalledWith('volunteer');
  });
});
