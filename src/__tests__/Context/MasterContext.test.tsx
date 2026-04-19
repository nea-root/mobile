import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { MasterContext } from '@/Context/MasterContext';

jest.mock('@/Context/FlowProvider/FlowProvider', () => ({
  FlowProviderContext: ({ children }: any) => children,
}));

jest.mock('@/Context/AlertModal/AlertModalProvider', () => ({
  AlertModalProvider: { Provider: ({ children }: any) => children },
  AlertModalProviderContext: ({ children }: any) => children,
}));

jest.mock('@/Context/AuthProvider/AuthProvider', () => ({
  AuthProvider: ({ children }: any) => children,
}));

describe('MasterContext', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(<MasterContext><Text>child</Text></MasterContext>)
    ).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <MasterContext><Text>hello world</Text></MasterContext>
    );
    expect(getByText('hello world')).toBeTruthy();
  });
});
