import React from 'react';
import {Text, Pressable} from 'react-native';
import {render, act, fireEvent} from '@testing-library/react-native';
import {AuthProvider, useAuth} from '@/Context/AuthProvider/AuthProvider';
import {FlowProvider} from '@/Context/FlowProvider/FlowProvider';

jest.mock('@/Services/Authentication/AuthService', () => ({
  getTokens: jest.fn().mockResolvedValue(null),
}));

const mockFlowContext = {
  flowType: 'victim' as any,
  setFlowType: jest.fn(),
};

const Wrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <FlowProvider.Provider value={mockFlowContext}>
    <AuthProvider>{children}</AuthProvider>
  </FlowProvider.Provider>
);

const AuthConsumer = () => {
  const {authState, login, logout} = useAuth();
  return (
    <>
      <Text testID="roles">{authState.roles.join(',')}</Text>
      <Pressable
        testID="login-btn"
        onPress={() =>
          login(
            'victim' as any,
            {username: 'alice'},
            {
              idToken: {jwtToken: 'id', payload: {} as any},
              accessToken: {jwtToken: 'access', payload: {} as any},
              refreshToken: {token: 'refresh'},
              clockDrift: '0',
            },
          )
        }>
        <Text>Login</Text>
      </Pressable>
      <Pressable testID="logout-btn" onPress={() => logout('victim' as any)}>
        <Text>Logout</Text>
      </Pressable>
    </>
  );
};

describe('AuthProvider', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Wrapper>
          <Text>Child</Text>
        </Wrapper>,
      ),
    ).not.toThrow();
  });

  it('initial authState has empty roles', () => {
    const {getByTestId} = render(
      <Wrapper>
        <AuthConsumer />
      </Wrapper>,
    );
    expect(getByTestId('roles').props.children).toBe('');
  });

  it('login adds a role to authState', async () => {
    const {getByTestId} = render(
      <Wrapper>
        <AuthConsumer />
      </Wrapper>,
    );
    await act(async () => {
      fireEvent.press(getByTestId('login-btn'));
    });
    expect(getByTestId('roles').props.children).toContain('victim');
  });

  it('logout removes a role from authState', async () => {
    const {getByTestId} = render(
      <Wrapper>
        <AuthConsumer />
      </Wrapper>,
    );
    await act(async () => {
      fireEvent.press(getByTestId('login-btn'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('logout-btn'));
    });
    expect(getByTestId('roles').props.children).toBe('');
  });

  it('login does not duplicate roles', async () => {
    const {getByTestId} = render(
      <Wrapper>
        <AuthConsumer />
      </Wrapper>,
    );
    await act(async () => {
      fireEvent.press(getByTestId('login-btn'));
      fireEvent.press(getByTestId('login-btn'));
    });
    const roles = getByTestId('roles')
      .props.children.split(',')
      .filter(Boolean);
    expect(roles.filter((r: string) => r === 'victim')).toHaveLength(1);
  });
});

describe('useAuth hook', () => {
  it('throws when used outside AuthProvider', () => {
    const BadComponent = () => {
      useAuth();
      return <Text>Bad</Text>;
    };
    expect(() => render(<BadComponent />)).toThrow(
      'useAuth must be used within an AuthProvider',
    );
  });
});
