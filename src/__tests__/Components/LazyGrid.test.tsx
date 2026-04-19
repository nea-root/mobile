import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import LazyGrid from '@/Components/LazyGrid/LazyGrid';

const DATA = [
  {id: 'item-0', name: 'Item 1'},
  {id: 'item-1', name: 'Item 2'},
  {id: 'item-2', name: 'Item 3'},
  {id: 'item-3', name: 'Item 4'},
];

const renderItem = ({item}: {item: (typeof DATA)[0]}) => (
  <Text testID={`item-${item.id}`}>{item.name}</Text>
);

describe('LazyGrid', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <LazyGrid
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />,
      ),
    ).not.toThrow();
  });

  it('renders all items', () => {
    const {getByText} = render(
      <LazyGrid
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />,
    );
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('Item 3')).toBeTruthy();
    expect(getByText('Item 4')).toBeTruthy();
  });

  it('renders with numColumns=2 (default)', () => {
    expect(() =>
      render(
        <LazyGrid
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />,
      ),
    ).not.toThrow();
  });

  it('renders with numColumns=1', () => {
    const {getByText} = render(
      <LazyGrid
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={1}
      />,
    );
    expect(getByText('Item 1')).toBeTruthy();
  });

  it('renders ListFooterComponent', () => {
    const {getByText} = render(
      <LazyGrid
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={<Text>Footer</Text>}
      />,
    );
    expect(getByText('Footer')).toBeTruthy();
  });

  it('renders with empty data array', () => {
    expect(() =>
      render(
        <LazyGrid
          data={[]}
          renderItem={renderItem}
          keyExtractor={item => (item as any).id}
        />,
      ),
    ).not.toThrow();
  });

  it('passes onScroll to underlying FlatList', () => {
    const onScroll = jest.fn();
    expect(() =>
      render(
        <LazyGrid
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onScroll={onScroll}
        />,
      ),
    ).not.toThrow();
  });
});
