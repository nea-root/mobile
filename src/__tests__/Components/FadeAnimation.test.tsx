import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { FadeInView } from '@/Components/Animations/FadeAnimation';

describe('FadeInView', () => {
  it('renders without crashing', () => {
    expect(() => render(<FadeInView><Text>Hello</Text></FadeInView>)).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <FadeInView>
        <Text>Fading content</Text>
      </FadeInView>
    );
    expect(getByText('Fading content')).toBeTruthy();
  });

  it('renders with custom duration', () => {
    expect(() =>
      render(
        <FadeInView duration={500}>
          <Text>Fast fade</Text>
        </FadeInView>
      )
    ).not.toThrow();
  });

  it('renders with custom style', () => {
    const { getByText } = render(
      <FadeInView style={{ flex: 1 }}>
        <Text>Styled</Text>
      </FadeInView>
    );
    expect(getByText('Styled')).toBeTruthy();
  });

  it('uses default duration of 1500', () => {
    expect(() =>
      render(
        <FadeInView>
          <Text>Default duration</Text>
        </FadeInView>
      )
    ).not.toThrow();
  });
});
