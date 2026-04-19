import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NEADropdown from '@/Components/DropDown/NEADropDown';

const OPTIONS = ['United States', 'United Kingdom', 'Canada'];

describe('NEADropdown', () => {
  it('renders without crashing', () => {
    expect(() => render(<NEADropdown options={OPTIONS} onSelect={jest.fn()} />)).not.toThrow();
  });

  it('shows the label when provided', () => {
    const { getByText } = render(<NEADropdown label="Country" options={OPTIONS} onSelect={jest.fn()} />);
    expect(getByText('Country')).toBeTruthy();
  });

  it('shows required asterisk when required=true', () => {
    const { getByText } = render(
      <NEADropdown label="Country" options={OPTIONS} onSelect={jest.fn()} required />
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('shows placeholder text initially', () => {
    const { getByText } = render(
      <NEADropdown options={OPTIONS} onSelect={jest.fn()} placeholder="Choose one" />
    );
    expect(getByText('Choose one')).toBeTruthy();
  });

  it('shows default placeholder when none provided', () => {
    const { getByText } = render(<NEADropdown options={OPTIONS} onSelect={jest.fn()} />);
    expect(getByText('Select an option')).toBeTruthy();
  });

  it('opens options list on press', () => {
    const { getByText, queryByText } = render(
      <NEADropdown options={OPTIONS} onSelect={jest.fn()} placeholder="Choose one" />
    );
    expect(queryByText('United States')).toBeNull();
    fireEvent.press(getByText('Choose one'));
    expect(getByText('United States')).toBeTruthy();
    expect(getByText('United Kingdom')).toBeTruthy();
  });

  it('selects an option and closes dropdown', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <NEADropdown options={OPTIONS} onSelect={onSelect} placeholder="Choose one" />
    );
    fireEvent.press(getByText('Choose one'));
    fireEvent.press(getByText('United States'));
    expect(onSelect).toHaveBeenCalledWith('United States');
    expect(getByText('United States')).toBeTruthy();
  });

  it('calls onSelect with correct value', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <NEADropdown options={OPTIONS} onSelect={onSelect} placeholder="Choose one" />
    );
    fireEvent.press(getByText('Choose one'));
    fireEvent.press(getByText('Canada'));
    expect(onSelect).toHaveBeenCalledWith('Canada');
  });

  it('toggles options list on repeated press', () => {
    const { getByText, queryByText } = render(
      <NEADropdown options={OPTIONS} onSelect={jest.fn()} placeholder="Choose one" />
    );
    fireEvent.press(getByText('Choose one'));
    expect(getByText('United States')).toBeTruthy();
    fireEvent.press(getByText('United States'));
    expect(queryByText('United Kingdom')).toBeNull();
  });
});
