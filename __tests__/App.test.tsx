/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

jest.mock('../specs/NativeRNConfig', () => ({getEnv: jest.fn(() => 'test')}));
jest.mock('../specs/NativeLocalStorage', () => ({
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-url-polyfill/auto', () => {});
jest.mock('react-native-get-random-values', () => {});

jest.mock('@/Store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(() => jest.fn()),
  },
  persistor: {
    subscribe: jest.fn(),
    getState: jest.fn(() => ({bootstrapped: true})),
  },
}));

jest.mock('redux-persist/lib/integration/react', () => ({
  PersistGate: ({children}: any) => children,
}));

jest.mock('react-native-paper', () => ({
  Provider: ({children}: any) => children,
}));

jest.mock('@/Navigators/Application', () => {
  const {View} = require('react-native');
  return () => <View testID="app-navigator" />;
});

jest.mock('@/Components/SplashScreen/SplashScreen', () => {
  const {View} = require('react-native');
  return () => <View testID="splash-screen" />;
});

it('renders correctly', () => {
  expect(() => render(<App />)).not.toThrow();
});
