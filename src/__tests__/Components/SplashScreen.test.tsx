import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from '@/Components/SplashScreen/SplashScreen';

jest.mock('@/Hooks/useTheme', () => () => ({}));

jest.mock('@/Components/Animations/FadeAnimation', () => ({
  FadeInView: ({ children }: any) => children,
}));

jest.mock('@/Components/Animations/SplashAnimation', () => ({
  SplashAnimation: () => null,
}));

jest.mock('@/Assets/images/splash-image.png', () => 1);
jest.mock('@/Assets/images/splash.png', () => 2);

jest.useFakeTimers();

describe('SplashScreen', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders without crashing', () => {
    expect(() => render(<SplashScreen />)).not.toThrow();
  });

  it('renders the tagline text', () => {
    const { getByText } = render(<SplashScreen />);
    expect(getByText('For People of All Genders')).toBeTruthy();
  });

  it('renders an ImageBackground', () => {
    const { UNSAFE_getByType } = render(<SplashScreen />);
    const { ImageBackground } = require('react-native');
    expect(UNSAFE_getByType(ImageBackground)).toBeTruthy();
  });

  it('renders an Animated.Image overlay', () => {
    const { UNSAFE_getAllByType } = render(<SplashScreen />);
    const { Animated } = require('react-native');
    const images = UNSAFE_getAllByType(Animated.Image);
    expect(images.length).toBeGreaterThan(0);
  });

  it('triggers the animation after 2 seconds', () => {
    const { getByText } = render(<SplashScreen />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getByText('For People of All Genders')).toBeTruthy();
  });

  it('clears the timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = render(<SplashScreen />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
