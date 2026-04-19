import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';

jest.mock('react-native-paper', () => ({
  useTheme: () => ({colors: {primary: '#6200ee'}}),
  ActivityIndicator: ({testID}: any) => {
    const {View} = require('react-native');
    return <View testID={testID ?? 'activity-indicator'} />;
  },
}));

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    expect(() => render(<LoadingSpinner />)).not.toThrow();
  });

  it('renders an ActivityIndicator', () => {
    const {getByTestId} = render(<LoadingSpinner />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});
