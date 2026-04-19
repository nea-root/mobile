import React from 'react';
import {render} from '@testing-library/react-native';
import NeaText from '@/Components/NEAText/NEAText';

describe('NeaText', () => {
  it('renders children text', () => {
    const {getByText} = render(<NeaText>Hello World</NeaText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders without crashing', () => {
    expect(() => render(<NeaText>Test</NeaText>)).not.toThrow();
  });

  it('applies custom style', () => {
    const {getByText} = render(
      <NeaText style={{color: 'red', fontSize: 20}}>Styled</NeaText>,
    );
    const el = getByText('Styled');
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({color: 'red'})]),
    );
  });

  it('renders numeric children', () => {
    const {getByText} = render(<NeaText>{42}</NeaText>);
    expect(getByText('42')).toBeTruthy();
  });

  it('renders nested text components', () => {
    const {getByText} = render(<NeaText>{'Quote text here'}</NeaText>);
    expect(getByText('Quote text here')).toBeTruthy();
  });

  it('passes through extra TextProps', () => {
    const {getByText} = render(
      <NeaText numberOfLines={1} testID="nea-text">
        Truncated text
      </NeaText>,
    );
    expect(getByText('Truncated text')).toBeTruthy();
  });
});
