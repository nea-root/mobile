import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import GradientBox from '@/Components/StylingComponents/GradientBox';

describe('GradientBox', () => {
  it('renders without crashing', () => {
    expect(() => render(<GradientBox />)).not.toThrow();
  });

  it('renders children', () => {
    const {getByText} = render(
      <GradientBox>
        <Text>Box content</Text>
      </GradientBox>,
    );
    expect(getByText('Box content')).toBeTruthy();
  });

  it('renders with custom colors', () => {
    expect(() =>
      render(
        <GradientBox colors={['#ff0000', '#0000ff']}>
          <Text>Colored box</Text>
        </GradientBox>,
      ),
    ).not.toThrow();
  });

  it('renders with custom padding', () => {
    expect(() =>
      render(
        <GradientBox padding={{vertical: 10, horizontal: 20}}>
          <Text>Custom padding</Text>
        </GradientBox>,
      ),
    ).not.toThrow();
  });

  it('renders with custom borderRadius', () => {
    expect(() =>
      render(
        <GradientBox
          borderRadius={{
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0,
          }}>
          <Text>Rounded</Text>
        </GradientBox>,
      ),
    ).not.toThrow();
  });

  it('renders with custom width', () => {
    expect(() =>
      render(
        <GradientBox width={200}>
          <Text>Fixed width</Text>
        </GradientBox>,
      ),
    ).not.toThrow();
  });

  it('renders without children', () => {
    expect(() => render(<GradientBox />)).not.toThrow();
  });

  it('renders with custom style', () => {
    expect(() =>
      render(
        <GradientBox style={{margin: 10}}>
          <Text>Extra style</Text>
        </GradientBox>,
      ),
    ).not.toThrow();
  });
});
