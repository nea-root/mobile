import React from 'react';
import { render } from '@testing-library/react-native';
import { ChatScreen } from '@/Containers/ChatScreen/ChatScreen';

jest.mock('@/Components/NEAChat/NEAChat', () => {
  const { View } = require('react-native');
  return () => <View testID="nea-chat" />;
});

describe('ChatScreen', () => {
  it('renders without crashing', () => {
    expect(() => render(<ChatScreen navigation={{}} route={{}} />)).not.toThrow();
  });

  it('renders NEAChat component', () => {
    const { getByTestId } = render(<ChatScreen navigation={{}} route={{}} />);
    expect(getByTestId('nea-chat')).toBeTruthy();
  });
});
